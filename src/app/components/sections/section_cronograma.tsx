'use client';

import React, { useEffect, useRef, useState } from 'react';

// Ícone de calendário SVG inline
const CalendarIcon = ({ className = '' }: { className?: string }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <rect
      x='3'
      y='4'
      width='18'
      height='18'
      rx='2'
      stroke='currentColor'
      strokeWidth='2'
    />
    <line
      x1='3'
      y1='10'
      x2='21'
      y2='10'
      stroke='currentColor'
      strokeWidth='2'
    />
    <line x1='8' y1='2' x2='8' y2='6' stroke='currentColor' strokeWidth='2' />
    <line x1='16' y1='2' x2='16' y2='6' stroke='currentColor' strokeWidth='2' />
  </svg>
);

// Ícone de calendário com check SVG inline
const CalendarCheckIcon = ({ className = '' }: { className?: string }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <rect
      x='3'
      y='4'
      width='18'
      height='18'
      rx='2'
      stroke='currentColor'
      strokeWidth='2'
    />
    <line
      x1='3'
      y1='10'
      x2='21'
      y2='10'
      stroke='currentColor'
      strokeWidth='2'
    />
    <line x1='8' y1='2' x2='8' y2='6' stroke='currentColor' strokeWidth='2' />
    <line x1='16' y1='2' x2='16' y2='6' stroke='currentColor' strokeWidth='2' />
    {/* Check mark */}
    <path
      d='M8 15l2.5 2.5L16 12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

interface TimelineItemProps {
  numero: number | string;
  titulo: string;
  descricao?: string;
  destaque?: string;
  posicao: 'esquerda' | 'direita';
  isBonus?: boolean;
  isDark?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
}

const TimelineItem = ({
  numero,
  titulo,
  descricao,
  destaque,
  posicao,
  isBonus = false,
  isDark = false,
  onVisibilityChange,
}: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;

          // Ativa quando entra na viewport (vindo de baixo ou já visível)
          // Ativa mais cedo para que o usuário veja claramente a animação
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true);
            onVisibilityChange?.(true);
          }
          // Desativa apenas quando o item sai pela parte INFERIOR da tela
          // (quando o topo do item está abaixo da viewport)
          else if (!entry.isIntersecting && rect.top > viewportHeight * 0.5) {
            setIsVisible(false);
            onVisibilityChange?.(false);
          }
          // Se sair pelo topo, mantém ativo
        });
      },
      {
        threshold: [0, 0.3, 0.5, 1],
        rootMargin: '0px 0px -30% 0px',
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [onVisibilityChange]);

  // Cores quando ativo (scroll)
  const activeBgColor = isDark ? 'bg-[#2a2928]' : 'bg-[#e8e4dc]';
  const activeTextColor = isDark ? 'text-[#fcf8f0]' : 'text-[#3c3b39]';

  // Cores quando inativo (branco/claro)
  const inactiveBgColor = 'bg-[#fcf8f0]';
  const inactiveTextColor = 'text-[#3c3b39]';

  // Bônus sempre tem cor diferente
  const bonusBg = isBonus
    ? 'bg-[#C67A5B]'
    : isVisible
    ? activeBgColor
    : inactiveBgColor;
  const bonusText = isBonus
    ? 'text-[#3c3b39]'
    : isVisible
    ? activeTextColor
    : inactiveTextColor;

  // Escolhe o ícone baseado no estado
  const IconComponent = isVisible ? CalendarCheckIcon : CalendarIcon;

  return (
    <div
      ref={itemRef}
      className={`flex items-start gap-4 ${
        posicao === 'direita' ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`${bonusBg} ${bonusText} rounded-lg p-5 max-w-md shadow-lg transition-all duration-700 ease-in-out hover:scale-105`}
        style={{
          minHeight: descricao ? (isVisible ? 'auto' : '80px') : '80px',
        }}
      >
        <div className='flex items-center gap-2 mb-2'>
          <IconComponent
            className={`transition-colors duration-700 ${bonusText}`}
          />
          <h3 className='font-bold text-base transition-colors duration-700'>
            {isBonus ? 'Bônus' : `Encontro ${numero}`}: {titulo}
          </h3>
        </div>
        {descricao && (
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isVisible ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p
              className={`text-sm leading-relaxed transition-colors duration-700 ${
                isVisible
                  ? isDark
                    ? 'text-[#fcf8f0]/80'
                    : 'text-[#3c3b39]/70'
                  : 'text-[#3c3b39]/70'
              }`}
            >
              {descricao}
            </p>
            {/* Destaque/Hint */}
            {destaque && (
              <div className='mt-3 pt-3 border-t border-current/20'>
                <p
                  className={`text-xs italic leading-relaxed transition-colors duration-700 ${
                    isVisible
                      ? isBonus
                        ? 'text-[#2a2928]'
                        : isDark
                        ? 'text-[#C67A5B]'
                        : 'text-[#C67A5B]'
                      : 'text-[#3c3b39]/50'
                  }`}
                >
                  ✨ {destaque}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface EncontroData {
  numero: number | string;
  titulo: string;
  descricao?: string;
  destaque?: string;
  isDark?: boolean;
  isBonus?: boolean;
}

const encontros: EncontroData[] = [
  {
    numero: 1,
    titulo:
      'Administração Do Consultório E Relação Terapêutica No Contato Inicial',
    descricao:
      'Passo a passo sobre toda a burocracia da clínica: contato inicial, agendamento, cobranças, notas desmarcações e demais combinações. Entender o que as pesquisas falam sobre como criar uma relação terapêutica sólida. Esse é o principal ponto de partida de qualquer trabalho terapêutico durador e efetivo.',
    isDark: true,
  },
  {
    numero: 2,
    titulo: 'Primeira Sessão',
    descricao:
      'Tudo que preciso saber para fazer uma sessão de avaliação, anamnese e uma sessão inicial (começar os trabalhos efetivamente) em psicoterapia.',
    destaque:
      'Aqui você já terá a indicação de um paciente para iniciar sua prática.',
    isDark: true,
  },
  {
    numero: 3,
    titulo: 'Sessões Intermediárias',
    descricao:
      'Como é a estrutura das sessões posteriores. O que preciso saber para dar seguimento ao tratamento? Como desenvolver um raciocínio clínico que garante fundamentação cientifica ao trabalho e efetividade no alcance das metas terapêuticas.',
    isDark: true,
  },
  {
    numero: 4,
    titulo: 'Conceitualização De Caso 1',
    descricao:
      'Como conceitualizar em TCC e entender como identificar crenças (central e intermediárias), Pensamentos Automáticos, regras e pressupostos, além de aprender a principal técnica de trabalho da TCC: o RPD.',
    isDark: true,
  },
  {
    numero: 5,
    titulo: 'Conceitualização De Casos 2',
    descricao:
      'Como conceitualizar em Terapia do Esquema e contextuais. Entender a lógica da conceitualização de caso independentemente da linha teórica escolhida.',
    destaque:
      'Aqui você já será capaz de montar a estrutura de suas sessões e ter compreensão do seu paciente com embasamento científico.',
    isDark: true,
  },
  {
    numero: 6,
    titulo: 'Treinando O Raciocínio Clínico E Exercício Prático',
    descricao:
      'Como aprender a pensar como psicólogo clínico independente do caso ou abordagem utilizada.',
    isDark: true,
  },
  {
    numero: 7,
    titulo: 'Principais Técnicas Em TCC E TE',
    descricao:
      'Aprenda as principais técnicas e como aprender outras técnicas uteis para o desenvolvimento de suas habilidades terapêuticas.',
    isDark: true,
  },
  {
    numero: 8,
    titulo: 'Literatura Base Para Diferentes Demandas',
    descricao:
      'Onde encontrar o que preciso para saber tratar qualquer demanda? Entenda como pesquisar e conheça bases seguras para sua educação continuada e constante evolução profissional com o que há de mais atualizado.',
    destaque:
      'Aqui você será capaz de tratar as diferentes demandas que aparecem no consultório e saber como manter-se em contante evolução profissional.',
    isDark: true,
  },
  {
    numero: 9,
    titulo: 'Supervisão',
    descricao:
      'Encontro exclusivo para supervisão de casos e esclarecimento de dúvidas. Obs.: Ao longo de toda a mentoria, você conta com supervisão e acompanhamento contínuos para evoluir como terapeuta com segurança, além de aprender por meio da troca clínica e da supervisão dos casos de outros profissionais.',
    isDark: true,
  },
  {
    numero: 'Bônus',
    titulo: 'Workbook Exclusivo De Terapia Do Esquema',
    descricao:
      'Workbook exclusivo e prático de Terapia do Esquema para psicólogos iniciantes, com exercícios que ajudam você a se experimentar com mais segurança e fortalecer sua atuação como terapeuta do esquema.',
    isBonus: true,
    isDark: false,
  },
];

export default function SectionCronograma() {
  // Estado para controlar a visibilidade de cada item
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(encontros.length).fill(false)
  );

  // Ref para o container da timeline
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Refs para cada item da timeline (para calcular posição da linha)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Estado para a altura da linha de progresso mobile
  const [mobileProgressHeight, setMobileProgressHeight] = useState(0);

  // Estado para a altura total da linha de fundo (até a última bolinha)
  const [mobileBackgroundLineHeight, setMobileBackgroundLineHeight] =
    useState(0);

  // Calcula a altura da linha de progresso baseado nos itens visíveis
  useEffect(() => {
    const lastVisibleIndex = visibleItems.lastIndexOf(true);
    if (lastVisibleIndex === -1 || !timelineContainerRef.current) {
      setMobileProgressHeight(0);
      return;
    }

    const lastVisibleItem = itemRefs.current[lastVisibleIndex];

    if (lastVisibleItem) {
      // Usa offsetTop para posição relativa ao container pai
      // Soma top-6 (24px) + metade da bolinha (8px) para alinhar no centro
      const height = lastVisibleItem.offsetTop + 32; // 24px + 8px = centro da bolinha
      setMobileProgressHeight(Math.max(0, height));
    }
  }, [visibleItems]);

  // Calcula a altura total da linha de fundo (até a última bolinha)
  // Recalcula sempre que a visibilidade mudar (pois os cards expandem/contraem)
  useEffect(() => {
    const updateBackgroundHeight = () => {
      const lastItem = itemRefs.current[encontros.length - 1];
      if (lastItem) {
        // Alinha a linha de fundo ao centro da última bolinha
        const height = lastItem.offsetTop + 32; // 24px + 8px
        setMobileBackgroundLineHeight(height);
      }
    };

    // Pequeno delay para garantir que os refs e layout estejam atualizados
    const timer = setTimeout(updateBackgroundHeight, 150);
    return () => clearTimeout(timer);
  }, [visibleItems]); // Recalcula quando a visibilidade mudar

  const handleVisibilityChange = (index: number, isVisible: boolean) => {
    setVisibleItems((prev) => {
      const newState = [...prev];
      newState[index] = isVisible;
      return newState;
    });
  };

  return (
    <section className='bg-[#3c3b39] relative py-20 px-4 overflow-hidden'>
      {/* Header */}
      <div className='max-w-4xl mx-auto text-center mb-16'>
        <h2 className="font-['Kurale',serif] text-6xl md:text-7xl text-[#fcf8f0] mb-8 tracking-tight">
          Cronograma
        </h2>
        <p className='text-[#fcf8f0] text-base leading-relaxed max-w-3xl mx-auto'>
          Confira abaixo o conteúdo programático de cada encontro. Cada tema foi
          cuidadosamente planejado para apoiar o desenvolvimento das habilidades
          essenciais para prática de um psicólogo de sucesso.
        </p>
      </div>

      {/* Timeline */}
      {(() => {
        const isLastVisible = visibleItems[encontros.length - 1];
        const backgroundHeight = isLastVisible
          ? mobileProgressHeight
          : mobileBackgroundLineHeight > 0
          ? mobileBackgroundLineHeight
          : undefined;
        const progressHeight = backgroundHeight
          ? Math.min(mobileProgressHeight, backgroundHeight)
          : mobileProgressHeight;

        return (
          <div
            className='max-w-5xl mx-auto relative'
            ref={timelineContainerRef}
          >
            {/* Linha de fundo mobile (cinza claro) - termina na última bolinha ou junto ao progresso final */}
            <div
              className='md:hidden absolute left-6 top-0 w-0.5 bg-[#fcf8f0]/30 -translate-x-1/2 translate-x-[2px] translate-y-[1px]'
              style={{
                height: backgroundHeight ? `${backgroundHeight}px` : '100%',
              }}
            />
            <div
              className='md:hidden absolute left-6 w-0.5 bg-[#C67A5B] transition-all duration-500 ease-out -translate-x-1/2 translate-x-[2px] translate-y-[1px]'
              style={{
                top: 0,
                height: `${progressHeight}px`,
              }}
            />

            <div className='flex flex-col gap-8 md:gap-12 md:pl-0'>
              {encontros.map((encontro, index) => {
                const posicao = index % 2 === 0 ? 'esquerda' : 'direita';
                const isItemVisible = visibleItems[index];

                // Cor da linha de conexão muda baseado na visibilidade
                const lineColor = isItemVisible
                  ? 'bg-[#2a2928]'
                  : 'bg-[#fcf8f0]';

                // Cor da bolinha muda baseado na visibilidade
                const dotBgColor = isItemVisible
                  ? 'bg-[#C67A5B]'
                  : 'bg-[#fcf8f0]';
                const dotBorderColor = isItemVisible
                  ? 'border-[#fcf8f0]'
                  : 'border-[#3c3b39]';

                // Cor do segmento vertical da timeline (entre este item e o próximo)
                const verticalLineColor = isItemVisible
                  ? 'bg-[#2a2928]'
                  : 'bg-[#fcf8f0]/30';

                return (
                  <div
                    key={index}
                    className='relative flex items-start md:items-center'
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                  >
                    {/* Mobile: Bolinha na timeline */}
                    <div
                      className={`md:hidden absolute left-6 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${dotBgColor} ${dotBorderColor}`}
                    />

                    {/* Mobile: Linha horizontal conectando bolinha ao card */}
                    <div
                      className={`md:hidden absolute left-8 top-6 h-0.5 transition-all duration-300 ease-out ${
                        isItemVisible ? 'bg-[#C67A5B]' : 'bg-[#fcf8f0]/50'
                      }`}
                      style={{
                        top: '1.85rem',
                        width: '16px',
                        transform: 'translateY(-50%)',
                      }}
                    />

                    {/* Segmento vertical da linha central - conecta ao item anterior */}
                    {index > 0 && (
                      <div
                        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 transition-colors duration-700 ${
                          visibleItems[index - 1]
                            ? 'bg-[#2a2928]'
                            : 'bg-[#fcf8f0]/30'
                        }`}
                        style={{
                          top: '-48px',
                          height: '48px',
                        }}
                      />
                    )}

                    {/* Segmento vertical da linha central - conecta ao próximo item */}
                    {index < encontros.length - 1 && (
                      <div
                        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 transition-colors duration-700 ${verticalLineColor}`}
                        style={{
                          top: '50%',
                          height: 'calc(100% + 48px)',
                        }}
                      />
                    )}

                    {/* Card lado esquerdo */}
                    {posicao === 'esquerda' && (
                      <>
                        <div className='w-full pl-12 md:pl-0 md:w-[calc(50%-40px)] md:pr-4'>
                          <TimelineItem
                            numero={encontro.numero}
                            titulo={encontro.titulo}
                            descricao={encontro.descricao}
                            destaque={encontro.destaque}
                            posicao={posicao}
                            isDark={encontro.isDark}
                            isBonus={encontro.isBonus}
                            onVisibilityChange={(isVisible) =>
                              handleVisibilityChange(index, isVisible)
                            }
                          />
                        </div>
                        {/* Linha de conexão horizontal - esquerda para centro */}
                        <div
                          className={`hidden md:block absolute right-1/2 top-1/2 -translate-y-1/2 w-10 h-0.5 transition-colors duration-700 ${lineColor}`}
                        />
                      </>
                    )}

                    {/* Ponto na timeline (desktop) */}
                    <div
                      className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 z-10 transition-all duration-700 ${dotBgColor} ${dotBorderColor}`}
                    />

                    {/* Card lado direito */}
                    {posicao === 'direita' && (
                      <>
                        {/* Linha de conexão horizontal - centro para direita */}
                        <div
                          className={`hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-10 h-0.5 transition-colors duration-700 ${lineColor}`}
                        />
                        <div className='w-full pl-12 md:pl-4 md:w-[calc(50%-40px)] md:ml-auto'>
                          <TimelineItem
                            numero={encontro.numero}
                            titulo={encontro.titulo}
                            descricao={encontro.descricao}
                            destaque={encontro.destaque}
                            posicao={posicao}
                            isDark={encontro.isDark}
                            isBonus={encontro.isBonus}
                            onVisibilityChange={(isVisible) =>
                              handleVisibilityChange(index, isVisible)
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
