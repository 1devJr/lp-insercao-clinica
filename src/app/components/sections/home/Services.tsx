'use client';

import { Brain, Heart, Users } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Psicologia',
    description:
      'Psicoterapia individual para adolescentes e adultos com abordagem TCC.',
  },
  {
    icon: Brain,
    title: 'Psiquiatria',
    description:
      'Avaliação e acompanhamento médico especializado em saúde mental.',
  },
  {
    icon: Users,
    title: 'Mentoria',
    description:
      'Supervisão e orientação de carreira para psicólogos recém-formados.',
  },
];

export default function Services() {
  return (
    <section className='py-20 bg-[#fcf8f0]'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className="font-['Kurale'] text-4xl text-[#234A57] mb-4">
            Nossos Serviços
          </h2>
          <p className='text-[#3c3b39]'>
            Cuidado integral para sua saúde mental
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {services.map((service) => (
            <div
              key={service.title}
              className='bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow'
            >
              <service.icon className='w-12 h-12 text-[#C67A5B] mb-6' />
              <h3 className="font-['Kurale'] text-2xl text-[#234A57] mb-4">
                {service.title}
              </h3>
              <p className='text-[#3c3b39] mb-6'>{service.description}</p>
              <a
                href='#'
                className='text-[#C67A5B] font-medium hover:underline'
              >
                Saiba mais →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
