'use server';

import {
  InterestFormData,
  interestFormSchema,
} from '@/lib/validations/interestForm';

const FALLBACK_SITE_URL = 'http://localhost:3000';

const siteUrl = (() => {
  const urlFromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  if (!urlFromEnv) return FALLBACK_SITE_URL;
  return urlFromEnv.startsWith('http') ? urlFromEnv : `https://${urlFromEnv}`;
})();

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof InterestFormData]?: string[];
  };
};

export async function submitInterestForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extrai os dados do FormData
    const rawData = {
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      participantType: formData.get('participantType') as string,
      tccExperience: formData.get('tccExperience') as string,
      mentoringInterest: formData.get('mentoringInterest') as string,
      availability: JSON.parse(
        (formData.get('availability') as string) || '[]'
      ),
      acceptTerms: formData.get('acceptTerms') === 'true',
    };

    // Valida os dados com Zod
    const validationResult = interestFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      // Retorna erros de validação
      const fieldErrors: FormState['errors'] = {};

      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof InterestFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        const fieldArray = fieldErrors[field];
        if (fieldArray) {
          fieldArray.push(issue.message);
        }
      });

      return {
        success: false,
        message: 'Por favor, corrija os erros no formulário.',
        errors: fieldErrors,
      };
    }

    // Envia para o handler interno que aciona o n8n
    const response = await fetch(`${siteUrl}/api/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: validationResult.data.fullName,
        phone: validationResult.data.phone,
        email: validationResult.data.email,
        source: 'subscription-form',
        message: `${validationResult.data.participantType} | ${validationResult.data.tccExperience} | ${validationResult.data.mentoringInterest}`,
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      const errorMessage =
        errJson?.error || response.statusText || 'Erro ao enviar';
      throw new Error(errorMessage);
    }

    return {
      success: true,
      message: 'Obrigado pelo seu interesse! Em breve entraremos em contato.',
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao processar formulário:', error);

    return {
      success: false,
      message:
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
    };
  }
}
