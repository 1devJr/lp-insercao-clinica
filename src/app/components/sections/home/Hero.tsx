'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fcf8f0]'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <h1 className="font-['Kurale'] text-5xl lg:text-7xl text-[#234A57] leading-tight">
              Saúde mental com afeto e excelência
            </h1>
            <p className='text-lg text-[#3c3b39] leading-relaxed max-w-xl'>
              Acolhimento humanizado e tratamentos baseados em evidências. Sua
              jornada de transformação começa aqui.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/agendar'
                className='bg-[#C67A5B] text-white px-8 py-4 rounded-full text-center font-medium hover:bg-[#b06a4d] transition-colors'
              >
                Agendar Consulta
              </Link>
              <Link
                href='/sobre'
                className='border-2 border-[#234A57] text-[#234A57] px-8 py-4 rounded-full text-center font-medium hover:bg-[#234A57] hover:text-white transition-colors'
              >
                Conheça a Clínica
              </Link>
            </div>
          </div>
          <div className='relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-200'>
            {/* Placeholder for Hero Image */}
            <div className='absolute inset-0 flex items-center justify-center text-gray-400 p-8 text-center'>
              [Imagem Hero: Foto acolhedora da clínica ou profissional]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
