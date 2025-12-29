'use server';

import {
  InterestFormData,
  interestFormSchema,
} from '@/lib/validations/interestForm';

// URL mockada do backend - será substituída pela URL real
const BACKEND_URL =
  process.env.INTEREST_FORM_API_URL || 'https://api.mock.example.com/interest';

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

    // Envia para o backend (mockado)
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationResult.data),
    });

    // Mock: Como o endpoint é fictício, vamos simular sucesso
    // Em produção, verificar response.ok
    if (!response.ok && BACKEND_URL.includes('mock.example.com')) {
      // Simula sucesso para o mock
      // eslint-disable-next-line no-console
      console.log('[MOCK] Dados recebidos:', validationResult.data);

      return {
        success: true,
        message: 'Obrigado pelo seu interesse! Em breve entraremos em contato.',
      };
    }

    if (!response.ok) {
      throw new Error(`Erro ao enviar formulário: ${response.statusText}`);
    }

    return {
      success: true,
      message: 'Obrigado pelo seu interesse! Em breve entraremos em contato.',
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao processar formulário:', error);

    // Mock: Se falhar por ser URL inexistente, simula sucesso
    if (BACKEND_URL.includes('mock.example.com')) {
      return {
        success: true,
        message:
          '[MOCK] Obrigado pelo seu interesse! Em breve entraremos em contato.',
      };
    }

    return {
      success: false,
      message:
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
    };
  }
}
