'use client';

import {
  BookOpen,
  Brain,
  ChevronLeft,
  ChevronRight,
  HandHeart,
  Heart,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Heart,
    title: 'Psicologia',
    description:
      'Psicoterapia para adolescente e adultos em Terapia Cognitivo Comportamental e Terapia do Esquema, Avaliação Neuropsicológica, psicodiagnóstica e para concursos.',
  },
  {
    icon: HandHeart,
    title: 'Projeto Saúde Mental para Todos',
    description:
      'Atendimentos psicoterápicos e psiquiátricos acessíveis e qualificados em diversos horários e modalidades.',
  },
  {
    icon: BookOpen,
    title: 'Cursos',
    description:
      'Cursos em plataforma de educação sobre temas da saúde mental, para público geral e profissionais, com certificado para horas complementares.',
  },
  {
    icon: Brain,
    title: 'Psiquiatria',
    description:
      'Atendimento psiquiátrico, acompanhamento medicamentoso e psicoterapia para adolescentes e adultos em TCC e Terapia do Esquema.',
  },
  {
    icon: Users,
    title: 'Mentoria Inserção na Clínica Psicológica',
    description:
      'Treinamento de psicólogos iniciantes na clínica, oferecendo método estruturado com capacitação, supervisão, networking e indicação de pacientes para prática real, gerando retorno financeiro desde o primeiro atendimento.',
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = services.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  return (
    <section className='py-20 bg-clinic-beige'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className="font-['Kurale'] text-4xl text-clinic-primary mb-4">
            Nossos Serviços
          </h2>
          <p className='text-[#3c3b39]'>
            Cuidado integral para sua saúde mental
          </p>
        </div>

        <div className='relative mt-10 h-[460px] sm:h-[480px] overflow-hidden'>
          <div className='relative h-full w-full'>
            {services.map((service, index) => {
              const offsetRaw = (index - currentIndex + total) % total;
              const offset =
                offsetRaw > total / 2 ? offsetRaw - total : offsetRaw; // range centered around 0
              const isActive = offset === 0;
              const isSide = Math.abs(offset) === 1;

              const translate = offset * 26; // horizontal spacing between cards
              const scale = isActive ? 0.95 : isSide ? 0.88 : 0.8;
              const opacity = isActive ? 1 : isSide ? 0.6 : 0.35;
              const blur = isActive ? 'blur(0px)' : 'blur(0.5px)';
              const grayscale = isActive ? 'grayscale(0)' : 'grayscale(40%)';
              const zIndex = isActive ? 30 : isSide ? 20 : 10;

              return (
                <div
                  key={service.title}
                  className='absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out'
                  style={{
                    transform: `translateX(${translate}%) scale(${scale})`,
                    opacity,
                    filter: `${blur} ${grayscale}`,
                    zIndex,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className='bg-white p-6 md:p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col w-full max-w-lg'>
                    <service.icon className='w-12 h-12 text-clinic-gold mb-6 shrink-0' />
                    <h3 className="font-['Kurale'] text-2xl text-clinic-primary mb-4 leading-tight min-h-[56px] flex items-start">
                      {service.title}
                    </h3>
                    <p className='text-[#3c3b39] mb-6 flex-1 min-h-[140px] leading-relaxed'>
                      {service.description}
                    </p>
                    <a
                      href={
                        service.title.includes('Mentoria')
                          ? '/mentoria'
                          : '/servicos'
                      }
                      className='text-clinic-primary font-medium hover:underline mt-auto inline-flex items-center gap-1'
                    >
                      Saiba mais →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overlay nav zones (full-height, subtle, click-anywhere) */}
          <button
            type='button'
            onClick={prev}
            aria-label='Serviço anterior'
            className='group absolute inset-y-0 left-[-14vw] sm:left-[-12vw] md:left-[-10vw] lg:left-[-8vw] w-[24vw] sm:w-[22vw] md:w-[20vw] lg:w-[18vw] xl:w-[16vw] z-40 flex items-center pl-3 sm:pl-4 pr-6 bg-gradient-to-r from-black/5 via-transparent to-transparent transition-all duration-300 hover:from-black/15 hover:via-black/8'
          >
            <ChevronLeft className='w-7 h-7 sm:w-8 sm:h-8 text-clinic-primary/70 transition group-hover:text-clinic-primary' />
          </button>
          <button
            type='button'
            onClick={next}
            aria-label='Próximo serviço'
            className='group absolute inset-y-0 right-[-14vw] sm:right-[-12vw] md:right-[-10vw] lg:right-[-8vw] w-[24vw] sm:w-[22vw] md:w-[20vw] lg:w-[18vw] xl:w-[16vw] z-40 flex items-center justify-end pr-3 sm:pr-4 pl-6 bg-gradient-to-l from-black/5 via-transparent to-transparent transition-all duration-300 hover:from-black/15 hover:via-black/8'
          >
            <ChevronRight className='w-7 h-7 sm:w-8 sm:h-8 text-clinic-primary/70 transition group-hover:text-clinic-primary' />
          </button>
        </div>
      </div>
    </section>
  );
}
