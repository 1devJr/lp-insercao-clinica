'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type TabType = 'clinica' | 'mentora';

export default function SectionQuemSomos() {
  const [activeTab, setActiveTab] = useState<TabType>('mentora');

  const scrollToForm = () => {
    const formSection = document.getElementById('subscription-form');
    if (formSection) {
      const rect = formSection.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      window.scrollTo({
        top: absoluteTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id='quem-somos' className='bg-[#f5f0e6] py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        {/* Desktop Layout */}
        <div className='hidden lg:grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto'>
          {/* Left Column - Image and Tabs */}
          <div className='flex flex-col gap-6'>
            <div className='relative aspect-[4/5] w-full max-w-md rounded-lg overflow-hidden'>
              <Image
                src='/images/nicole_quem_somos.webp'
                alt='Nicole Menote'
                fill
                className={cn(
                  'object-cover object-top transition-opacity duration-500 ease-in-out',
                  activeTab === 'mentora' ? 'opacity-100' : 'opacity-0'
                )}
                sizes='50vw'
              />
              <Image
                src='/images/clinica_quem_somos.webp'
                alt='Clínica Menote'
                fill
                className={cn(
                  'object-cover object-top transition-opacity duration-500 ease-in-out',
                  activeTab === 'clinica' ? 'opacity-100' : 'opacity-0'
                )}
                sizes='50vw'
              />
            </div>

            {/* Toggle Tabs */}
            <div className='flex w-full max-w-md border border-[#3c3b39] rounded-lg overflow-hidden'>
              <button
                onClick={() => setActiveTab('clinica')}
                className={cn(
                  'flex-1 py-4 text-center font-medium transition-all duration-300',
                  activeTab === 'clinica'
                    ? 'bg-[#3c3b39] text-[#fcf8f0]'
                    : 'bg-[#fcf8f0] text-[#3c3b39] hover:bg-[#3c3b39]/10'
                )}
              >
                Clínica
              </button>
              <button
                onClick={() => setActiveTab('mentora')}
                className={cn(
                  'flex-1 py-4 text-center font-medium transition-all duration-300',
                  activeTab === 'mentora'
                    ? 'bg-[#3c3b39] text-[#fcf8f0]'
                    : 'bg-[#fcf8f0] text-[#3c3b39] hover:bg-[#3c3b39]/10'
                )}
              >
                Mentora
              </button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className='flex flex-col gap-6'>
            <div className='text-center'>
              <h2 className="font-['Kurale'] text-5xl lg:text-6xl text-[#3c3b39]">
                Quem somos
              </h2>
              <div className='w-24 h-1 bg-[#C67A5B] mx-auto mt-4' />
            </div>

            <div className='relative min-h-[500px]'>
              {/* Mentora Content */}
              <div
                className={cn(
                  'flex flex-col gap-6 transition-all duration-500 ease-in-out',
                  activeTab === 'mentora'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                )}
              >
                <div className='text-center'>
                  <a
                    href='https://instagram.com/psicologanicolemenote'
                    target='_blank'
                    rel='noopener noreferrer'
                    className="font-['Kurale'] text-2xl md:text-3xl text-[#3c3b39] hover:text-[#C67A5B] transition-colors block"
                  >
                    NICOLE MENOTE
                  </a>
                  <a
                    href='https://instagram.com/psicologanicolemenote'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#3c3b39] hover:text-[#C67A5B] transition-colors text-sm mt-1 block'
                  >
                    @psicologanicolemenote
                  </a>
                </div>

                <div className='space-y-4 text-[#3c3b39] text-justify leading-relaxed'>
                  <p>
                    Psicóloga clínica com 10 anos de experiência, especializada
                    em Terapia Cognitivo-Comportamental (TCC), com ênfase em
                    Terapia do Esquema e Neuropsicologia. Ao longo da minha
                    trajetória, já ajudei dezenas de psicólogos a se
                    estruturarem na clínica, conquistarem uma agenda consistente
                    de pacientes e desenvolverem bagagem científica e emocional
                    para lidar com os medos e inseguranças do início da prática
                    profissional.
                  </p>
                  <p>
                    Nas primeiras versões do projeto, mentorei profissionais com
                    pouca vivência clínica ou sem base de pacientes. A partir
                    dessa experiência, desenvolvi e refinei um método de
                    acompanhamento e ensino, fundamentado na prática clínica e
                    em referências como Judith Beck, Jeffrey Young e Kristin
                    Neff. Hoje, esses profissionais atuam de forma ética, segura
                    e independente, com uma clínica estruturada — resultado do
                    qual me orgulho profundamente.
                  </p>
                  <p className='font-medium'>
                    Agora, quero te ajudar a ingressar na clínica com confiança,
                    estratégia e sem erros desnecessários.
                  </p>
                </div>

                <button
                  onClick={scrollToForm}
                  className='mt-4 bg-[#3c3b39] text-[#fcf8f0] px-8 py-4 rounded-lg font-medium hover:bg-[#3c3b39]/90 transition-colors mx-auto'
                >
                  Quero Participar
                </button>
              </div>

              {/* Clínica Content */}
              <div
                className={cn(
                  'flex flex-col gap-6 transition-all duration-500 ease-in-out',
                  activeTab === 'clinica'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                )}
              >
                <div className='text-center flex flex-col items-center'>
                  <a
                    href='https://instagram.com/clinicamenote'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:opacity-80 transition-opacity'
                  >
                    <Image
                      src='/images/logo_clinica_quem_somos.webp'
                      alt='Logo Clínica Menote'
                      width={280}
                      height={84}
                    />
                  </a>
                  <a
                    href='https://instagram.com/clinicamenote'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#3c3b39] hover:text-[#C67A5B] transition-colors text-sm mt-2'
                  >
                    @clinicamenote
                  </a>
                </div>

                <div className='space-y-4 text-[#3c3b39] text-justify leading-relaxed'>
                  <p>
                    Fundada em 2018 pelas irmãs Daianna Menote, médica
                    psiquiatra, e Nicole Menote, psicóloga, a Clínica Menote
                    nasceu da união entre prática clínica qualificada e um
                    propósito claro: oferecer cuidado ético e humanizado em
                    saúde mental.
                  </p>
                  <p>
                    Desde sua criação, a clínica é guiada por valores como
                    qualidade técnica, relações profissionais saudáveis e
                    crescimento colaborativo. Mais do que um espaço de
                    atendimento, se consolidou como um ambiente de
                    desenvolvimento profissional, criando oportunidades reais de
                    inserção na prática clínica por meio de parcerias justas e
                    acompanhamento técnico.
                  </p>
                  <p>
                    Atualmente, conta com uma equipe de quase 20 profissionais
                    cuidadosamente selecionada e alinhada aos valores
                    institucionais, garantindo um ambiente de acolhimento e
                    crescimento contínuo — tanto para pacientes quanto para
                    profissionais.
                  </p>
                </div>

                <button
                  onClick={scrollToForm}
                  className='mt-4 bg-[#3c3b39] text-[#fcf8f0] px-8 py-4 rounded-lg font-medium hover:bg-[#3c3b39]/90 transition-colors mx-auto'
                >
                  Quero Participar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='lg:hidden flex flex-col gap-6 max-w-md mx-auto'>
          {/* Title */}
          <div className='text-center'>
            <h2 className="font-['Kurale'] text-4xl md:text-5xl text-[#3c3b39]">
              Quem somos
            </h2>
            <div className='w-24 h-1 bg-[#C67A5B] mx-auto mt-4' />
          </div>

          {/* Subtitle and @ - with transition */}
          <div className='relative min-h-[70px]'>
            {/* Mentora Header */}
            <div
              className={cn(
                'text-center transition-all duration-500 ease-in-out',
                activeTab === 'mentora'
                  ? 'opacity-100'
                  : 'opacity-0 absolute inset-0 pointer-events-none'
              )}
            >
              <a
                href='https://instagram.com/psicologanicolemenote'
                target='_blank'
                rel='noopener noreferrer'
                className="font-['Kurale'] text-2xl text-[#3c3b39] hover:text-[#C67A5B] transition-colors block"
              >
                NICOLE MENOTE
              </a>
              <a
                href='https://instagram.com/psicologanicolemenote'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#3c3b39] hover:text-[#C67A5B] transition-colors text-sm mt-1 block'
              >
                @psicologanicolemenote
              </a>
            </div>

            {/* Clínica Header */}
            <div
              className={cn(
                'text-center flex flex-col items-center transition-all duration-500 ease-in-out',
                activeTab === 'clinica'
                  ? 'opacity-100'
                  : 'opacity-0 absolute inset-0 pointer-events-none'
              )}
            >
              <a
                href='https://instagram.com/clinicamenote'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:opacity-80 transition-opacity'
              >
                <Image
                  src='/images/logo_clinica_quem_somos.webp'
                  alt='Logo Clínica Menote'
                  width={220}
                  height={66}
                />
              </a>
              <a
                href='https://instagram.com/clinicamenote'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#3c3b39] hover:text-[#C67A5B] transition-colors text-sm mt-1'
              >
                @clinicamenote
              </a>
            </div>
          </div>

          {/* Image */}
          <div className='relative aspect-[4/5] w-full rounded-lg overflow-hidden'>
            <Image
              src='/images/nicole_quem_somos.webp'
              alt='Nicole Menote'
              fill
              className={cn(
                'object-cover object-top transition-opacity duration-500 ease-in-out',
                activeTab === 'mentora' ? 'opacity-100' : 'opacity-0'
              )}
              sizes='100vw'
            />
            <Image
              src='/images/clinica_quem_somos.webp'
              alt='Clínica Menote'
              fill
              className={cn(
                'object-cover object-top transition-opacity duration-500 ease-in-out',
                activeTab === 'clinica' ? 'opacity-100' : 'opacity-0'
              )}
              sizes='100vw'
            />
          </div>

          {/* Toggle Tabs */}
          <div className='flex w-full border border-[#3c3b39] rounded-lg overflow-hidden'>
            <button
              onClick={() => setActiveTab('clinica')}
              className={cn(
                'flex-1 py-4 text-center font-medium transition-all duration-300',
                activeTab === 'clinica'
                  ? 'bg-[#3c3b39] text-[#fcf8f0]'
                  : 'bg-[#fcf8f0] text-[#3c3b39] hover:bg-[#3c3b39]/10'
              )}
            >
              Clínica
            </button>
            <button
              onClick={() => setActiveTab('mentora')}
              className={cn(
                'flex-1 py-4 text-center font-medium transition-all duration-300',
                activeTab === 'mentora'
                  ? 'bg-[#3c3b39] text-[#fcf8f0]'
                  : 'bg-[#fcf8f0] text-[#3c3b39] hover:bg-[#3c3b39]/10'
              )}
            >
              Mentora
            </button>
          </div>

          {/* Text Content */}
          <div className='relative min-h-[400px]'>
            {/* Mentora Text */}
            <div
              className={cn(
                'flex flex-col gap-4 transition-all duration-500 ease-in-out',
                activeTab === 'mentora'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
              )}
            >
              <div className='space-y-4 text-[#3c3b39] text-justify leading-relaxed'>
                <p>
                  Psicóloga clínica com 10 anos de experiência, especializada em
                  Terapia Cognitivo-Comportamental (TCC), com ênfase em Terapia
                  do Esquema e Neuropsicologia. Ao longo da minha trajetória, já
                  ajudei dezenas de psicólogos a se estruturarem na clínica,
                  conquistarem uma agenda consistente de pacientes e
                  desenvolverem bagagem científica e emocional para lidar com os
                  medos e inseguranças do início da prática profissional.
                </p>
                <p>
                  Nas primeiras versões do projeto, mentorei profissionais com
                  pouca vivência clínica ou sem base de pacientes. A partir
                  dessa experiência, desenvolvi e refinei um método de
                  acompanhamento e ensino, fundamentado na prática clínica e em
                  referências como Judith Beck, Jeffrey Young e Kristin Neff.
                  Hoje, esses profissionais atuam de forma ética, segura e
                  independente, com uma clínica estruturada — resultado do qual
                  me orgulho profundamente.
                </p>
                <p className='font-medium'>
                  Agora, quero te ajudar a ingressar na clínica com confiança,
                  estratégia e sem erros desnecessários.
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className='mt-4 bg-[#3c3b39] text-[#fcf8f0] px-8 py-4 rounded-lg font-medium hover:bg-[#3c3b39]/90 transition-colors mx-auto'
              >
                Quero Participar
              </button>
            </div>

            {/* Clínica Text */}
            <div
              className={cn(
                'flex flex-col gap-4 transition-all duration-500 ease-in-out',
                activeTab === 'clinica'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
              )}
            >
              <div className='space-y-4 text-[#3c3b39] text-justify leading-relaxed'>
                <p>
                  Fundada em 2018 pelas irmãs Daianna Menote, médica psiquiatra,
                  e Nicole Menote, psicóloga, a Clínica Menote nasceu da união
                  entre prática clínica qualificada e um propósito claro:
                  oferecer cuidado ético e humanizado em saúde mental.
                </p>
                <p>
                  Desde sua criação, a clínica é guiada por valores como
                  qualidade técnica, relações profissionais saudáveis e
                  crescimento colaborativo. Mais do que um espaço de
                  atendimento, se consolidou como um ambiente de desenvolvimento
                  profissional, criando oportunidades reais de inserção na
                  prática clínica por meio de parcerias justas e acompanhamento
                  técnico.
                </p>
                <p>
                  Atualmente, conta com uma equipe de quase 20 profissionais
                  cuidadosamente selecionada e alinhada aos valores
                  institucionais, garantindo um ambiente de acolhimento e
                  crescimento contínuo — tanto para pacientes quanto para
                  profissionais.
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className='mt-4 bg-[#3c3b39] text-[#fcf8f0] px-8 py-4 rounded-lg font-medium hover:bg-[#3c3b39]/90 transition-colors mx-auto'
              >
                Quero Participar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
