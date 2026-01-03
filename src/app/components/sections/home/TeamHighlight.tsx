'use client';

export default function TeamHighlight() {
  return (
    <section className='py-20 bg-[#fcf8f0]'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className="font-['Kurale'] text-4xl text-[#234A57] mb-4">
            Nossa Equipe
          </h2>
          <p className='text-[#3c3b39]'>
            Conheça os profissionais que cuidarão de você
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='h-64 bg-gray-200 flex items-center justify-center text-gray-400'>
                [Foto Profissional {i}]
              </div>
              <div className='p-6 text-center'>
                <h3 className="font-['Kurale'] text-xl text-[#234A57] mb-1">
                  Nome do Profissional
                </h3>
                <p className='text-[#C67A5B] text-sm font-medium mb-3'>
                  Psicólogo(a) - CRP 00/0000
                </p>
                <p className='text-[#3c3b39] text-sm'>
                  Especialista em Terapia Cognitivo-Comportamental e Saúde
                  Mental.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
