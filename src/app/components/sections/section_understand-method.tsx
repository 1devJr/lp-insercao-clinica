'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import './animations.css';

import FlipCard from '@/app/animations/flip-card';

interface MentoringItemProps {
  image: string;
  text: string;
  backContent: string | React.ReactNode;
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
      height='100%'
      width='100%'
      backgroundColor='#FCF8F0'
      borderColor='#3b2a24'
      borderWidth={1}
      front={
        <div className='flex h-full w-full flex-col items-center justify-between gap-2 text-center rounded-2xl p-5 md:p-6'>
          <div className='flex items-center gap-2 text-[#234A57] font-semibold tracking-tight self-start'>
            <span className='text-xs px-2 py-0.5 bg-[#234A57]/10 rounded-full'>
              {numberLabel}
            </span>
            <span className='text-sm uppercase'>Etapa</span>
          </div>
          <div className='flex w-full items-center justify-center'>
            <Image
              src={image}
              alt='Mentoring Icon'
              width={90}
              height={90}
              className='w-[90px] h-[90px]'
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(5%) sepia(8%) saturate(1089%) hue-rotate(155deg) brightness(97%) contrast(93%)',
              }}
            />
          </div>
          <h3 className='text-lg md:text-xl font-semibold text-[#0B0F12] leading-tight text-center'>
            {text}
          </h3>
        </div>
      }
      back={
        <div className='flex h-full w-full flex-col items-start justify-center gap-2 text-left rounded-2xl p-5 md:p-6'>
          <p className='text-sm md:text-base leading-relaxed text-[#0B0F12]/80 whitespace-pre-line'>
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
  const [isAtEnd, setIsAtEnd] = useState(false);

  const mentoringItems = [
    {
      image: '/images/MetodoIcon1.svg',
      text: 'Capacitação teórico-prática em Terapia cognitivo-comportamental e Terapia do Esquema',
      backContent: (
        <>
          Aulas <strong>teórico-práticas</strong> com tudo que você precisa
          saber sobre a aplicação da TCC e Terapia do Esquema na prática do
          consultório.
          <br />
          <br />
          Conceitualização de casos; Estrutura de sessão; Construção de
          raciocínio clínico; Técnicas e muito mais...
        </>
      ),
    },
    {
      image: '/images/MetodoIcon2.svg',
      text: 'Aprendizado do processo administrativo e gestão do consultório',
      backContent: (
        <>
          Aulas sobre <strong>processos administrativos</strong> de um
          consultório de sucesso.
          <br />
          <br />
          Contato inicial, agendamento e desmarcações, confecção de prontuário,
          cobrança e gerenciamento financeiro.
        </>
      ),
    },
    {
      image: '/images/MetodoIcon4.svg',
      text: 'Acompanhamento e suporte com profissional experiente',
      backContent: (
        <>
          <strong>Supervisão</strong> dos seus atendimentos e troca clínica com
          outros colegas, permitindo contato com diferentes casos e demandas,
          sempre com a segurança e a orientação de uma profissional com mais de{' '}
          <strong>10 anos </strong>de experiência clínica.
        </>
      ),
    },
    {
      image: '/images/MetodoIcon3.svg',
      text: 'Oportunidade de suporte contínuo, acompanhamento próximo e formação de networking',
      backContent: (
        <>
          Suporte constante por meio de grupo exclusivo no WhatsApp, com relação
          próxima com a mentora e acesso à equipe administrativa. Oportunidade
          de <strong>esclarecer suas dúvidas</strong> entre os encontros,
          realizar <strong>trocas de materiais</strong> complementares e
          fortalecer o <strong>networking</strong> com outros mentorandos.
        </>
      ),
    },
    {
      image: '/images/MetodoIcon5.svg',
      text: 'Ingresso no mercado clínico com segurança',
      backContent: (
        <>
          <strong>Indicação de pacientes</strong> para iniciar sua base de
          clientes e realizar experiências prática no atendimento clínico.
          <br />
          <br />
          Destacando-se terá a oportunidade de ser <strong>
            selecionado
          </strong>{' '}
          para se tornar membro da nossa equipe.
        </>
      ),
    },
  ];

  // Função para navegar pelos cards
  const navigateCarousel = (direction: 'prev' | 'next') => {
    const lastIndex = mentoringItems.length - 1;

    if (isAtEnd) {
      if (direction === 'next') {
        if (activeIndex === lastIndex) {
          const section = sectionRef.current;
          if (!section) return;

          const nextSection = section.nextElementSibling as HTMLElement;
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({
              top: section.offsetTop + section.offsetHeight,
              behavior: 'smooth',
            });
          }
          return;
        }

        setActiveIndex((prev) => Math.min(prev + 1, lastIndex));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      return;
    }

    const newIndex =
      direction === 'next'
        ? Math.min(activeIndex + 1, lastIndex)
        : Math.max(activeIndex - 1, 0);

    const section = sectionRef.current;
    if (!section) return;

    const viewportHeight = window.innerHeight;
    const startOffset = viewportHeight * 0.35;
    const endOffset = viewportHeight * 0.2;

    const startScroll = section.offsetTop - startOffset;
    const endScroll =
      section.offsetTop + section.offsetHeight - viewportHeight + endOffset;
    const totalScroll = endScroll - startScroll;

    const targetProgress = newIndex / lastIndex;
    const targetScrollY = startScroll + targetProgress * totalScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

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
      const cardWidth = firstChild.getBoundingClientRect().width;
      const itemWidth = cardWidth + gap;

      const styles = getComputedStyle(track);
      const padLeft = parseFloat(styles.paddingLeft || '0');

      // Posição do último card quando translate=0:
      // padLeft + (numItems-1)*itemWidth + itemWidth/2 - gap/2
      const lastCardCenterInitial =
        padLeft +
        (numItems - 1) * itemWidth +
        firstChild.getBoundingClientRect().width / 2;

      // Mira o último card com ~100px da borda direita
      const desiredRightMargin = 100;
      const desiredLastCenter =
        window.innerWidth - desiredRightMargin - cardWidth / 2;
      const targetTranslate = desiredLastCenter - lastCardCenterInitial;

      const translate = progress * targetTranslate;
      track.style.transform = `translateX(${translate}px)`;

      // Calcula o índice do card baseado no progresso linear (0 = primeiro, 1 = último)
      const lastIndex = mentoringItems.length - 1;
      const current = Math.round(progress * lastIndex);
      const atEnd = progress >= 0.98; // considerar fim do scroll com pequena folga

      setIsAtEnd(atEnd);
      if (!atEnd) {
        setActiveIndex(Math.max(0, Math.min(current, lastIndex)));
      }
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
      {/* Versão MOBILE - Cards empilhados verticalmente */}
      <div
        className='md:hidden section-mentoring relative py-16 px-6'
        style={{
          backgroundImage: "url('/images/BackgroundTerracota.png')",
        }}
      >
        <div className='absolute inset-0 bg-[#C67A5B]/85' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/16 via-white/10 to-white/6' />

        <div className='relative z-10'>
          {/* Título */}
          <div className='w-full flex justify-center items-center flex-col gap-4 text-center mb-8'>
            <h1 className="text-4xl font-['Kurale',serif] font-semibold text-[#0B0F12]">
              Entenda nosso método
            </h1>
            <span className='h-[3px] w-20 bg-[#234A57] rounded-full' />
          </div>

          {/* Descrição */}
          <p className='max-w-3xl mx-auto text-[#0B0F12]/80 text-base leading-relaxed text-center mb-10'>
            Um caminho estruturado para você evoluir na prática clínica com
            segurança, suporte e método.
          </p>

          {/* Cards empilhados */}
          <div className='flex flex-col gap-8 items-center'>
            {mentoringItems.map((item, index) => (
              <div key={index} className='w-full max-w-[320px] aspect-[4/5]'>
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
      </div>

      {/* Versão DESKTOP - Carrossel horizontal com scroll */}
      <div
        ref={sectionRef}
        className='hidden md:block section-mentoring relative'
        style={{
          backgroundImage: "url('/images/BackgroundTerracota.png')",
          height: `${mentoringItems.length * 120}vh`,
        }}
      >
        <div className='absolute inset-0 bg-[#C67A5B]/85' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/16 via-white/10 to-white/6' />

        <div className='sticky top-0 h-screen w-full overflow-hidden'>
          {/* Título no topo */}
          <div className='relative z-20 max-w-6xl mx-auto px-10 pt-16 w-full'>
            <div className='w-full flex justify-center items-center flex-col gap-4 text-center'>
              <h1 className="text-5xl font-['Kurale',serif] font-semibold text-[#0B0F12]">
                Entenda nosso método
              </h1>
              <span className='h-[3px] w-20 bg-[#234A57] rounded-full' />
            </div>
          </div>

          {/* Texto descrição centralizado entre título e cards */}
          <div className='relative z-20 flex justify-center items-center px-10 mt-12'>
            <p className='max-w-3xl text-[#0B0F12]/80 text-lg leading-relaxed text-center'>
              Um caminho estruturado para você evoluir na prática clínica com
              segurança, suporte e método.
            </p>
          </div>

          {/* Carrossel em full width abaixo do título */}
          <div className='absolute inset-x-0 top-[35%] z-10'>
            <div className='overflow-visible pb-32 relative'>
              {/* Névoa/fade lateral esquerda */}
              <div
                className='absolute left-0 top-0 bottom-0 w-[20vw] z-20 pointer-events-none'
                style={{
                  background:
                    'linear-gradient(to right, rgba(198, 122, 91, 0.95) 0%, rgba(198, 122, 91, 0.7) 30%, rgba(198, 122, 91, 0) 100%)',
                }}
              />
              {/* Névoa/fade lateral direita */}
              <div
                className='absolute right-0 top-0 bottom-0 w-[15vw] z-20 pointer-events-none'
                style={{
                  background:
                    'linear-gradient(to left, rgba(198, 122, 91, 0.95) 0%, rgba(198, 122, 91, 0.7) 30%, rgba(198, 122, 91, 0) 100%)',
                }}
              />

              <div
                ref={carouselRef}
                className='flex gap-10 pb-8'
                style={{
                  transition: 'transform 0.12s ease-out',
                  paddingLeft: '24vw',
                  paddingRight: '8vw',
                }}
              >
                {mentoringItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex min-w-[360px] w-[360px] aspect-[4/5]'
                  >
                    <div
                      className={`w-full h-full transition-transform duration-400 ease-out ${
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

          {/* Botões de navegação */}
          <button
            onClick={() => navigateCarousel('prev')}
            className={`absolute left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full transition-all duration-300 ${
              activeIndex === 0
                ? 'opacity-20 cursor-not-allowed'
                : 'opacity-40 hover:opacity-70 hover:bg-[#0B0F12]/10'
            }`}
            disabled={activeIndex === 0}
            aria-label='Card anterior'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-10 h-10 text-[#0B0F12]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>

          <button
            onClick={() => navigateCarousel('next')}
            className={`absolute right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full transition-all duration-300 ${
              activeIndex === mentoringItems.length - 1
                ? 'opacity-40 hover:opacity-70 hover:bg-[#0B0F12]/10'
                : 'opacity-40 hover:opacity-70 hover:bg-[#0B0F12]/10'
            }`}
            aria-label={
              activeIndex === mentoringItems.length - 1
                ? 'Próxima seção'
                : 'Próximo card'
            }
          >
            {activeIndex === mentoringItems.length - 1 ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-10 h-10 text-[#0B0F12]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-10 h-10 text-[#0B0F12]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
