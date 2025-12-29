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
        posicao === 'direita' ? 'flex-row-reverse text-right' : ''
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
    titulo: 'Potencialidade e dificuldades na relação terapêutica',
    descricao:
      'Explore os fundamentos da relação terapêutica, identificando potencialidades e desafios para construir vínculos sólidos com seus pacientes.',
    isDark: true,
  },
  {
    numero: 2,
    titulo: 'Administração do consultório',
    descricao:
      'Aprenda a gerenciar seu consultório de forma eficiente: agendamentos, prontuários, contratos e organização financeira.',
    isDark: true,
  },
  {
    numero: 3,
    titulo: 'Início da prática clínica',
    descricao:
      'Dê os primeiros passos na sua prática clínica com confiança, aprendendo técnicas e abordagens essenciais.',
    destaque:
      'Após este encontro você estará apto a iniciar seus primeiros atendimentos supervisionados!',
    isDark: true,
  },
  {
    numero: 4,
    titulo: 'Estrutura de primeira sessão e avaliação',
    descricao:
      'Compreenda como estruturar sua primeira sessão de forma eficaz, incluindo técnicas de avaliação inicial e estabelecimento de rapport com o paciente.',
    isDark: true,
  },
  {
    numero: 5,
    titulo: 'Sessões posteriores e Intermediárias',
    descricao:
      'Aprenda a conduzir sessões de acompanhamento, mantendo o engajamento do paciente e ajustando o plano terapêutico conforme necessário.',
    isDark: true,
  },
  {
    numero: 6,
    titulo: 'Conceitualização de casos I',
    descricao:
      'Desenvolva habilidades para conceitualizar casos clínicos, identificando padrões cognitivos e comportamentais relevantes para o tratamento.',
    isDark: true,
  },
  {
    numero: 7,
    titulo: 'Conceitualização de casos II',
    descricao:
      'Aprofunde sua capacidade de análise de casos complexos, integrando diferentes abordagens terapêuticas para resultados mais efetivos.',
    destaque:
      'Neste ponto você já está apto a realizar atendimentos de forma independente com supervisão periódica!',
    isDark: true,
  },
  {
    numero: 8,
    titulo: 'Literatura Base',
    descricao:
      'Conheça as principais referências bibliográficas e estudos científicos que fundamentam a prática clínica em TCC e abordagens contextuais.',
    isDark: true,
  },
  {
    numero: 'Bônus',
    titulo: 'Supervisão com um profissional experiente',
    descricao:
      'Sessão especial de supervisão clínica com profissional experiente para discutir casos reais e receber orientações personalizadas.',
    destaque:
      'Incluso no programa! Supervisão individual para potencializar seu desenvolvimento profissional.',
    isBonus: true,
    isDark: false,
  },
];

export default function SectionCronograma() {
  // Estado para controlar a visibilidade de cada item
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(encontros.length).fill(false)
  );

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
          Abaixo você verá o conteúdo programático que será abordado em cada
          encontro, detalhando tudo o que você poderá aprender e experienciar ao
          longo do processo. Cada tema foi cuidadosamente planejado para
          proporcionar uma jornada de conhecimento e prática, garantindo que
          você desenvolva as habilidades essenciais para sua atuação. Explore os
          tópicos e prepare-se para uma experiência enriquecedora!
        </p>
      </div>

      {/* Timeline */}
      <div className='max-w-5xl mx-auto relative'>
        <div className='flex flex-col gap-12'>
          {encontros.map((encontro, index) => {
            const posicao = index % 2 === 0 ? 'esquerda' : 'direita';
            const isItemVisible = visibleItems[index];

            // Cor da linha de conexão muda baseado na visibilidade
            const lineColor = isItemVisible ? 'bg-[#2a2928]' : 'bg-[#fcf8f0]';

            // Cor da bolinha muda baseado na visibilidade
            const dotBgColor = isItemVisible ? 'bg-[#2a2928]' : 'bg-[#fcf8f0]';
            const dotBorderColor = isItemVisible
              ? 'border-[#fcf8f0]'
              : 'border-[#3c3b39]';

            // Cor do segmento vertical da timeline (entre este item e o próximo)
            const verticalLineColor = isItemVisible
              ? 'bg-[#2a2928]'
              : 'bg-[#fcf8f0]/30';

            return (
              <div key={index} className='relative flex items-center'>
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
                    <div className='w-full md:w-[calc(50%-40px)] md:pr-4'>
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
                    <div className='w-full md:w-[calc(50%-40px)] md:ml-auto md:pl-4'>
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
    </section>
  );
}
