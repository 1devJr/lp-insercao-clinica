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
        <div className='container mx-auto flex flex-col items-start justify-start h-screen relative'>
          <h1 className='title text-7xl font-normal absolute max-w-4xl bottom-80'>
            Projeto Inserção na clínica psicológica
          </h1>
          <span className='description absolute text-xl  bottom-56 max-w-2xl'>
            Aprenda de forma prática e imersiva tudo que precisa saber para
            ingressar na clinica psicológica, na abordagem cognitivo
            comportamental
          </span>
          <div className='absolute w-full flex justify-center  text-center bottom-10 animate-bounce'>
            <ChevronsDown className='h-10 w-10 ' />
          </div>
        </div>
      </section>
    </>
  );
}
