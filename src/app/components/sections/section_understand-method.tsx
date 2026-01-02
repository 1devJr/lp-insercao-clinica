'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import './animations.css';

import FlipCard from '@/app/animations/flip-card';

interface MentoringItemProps {
  image: string;
  text: string;
  backContent: string;
  index: number;
}

const MethodItem = ({
  image,
  text,
  backContent,
  index,
}: MentoringItemProps) => {
  const numberLabel = `${String(index + 1).padStart(2, '0')}`;

  return (
    <FlipCard
      className='text-[#0B0F12]'
      height={360}
      width='100%'
      backgroundColor='#FCF8F0'
      borderColor='#3b2a24'
      borderWidth={1}
      front={
        <div className='flex h-full w-full flex-col items-start justify-between gap-4 text-left rounded-2xl p-8'>
          <div className='flex items-center gap-3 text-[#234A57] font-semibold tracking-tight'>
            <span className='text-sm px-3 py-1 bg-[#234A57]/10 rounded-full'>
              {numberLabel}
            </span>
            <span className='text-base uppercase'>Etapa</span>
          </div>
          <div className='flex w-full items-center justify-center'>
            <Image
              src={image}
              alt='Mentoring Icon'
              width={80}
              height={80}
              className='w-auto h-auto'
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(5%) sepia(8%) saturate(1089%) hue-rotate(155deg) brightness(97%) contrast(93%)',
              }}
            />
          </div>
          <h3 className='text-2xl font-semibold text-[#0B0F12] leading-tight'>
            {text}
          </h3>
        </div>
      }
      back={
        <div className='flex h-full w-full flex-col items-start justify-between gap-4 text-left rounded-2xl p-8'>
          <div className='flex items-center gap-3 text-[#234A57] font-semibold tracking-tight'>
            <span className='text-sm px-3 py-1 bg-[#234A57]/10 rounded-full'>
              {numberLabel}
            </span>
            <span className='text-base uppercase'>Detalhe</span>
          </div>
          <p className='text-base leading-relaxed text-[#0B0F12]/80'>
            {backContent}
          </p>
        </div>
      }
    />
  );
};

export default function SectionUnderstandMethod() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Scroll vertical controla o deslocamento horizontal do carrossel.
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const track = carouselRef.current;
      if (!section || !track) return;

      const viewportHeight = window.innerHeight;

      // Progresso dentro da seção: 0 quando topo encosta, 1 quando o fim da seção encosta no fim da viewport.
      const startOffset = viewportHeight * 0.35; // pausa extra antes de iniciar
      const endOffset = viewportHeight * 0.2; // deixa rolar um pouco mais até o fim

      const startScroll = section.offsetTop - startOffset;
      const endScroll =
        section.offsetTop + section.offsetHeight - viewportHeight + endOffset;
      const rawProgress =
        (window.scrollY - startScroll) / (endScroll - startScroll);
      const progress = Math.min(1, Math.max(0, rawProgress));

      const children = track.children;
      const numItems = children.length;
      if (numItems === 0) return;

      const firstChild = children[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).gap || '0');
      const itemWidth = firstChild.getBoundingClientRect().width + gap;

      const styles = getComputedStyle(track);
      const padLeft = parseFloat(styles.paddingLeft || '0');

      // Centro da tela
      const screenCenter = window.innerWidth / 2;

      // Posição inicial do primeiro card (centralizado por padding-left)
      // Quando translate=0, primeiro card está em padLeft + itemWidth/2
      // Queremos que o primeiro card fique no centro: já está ok com padLeft~45vw

      // Posição do último card quando translate=0:
      // padLeft + (numItems-1)*itemWidth + itemWidth/2 - gap/2
      const lastCardCenterInitial =
        padLeft +
        (numItems - 1) * itemWidth +
        firstChild.getBoundingClientRect().width / 2;

      // Para centralizar o último card na tela + extra para ele ficar um pouco à esquerda do centro
      const extraScroll = screenCenter * 0.4; // 40% extra para o card passar do centro
      const targetTranslate =
        screenCenter - lastCardCenterInitial - extraScroll; // valor negativo

      const translate = progress * targetTranslate;
      track.style.transform = `translateX(${translate}px)`;

      const effectiveMax = Math.abs(targetTranslate) || 1;
      const current = Math.round((progress * effectiveMax) / itemWidth);
      setActiveIndex(Math.max(0, Math.min(current, mentoringItems.length - 1)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [mentoringItems.length]);

  return (
    <>
      <div
        ref={sectionRef}
        className='section-mentoring relative'
        style={{
          backgroundImage: "url('/images/BackgroundTerracota.png')",
          height: `${mentoringItems.length * 120}vh`, // altura menor para concluir o movimento com sticky preso
        }}
      >
        <div className='absolute inset-0 bg-[#C67A5B]/85' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/16 via-white/10 to-white/6' />

        <div className='sticky top-0 h-screen w-full overflow-hidden'>
          {/* Título no topo */}
          <div className='relative z-20 max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16 w-full'>
            <div className='w-full flex justify-center items-center flex-col gap-4 text-center'>
              <h1 className="text-4xl md:text-5xl font-['Kurale',serif] font-semibold text-[#0B0F12]">
                Entenda nosso método
              </h1>
              <span className='h-[3px] w-20 bg-[#234A57] rounded-full' />
              <p className='max-w-3xl text-[#0B0F12]/80 text-base md:text-lg leading-relaxed'>
                Um caminho estruturado para você evoluir na prática clínica com
                segurança, suporte e método.
              </p>
            </div>
          </div>

          {/* Carrossel em full width abaixo do título */}
          <div className='absolute inset-x-0 top-[40%] z-10'>
            <div className='overflow-visible pb-48'>
              <div
                ref={carouselRef}
                className='flex gap-6 pb-8'
                style={{
                  transition: 'transform 0.12s ease-out',
                  paddingLeft: '45vw',
                  paddingRight: '60vw',
                }}
              >
                {mentoringItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex h-full min-w-[82vw] sm:min-w-[70vw] md:min-w-[56vw] lg:min-w-[40vw]'
                  >
                    <div
                      className={`w-full transition-transform duration-400 ease-out ${
                        activeIndex === index
                          ? 'scale-100 opacity-100'
                          : 'scale-[0.95] opacity-80'
                      }`}
                    >
                      <MethodItem
                        text={item.text}
                        image={item.image}
                        backContent={item.backContent}
                        index={index}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
