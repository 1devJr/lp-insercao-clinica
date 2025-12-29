import { Metadata } from 'next';
import Image from 'next/image';

import AnimatedContent from '@/app/animations/animated-content';

interface MentoringItemProps {
  image: string;
  text: string;
  index: number;
}

const MentoringItem = ({ image, text, index }: MentoringItemProps) => (
  <div
    className={`flex flex-col justify-center items-center gap-12  ${
      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
    }  items-center   w-full`}
  >
    <div className='md:w-4/5 w-full text-justify text-black text-lg'>
      <p className='text-justify w-full text-xl md:text-2xl leading-relaxed'>
        {text}
      </p>
    </div>
    <div className='md:w-1/5 w-full flex items-center justify-center md:justify-normal md:items-start mt-4 md:mt-0'>
      <Image
        src={image}
        alt='Mentoring Icon'
        width={80}
        height={80}
        className='w-auto h-auto md:ml-4 md:mt-0'
      />
    </div>
  </div>
);

export const metadata: Metadata = {
  title: 'Sessão Mentoria',
  description:
    'Esta sessão contém o a explicação sobre a mentoria oferecida no projeto, incluindo os objetivos e benefícios para os participantes.',
};

export default function SectionMentoring() {
  const mentoringItems = [
    {
      image: '/images/MentoriaIcon1.svg',
      text: 'Sabemos que começar na clínica pode ser um desafio. Insegurança, falta de experiência prática e dúvidas sobre como consolidar sua agenda de pacientes são algumas das dificuldades mais comuns.',
    },
    {
      image: '/images/MentoriaIcon2.svg',
      text: `Pensando nisso, criamos esta mentoria para guiar psicólogos recém-formados ou que ainda não atuam na clínica a construírem uma carreira sólida e sustentável.`,
    },
    {
      image: '/images/MentoriaIcon3.svg',
      text: `Com metodologia estruturada, conteúdo prático e suporte contínuo, você aprenderá a se posicionar no mercado, captar pacientes e desenvolver segurança na sua atuação clínica.`,
    },
    // Adicione mais objetos aqui conforme necessário
  ];

  return (
    <>
      <div className='section-mentoring  bg-[#FCF8F0] relative p-10'>
        {/* Titulo que ocupa 100% da tela e com um traço embaixo */}
        <div className='w-full flex justify-center items-center flex-col'>
          <h1 className='text-4xl md:text-5xl font-bold text-black text-center'>
            Sobre a Mentoria
          </h1>
          <span className=' border-b-4 w-28 mt-5 border-b-[#C67A5B]'></span>
        </div>
        <div className='flex flex-col items-center justify-center gap-14 w-full max-w-5xl mx-auto py-16 px-4'>
          {/* Estrutura dinâmica com repetição */}
          {mentoringItems.map((item, index) => (
            <AnimatedContent
              key={`animatedContent-${index}`}
              distance={100}
              direction='vertical'
              reverse={false}
              duration={0.8}
              ease='power3.out'
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.1}
            >
              <MentoringItem
                key={index}
                index={index}
                image={item.image}
                text={item.text}
              />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </>
  );
}
