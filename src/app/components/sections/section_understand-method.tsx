import { Metadata } from 'next';
import Image from 'next/image';

import './animations.css';

import FlipCard from '@/app/animations/flip-card';

interface MentoringItemProps {
  image: string;
  text: string;
  backContent: string;
  index: number;
}

const MethodItem = ({ image, text, backContent }: MentoringItemProps) => {
  return (
    <FlipCard
      className='text-[#0B0F12]'
      height={340}
      width='100%'
      front={
        <div className='flex h-full w-full flex-col items-center justify-center gap-4 text-center bg-transparent rounded-2xl p-6'>
          <div className='w-16 h-16 flex items-center justify-center'>
            <Image
              src={image}
              alt='Mentoring Icon'
              width={60}
              height={60}
              className='w-auto h-auto'
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(5%) sepia(8%) saturate(1089%) hue-rotate(155deg) brightness(97%) contrast(93%)',
              }}
            />
          </div>
          <span className='text-lg font-semibold w-full px-4 text-[#0B0F12]'>
            {text}
          </span>
          {/* Texto diferente para mobile vs desktop */}
          <span className='text-sm text-[#0B0F12]/60 px-6 hidden md:block'>
            Passe o mouse para virar
          </span>
          <span className='text-sm text-[#0B0F12]/60 px-6 md:hidden'>
            Role para ver mais
          </span>
        </div>
      }
      back={
        <div className='flex h-full w-full flex-col items-center justify-center gap-4 text-center bg-transparent rounded-2xl p-6'>
          <span className='text-lg font-semibold text-[#0B0F12]'>
            Mais detalhes
          </span>
          <p className='text-sm leading-relaxed text-[#0B0F12]/80 px-2'>
            {backContent}
          </p>
        </div>
      }
    />
  );
};

export const metadata: Metadata = {
  title: 'Sessão Entenda Nosso Método',
  description:
    'Esta sessão contem a explicação sobre o método utilizado na mentoria, incluindo os objetivos e benefícios para os participantes.',
};

export default function SectionUnderstandMethod() {
  const mentoringItems = [
    {
      image: '/images/MetodoIcon1.svg',
      text: 'Capacitação básica em TCC e Contextuais',
      backContent:
        'Aprenda os fundamentos da Terapia Cognitivo-Comportamental e abordagens contextuais para aplicar na prática clínica com segurança.',
    },
    {
      image: '/images/MetodoIcon2.svg',
      text: 'Aprendizado do processo administrativo de um consultório',
      backContent:
        'Domine a gestão do seu consultório: agendamentos, prontuários, contratos e tudo que você precisa para uma clínica organizada.',
    },
    {
      image: '/images/MetodoIcon3.svg',
      text: 'Acompanhamento e suporte com profissional experiente',
      backContent:
        'Tenha supervisão individualizada com psicólogos experientes para tirar dúvidas e desenvolver suas habilidades clínicas.',
    },
    {
      image: '/images/MetodoIcon4.svg',
      text: 'Acompanhamento e suporte com profissional experiente',
      backContent:
        'Receba feedback contínuo sobre seus atendimentos e evolua com orientações personalizadas para cada caso.',
    },
    {
      image: '/images/MetodoIcon5.svg',
      text: 'Acompanhamento e suporte com profissional experiente',
      backContent:
        'Participe de grupos de discussão de casos e amplie sua visão clínica com diferentes perspectivas.',
    },
  ];

  return (
    <>
      <div className='section-mentoring bg-[#C67A5B] relative p-10'>
        <div className='w-full flex justify-center items-center flex-col'>
          <h1 className='text-6xl font-bold text-[#0B0F12] text-center'>
            Entenda nosso método
          </h1>
          <span className='border-b-4 w-28 mt-7 border-b-[#234A57]'></span>
        </div>
        <div className='flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto py-20 px-4'>
          {mentoringItems.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-start w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
            >
              <MethodItem
                text={item.text}
                image={item.image}
                backContent={item.backContent}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
