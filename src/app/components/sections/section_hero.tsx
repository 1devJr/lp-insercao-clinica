import { ChevronsDown } from 'lucide-react';
import { Metadata } from 'next';

import './section_hero.css';
export const metadata: Metadata = {
  title: 'Sessão inicial',
  description:
    'Esta sessão contém o cabeçalho principal do site, incluindo o título a descrição e um botão para indicando para rolar a página.',
};

export default function SectionHero() {
  return (
    <>
      <section className='section-hero relative'>
        <div className='container mx-auto flex flex-col items-start justify-end h-screen relative px-4 pb-20 md:pb-0'>
          <div className='flex flex-col gap-4 mb-auto mt-auto md:mb-0 md:mt-0 md:absolute md:bottom-80'>
            <h1 className='title text-5xl sm:text-6xl md:text-7xl font-serif font-normal max-w-4xl leading-tight'>
              Projeto Inserção na clínica psicológica
            </h1>
            <span className='description text-base sm:text-lg md:text-xl max-w-2xl'>
              Aprenda de forma prática e imersiva tudo que precisa saber para
              ingressar na clinica psicológica, na abordagem cognitivo
              comportamental
            </span>
          </div>
          <div className='absolute w-full flex justify-center text-center bottom-10 animate-bounce left-0'>
            <ChevronsDown className='h-8 w-8 md:h-10 md:w-10' />
          </div>
        </div>
      </section>
    </>
  );
}
