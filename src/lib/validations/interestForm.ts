import { z } from 'zod';

// Enum para tipo de participante
export const ParticipantType = {
  STUDENT: 'student',
  GRADUATED: 'graduated',
} as const;

// Enum para períodos do dia
export const DayPeriod = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
} as const;

// Enum para dias da semana
export const WeekDay = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
} as const;

// Schema de validação do formulário de interesse
export const interestFormSchema = z.object({
  // Dados pessoais
  fullName: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  phone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(15, 'Telefone deve ter no máximo 15 dígitos')
    .regex(/^[\d\s()+-]+$/, 'Formato de telefone inválido'),

  email: z.string().email('Email inválido'),

  // Tipo de participante
  participantType: z.enum(
    [ParticipantType.STUDENT, ParticipantType.GRADUATED],
    {
      required_error: 'Selecione se você é estudante ou formado',
    }
  ),

  // Experiência com TCC
  tccExperience: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional(),

  // Interesse na mentoria
  mentoringInterest: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional(),

  // Disponibilidade (array de combinações dia + período)
  availability: z
    .array(
      z.object({
        day: z.enum([
          WeekDay.MONDAY,
          WeekDay.TUESDAY,
          WeekDay.WEDNESDAY,
          WeekDay.THURSDAY,
          WeekDay.FRIDAY,
        ]),
        period: z.enum([
          DayPeriod.MORNING,
          DayPeriod.AFTERNOON,
          DayPeriod.EVENING,
        ]),
      })
    )
    .min(1, 'Selecione pelo menos uma disponibilidade'),

  // Aceite dos termos
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos de uso' }),
  }),
});

// Tipo inferido do schema
export type InterestFormData = z.infer<typeof interestFormSchema>;

// Labels para exibição em português
export const participantTypeLabels = {
  [ParticipantType.STUDENT]: 'Sou Estudante',
  [ParticipantType.GRADUATED]: 'Sou Formado',
} as const;

export const dayLabels = {
  [WeekDay.MONDAY]: 'Seg',
  [WeekDay.TUESDAY]: 'Ter',
  [WeekDay.WEDNESDAY]: 'Qua',
  [WeekDay.THURSDAY]: 'Qui',
  [WeekDay.FRIDAY]: 'Sex',
} as const;

export const periodLabels = {
  [DayPeriod.MORNING]: 'Manhã',
  [DayPeriod.AFTERNOON]: 'Tarde',
  [DayPeriod.EVENING]: 'Noite',
} as const;
