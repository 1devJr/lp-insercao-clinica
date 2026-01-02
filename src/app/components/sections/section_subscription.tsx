'use client';

import { Send } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import {
  ParticipantType,
  participantTypeLabels,
} from '@/lib/validations/interestForm';

import { ScheduleSelector } from '@/components/form/ScheduleSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

import {
  FormState,
  submitInterestForm,
} from '@/app/actions/submitInterestForm';

type ParticipantTypeValue =
  (typeof ParticipantType)[keyof typeof ParticipantType];

const initialState: FormState = {
  success: false,
  message: '',
};

// Componente para o botão de submit com estado de pending
function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending || disabled}
      className='bg-[#fcf8f0] text-[#234A57] hover:bg-[#f0ece4] px-8 py-3 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50'
    >
      {pending ? (
        <>
          <div className='w-4 h-4 border-2 border-[#234A57] border-t-transparent rounded-full animate-spin' />
          Enviando...
        </>
      ) : (
        <>
          <Send className='w-4 h-4' />
          Enviar
        </>
      )}
    </Button>
  );
}

export default function SectionSubscription() {
  const [state, formAction] = useActionState(submitInterestForm, initialState);

  // Estados locais para controlar o formulário
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [participantType, setParticipantType] = useState<
    ParticipantTypeValue | ''
  >('');
  const [tccExperience, setTccExperience] = useState('');
  const [mentoringInterest, setMentoringInterest] = useState('');
  const [availability, setAvailability] = useState<
    Array<{ day: string; period: string }>
  >([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    email: false,
    participantType: false,
    tccExperience: false,
    mentoringInterest: false,
    availability: false,
    acceptTerms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Efeito para mostrar mensagem de sucesso
  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      // Reset form após sucesso
      setFullName('');
      setPhone('');
      setEmail('');
      setParticipantType('');
      setTccExperience('');
      setMentoringInterest('');
      setAvailability([]);
      setAcceptTerms(false);
      setTouched({
        fullName: false,
        phone: false,
        email: false,
        participantType: false,
        tccExperience: false,
        mentoringInterest: false,
        availability: false,
        acceptTerms: false,
      });
    }
  }, [state.success]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const clientErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 3) errors.fullName = 'Nome muito curto';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) errors.phone = 'Telefone inválido';
    if (!emailRegex.test(email.trim())) errors.email = 'Email inválido';
    if (
      participantType !== ParticipantType.STUDENT &&
      participantType !== ParticipantType.GRADUATED
    ) {
      errors.participantType = 'Seleção obrigatória';
    }
    // tccExperience e mentoringInterest agora são opcionais
    if (!availability || availability.length === 0)
      errors.availability =
        'Selecione ao menos um horário que esteja disponível';
    if (!acceptTerms) errors.acceptTerms = 'Aceite os termos para prosseguir';
    return errors;
  }, [fullName, phone, email, participantType, availability, acceptTerms]);

  const isClientInvalid = Object.keys(clientErrors).length > 0;

  // Se mostrou sucesso, renderiza mensagem de confirmação
  if (showSuccess) {
    return (
      <section className='bg-white relative py-20 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className="font-['Kurale',serif] text-5xl md:text-7xl text-[#3c3b39] mb-8 tracking-tight">
            Obrigado!
          </h2>
          <div className='bg-[#234A57] rounded-xl p-12 max-w-2xl mx-auto'>
            <p className='text-[#fcf8f0] text-xl leading-relaxed mb-8'>
              {state.message}
            </p>
            <Button
              onClick={() => setShowSuccess(false)}
              className='bg-[#fcf8f0] text-[#234A57] hover:bg-[#f0ece4]'
            >
              Enviar outro formulário
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id='subscription-form'
      className='bg-white relative py-20 px-4 scroll-mt-8'
    >
      {/* Header */}
      <div className='max-w-4xl mx-auto text-center mb-12'>
        <h2 className="font-['Kurale',serif] text-5xl md:text-7xl text-[#3c3b39] mb-4 tracking-tight">
          Demonstre interesse
        </h2>
        <div className='w-24 h-1 bg-[#6b413a]/70 mx-auto mb-8' />
        <p className='text-[#3c3b39] text-base leading-relaxed max-w-3xl mx-auto'>
          Preencha a ficha de interesse, em no máximo 2 dias um dos nossos
          colaboradores entrará em contato com você para tirar todas suas
          dúvidas e se for do seu interesse realizar sua inscrição.
        </p>
      </div>

      {/* Form Container */}
      <div className='max-w-[964px] mx-auto'>
        <form
          action={formAction}
          className='bg-[#234A57] rounded-xl p-8 md:p-12'
        >
          {/* Mensagem de erro geral */}
          {state.message && !state.success && (
            <div className='bg-red-500/20 border border-red-400 rounded-lg p-4 mb-8'>
              <p className='text-red-300 text-center'>{state.message}</p>
            </div>
          )}

          {/* Row 1: Nome e Telefone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div className='space-y-2'>
              <Label htmlFor='fullName' className='text-[#fcf8f0]'>
                Preencha com seu nome completo{' '}
                <span className='text-[#C67A5B]'>*</span>
              </Label>
              <Input
                id='fullName'
                name='fullName'
                type='text'
                placeholder='Fulano da Silva Beltrano'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, fullName: true }))
                }
                className={cn(
                  'bg-white border-[#79747e] text-[#1e1e1e] placeholder:text-gray-400',
                  (state.errors?.fullName ||
                    (touched.fullName && clientErrors.fullName)) &&
                    'border-red-400'
                )}
              />
              {state.errors?.fullName && (
                <p className='text-red-400 text-sm'>
                  {state.errors.fullName[0]}
                </p>
              )}
              {!state.errors?.fullName &&
                touched.fullName &&
                clientErrors.fullName && (
                  <p className='text-red-400 text-sm'>
                    {clientErrors.fullName}
                  </p>
                )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone' className='text-[#fcf8f0]'>
                Preencha com seu telefone{' '}
                <span className='text-[#C67A5B]'>*</span>
              </Label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='(51) 9 9999 9999'
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                className={cn(
                  'bg-white border-[#79747e] text-[#1e1e1e] placeholder:text-gray-400',
                  (state.errors?.phone ||
                    (touched.phone && clientErrors.phone)) &&
                    'border-red-400'
                )}
              />
              {state.errors?.phone && (
                <p className='text-red-400 text-sm'>{state.errors.phone[0]}</p>
              )}
              {!state.errors?.phone && touched.phone && clientErrors.phone && (
                <p className='text-red-400 text-sm'>{clientErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email e Tipo de Participante */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-[#fcf8f0]'>
                Preencha com seu melhor email{' '}
                <span className='text-[#C67A5B]'>*</span>
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='seu@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                className={cn(
                  'bg-white border-[#79747e] text-[#1e1e1e] placeholder:text-gray-400',
                  (state.errors?.email ||
                    (touched.email && clientErrors.email)) &&
                    'border-red-400'
                )}
              />
              {state.errors?.email && (
                <p className='text-red-400 text-sm'>{state.errors.email[0]}</p>
              )}
              {!state.errors?.email && touched.email && clientErrors.email && (
                <p className='text-red-400 text-sm'>{clientErrors.email}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label className='text-[#fcf8f0]'>
                Você é: <span className='text-[#C67A5B]'>*</span>
              </Label>
              <RadioGroup
                name='participantType'
                value={participantType}
                onValueChange={(val) => {
                  setParticipantType(val as ParticipantTypeValue);
                  setTouched((prev) => ({ ...prev, participantType: true }));
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, participantType: true }))
                }
                className='flex gap-6 pt-2'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={ParticipantType.STUDENT}
                    id='student'
                    className='border-[#b3b3b3] text-[#fcf8f0]'
                  />
                  <Label
                    htmlFor='student'
                    className='text-[#fcf8f0] font-normal cursor-pointer'
                  >
                    {participantTypeLabels[ParticipantType.STUDENT]}
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={ParticipantType.GRADUATED}
                    id='graduated'
                    className='border-[#b3b3b3] text-[#fcf8f0]'
                  />
                  <Label
                    htmlFor='graduated'
                    className='text-[#fcf8f0] font-normal cursor-pointer'
                  >
                    {participantTypeLabels[ParticipantType.GRADUATED]}
                  </Label>
                </div>
              </RadioGroup>
              {state.errors?.participantType && (
                <p className='text-red-400 text-sm'>
                  {state.errors.participantType[0]}
                </p>
              )}
              {!state.errors?.participantType &&
                touched.participantType &&
                clientErrors.participantType && (
                  <p className='text-red-400 text-sm'>
                    {clientErrors.participantType}
                  </p>
                )}
            </div>
          </div>

          {/* Divider */}
          <div className='w-24 h-px bg-[#fcf8f0]/30 mx-auto mb-8' />

          {/* Textarea 1: Experiência com TCC */}
          <div className='space-y-2 mb-8'>
            <Label
              htmlFor='tccExperience'
              className='text-[#fcf8f0] block text-center'
            >
              Descreva brevemente sua experiência com Terapia Cognitivo
              Comportamental
            </Label>
            <Textarea
              id='tccExperience'
              name='tccExperience'
              rows={6}
              placeholder='Conte-nos sobre sua formação, experiências práticas e conhecimentos em TCC...'
              value={tccExperience}
              onChange={(e) => setTccExperience(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, tccExperience: true }))
              }
              className={cn(
                'bg-white border-[#d9d9d9] text-[#1e1e1e] placeholder:text-gray-400 resize-y min-h-[120px]',
                (state.errors?.tccExperience ||
                  (touched.tccExperience && clientErrors.tccExperience)) &&
                  'border-red-400'
              )}
            />
            {state.errors?.tccExperience && (
              <p className='text-red-400 text-sm'>
                {state.errors.tccExperience[0]}
              </p>
            )}
            {!state.errors?.tccExperience &&
              touched.tccExperience &&
              clientErrors.tccExperience && (
                <p className='text-red-400 text-sm'>
                  {clientErrors.tccExperience}
                </p>
              )}
          </div>

          {/* Divider */}
          <div className='w-24 h-px bg-[#fcf8f0]/30 mx-auto mb-8' />

          {/* Textarea 2: Interesse na Mentoria */}
          <div className='space-y-2 mb-8'>
            <Label
              htmlFor='mentoringInterest'
              className='text-[#fcf8f0] block text-center'
            >
              O que fez você se interessar pela mentoria
            </Label>
            <Textarea
              id='mentoringInterest'
              name='mentoringInterest'
              rows={8}
              placeholder='Compartilhe suas motivações, objetivos e expectativas com a mentoria...'
              value={mentoringInterest}
              onChange={(e) => setMentoringInterest(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, mentoringInterest: true }))
              }
              className={cn(
                'bg-white border-[#d9d9d9] text-[#1e1e1e] placeholder:text-gray-400 resize-y min-h-[160px]',
                (state.errors?.mentoringInterest ||
                  (touched.mentoringInterest &&
                    clientErrors.mentoringInterest)) &&
                  'border-red-400'
              )}
            />
            {state.errors?.mentoringInterest && (
              <p className='text-red-400 text-sm'>
                {state.errors.mentoringInterest[0]}
              </p>
            )}
            {!state.errors?.mentoringInterest &&
              touched.mentoringInterest &&
              clientErrors.mentoringInterest && (
                <p className='text-red-400 text-sm'>
                  {clientErrors.mentoringInterest}
                </p>
              )}
          </div>

          {/* Divider */}
          <div className='w-24 h-px bg-[#fcf8f0]/30 mx-auto mb-8' />

          {/* Schedule Selector */}
          <div className='mb-8'>
            <ScheduleSelector
              value={availability}
              onChange={(val) => {
                setAvailability(val);
                setTouched((prev) => ({ ...prev, availability: true }));
              }}
              error={state.errors?.availability?.[0]}
            />
            {/* Hidden input para enviar availability no FormData */}
            <input
              type='hidden'
              name='availability'
              value={JSON.stringify(availability)}
            />
            {!state.errors?.availability &&
              touched.availability &&
              clientErrors.availability && (
                <p className='text-red-400 text-sm mt-2 text-center'>
                  {clientErrors.availability}
                </p>
              )}
          </div>

          {/* Terms Checkbox */}
          <div className='flex items-start justify-center gap-3 mb-8'>
            <Checkbox
              id='acceptTerms'
              checked={acceptTerms}
              onCheckedChange={(checked) => {
                setAcceptTerms(checked as boolean);
                setTouched((prev) => ({ ...prev, acceptTerms: true }));
                if (!participantType) {
                  setTouched((prev) => ({ ...prev, participantType: true }));
                }
              }}
              className='mt-1 border-[#d9d9d9] data-[state=checked]:bg-[#fcf8f0] data-[state=checked]:text-[#234A57]'
            />
            <input
              type='hidden'
              name='acceptTerms'
              value={acceptTerms.toString()}
            />
            <Label
              htmlFor='acceptTerms'
              className='text-[#fcf8f0] text-xs leading-relaxed max-w-lg cursor-pointer'
            >
              <span className='text-[#C67A5B] mr-1'>*</span>
              Seus dados estão protegidos! Ao enviar, você concorda com nossos{' '}
              <Link
                href='/termos-de-uso'
                className='underline hover:text-[#C67A5B] transition-colors'
              >
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link
                href='/politica-de-privacidade'
                className='underline hover:text-[#C67A5B] transition-colors'
              >
                Política de Privacidade
              </Link>
              . Garantimos que suas informações serão tratadas com segurança e
              usadas apenas para fins relevantes.
            </Label>
          </div>
          {state.errors?.acceptTerms && (
            <p className='text-red-400 text-sm text-center mb-4'>
              {state.errors.acceptTerms[0]}
            </p>
          )}
          {!state.errors?.acceptTerms &&
            touched.acceptTerms &&
            clientErrors.acceptTerms && (
              <p className='text-red-400 text-sm text-center mb-4'>
                {clientErrors.acceptTerms}
              </p>
            )}

          {/* Submit Button */}
          <div className='flex justify-center'>
            <div className='relative inline-block'>
              <SubmitButton disabled={isClientInvalid} />
              {isClientInvalid && (
                <button
                  type='button'
                  aria-label='Mostrar erros do formulário'
                  className='absolute inset-0 bg-transparent'
                  onClick={() =>
                    setTouched((prev) => ({ ...prev, availability: true }))
                  }
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
