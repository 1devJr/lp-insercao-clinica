import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import './animations.css';

import SpotlightCard from '@/app/animations/spotlight-card';

interface MentoringItemProps {
  image: string;
  text: string;
  index: number;
}

const MethodItem = ({ image, text }: MentoringItemProps) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <SpotlightCard
      className='relative text-white'
      onHover={(status) => {
        status ? setShowContent(true) : setShowContent(false);
      }}
    >
      <Image
        src={image}
        alt='Mentoring Icon'
        width={50}
        height={50}
        className='w-auto h-auto md:ml-4 md:mt-0'
      />
      <span className='text-center w-full  pb-4'> {text} </span>
      <div className='min-h-[68px]'>
        {showContent && (
          <span className='animate-fade-in-line-by-line text-center'>
            {'Mais conteudo neste card... Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni eos, dolorum nobis accusamus totam blanditiis quaerat deserunt qui facilis consequatur? Quos qui iusto, aliquid tempora dolore ipsa voluptates optio!'
              .split(/(?<=\.)\s+/)
              .map((line, index) => (
                <span key={index} style={{ ['--line-index' as string]: index }}>
                  {line}
                </span>
              ))}
          </span>
        )}
      </div>
    </SpotlightCard>
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
    },
    {
      image: '/images/MetodoIcon2.svg',
      text: `Aprendizado do processo administrativo de um consultório`,
    },
    {
      image: '/images/MetodoIcon3.svg',
      text: `Acompanhamento e suporte com profissional experiente`,
    },
    {
      image: '/images/MetodoIcon4.svg',
      text: `Acompanhamento e suporte com profissional experiente`,
    },
    {
      image: '/images/MetodoIcon5.svg',
      text: `Acompanhamento e suporte com profissional experiente`,
    },
    // Adicione mais objetos aqui conforme necessário
  ];

  return (
    <>
      <div className='section-mentoring  bg-[#3C3B39] relative p-10'>
        {/* Titulo que ocupa 100% da tela e com um traço embaixo */}
        <div className='w-full flex justify-center items-center flex-col'>
          <h1 className='text-6xl  font-bold text-[#FCF8F0] text-center'>
            Entenda nosso método
          </h1>
          <span className=' border-b-4 w-28 mt-7 border-b-[#277D7D]'></span>
        </div>
        <div className='flex flex-wrap justify-between gap-5 w-full max-w-7xl mx-auto py-20 px-4 items-start '>
          {/* Estrutura dinâmica com repetição */}
          {mentoringItems.map((item, index) => (
            <div
              key={index}
              className='flex flex-col min-h-96 min-w-[350px] items-center justify-start rounded-lg flex-[1_1_calc(33.333%-90px)]'
            >
              <MethodItem text={item.text} image={item.image} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
