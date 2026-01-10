'use client';

import Image from 'next/image';

const team = [
  {
    name: 'Nicole Menote',
    role: 'Psicóloga CRP 07/26202',
    bio: 'Especialista em Terapia Cognitivo-Comportamental e Avaliação Neuropsicológica; formada em Terapia do Esquema.',
    photo: '/images/nicole.webp',
  },
  {
    name: 'Daianna Menote',
    role: 'Psiquiatra CRM-RS 38303 (RQE 34960)',
    bio: 'Especialista em Terapia Cognitivo-Comportamental e formada em Terapia do Esquema.',
    photo: '/images/daiana.webp',
  },
];

export default function TeamHighlight() {
  return (
    <section className='py-20 bg-clinic-beige'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className="font-['Kurale'] text-4xl text-clinic-primary mb-4">
            Responsáveis Técnicas
          </h2>
          <p className='text-[#3c3b39]'>
            Conheça as sócias fundadoras que idealizaram este espaço de cuidado
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {team.map((pro) => (
            <div
              key={pro.name}
              className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col max-w-md w-full mx-auto'
            >
              <div className='relative w-full bg-gray-200 aspect-[4/5]'>
                <Image
                  src={pro.photo}
                  alt={pro.name}
                  fill
                  className='object-cover object-top'
                  sizes='(min-width: 768px) 50vw, 100vw'
                  priority
                />
              </div>
              <div className='p-6 text-center flex flex-col gap-3 flex-1'>
                <div>
                  <h3 className="font-['Kurale'] text-xl text-clinic-primary mb-1">
                    {pro.name}
                  </h3>
                  <p className='text-clinic-primary text-sm font-medium'>
                    {pro.role}
                  </p>
                </div>
                <p className='text-[#3c3b39] text-sm leading-relaxed flex-1'>
                  {pro.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
