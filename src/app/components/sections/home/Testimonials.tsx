'use client';

import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className='py-20 bg-[#234A57] text-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className="font-['Kurale'] text-4xl mb-4">
            O que dizem nossos pacientes
          </h2>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='bg-white/10 p-8 rounded-2xl backdrop-blur-sm'
            >
              <Quote className='w-8 h-8 text-[#C67A5B] mb-4' />
              <p className='text-lg mb-6 opacity-90'>
                "A clínica oferece um atendimento excepcional. Me senti acolhido
                desde o primeiro momento. Recomendo muito!"
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full bg-white/20' />
                <div>
                  <p className='font-medium'>Paciente {i}</p>
                  <p className='text-sm opacity-70'>Paciente há 6 meses</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
