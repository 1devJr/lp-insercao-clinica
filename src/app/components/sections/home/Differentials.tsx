'use client';

import { CheckCircle2 } from 'lucide-react';

const differentials = [
  'Atendimento Humanizado',
  'Profissionais Especializados',
  'Ambiente Acolhedor',
  'Abordagem Baseada em Evidências',
  'Localização Privilegiada',
  'Atendimento Online e Presencial',
];

export default function Differentials() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='relative h-[400px] rounded-2xl overflow-hidden bg-gray-200 order-2 lg:order-1'>
            <div className='absolute inset-0 flex items-center justify-center text-gray-400 p-8 text-center'>
              [Imagem: Foto do consultório ou ambiente]
            </div>
          </div>
          <div className='order-1 lg:order-2'>
            <h2 className="font-['Kurale'] text-4xl text-clinic-primary mb-6">
              Por que escolher a Clínica Menote?
            </h2>
            <p className='text-[#3c3b39] mb-8 leading-relaxed'>
              Nosso compromisso é oferecer um espaço seguro e acolhedor, onde
              você possa se sentir à vontade para compartilhar suas questões e
              buscar o desenvolvimento pessoal.
            </p>
            <ul className='grid sm:grid-cols-2 gap-4'>
              {differentials.map((item) => (
                <li
                  key={item}
                  className='flex items-center gap-3 text-[#3c3b39]'
                >
                  <CheckCircle2 className='w-5 h-5 text-clinic-gold' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
