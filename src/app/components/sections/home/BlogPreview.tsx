'use client';

import Link from 'next/link';

export default function BlogPreview() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-end mb-12'>
          <div>
            <h2 className="font-['Kurale'] text-4xl text-clinic-primary mb-4">
              Blog
            </h2>
            <p className='text-[#3c3b39]'>
              Artigos e novidades sobre saúde mental
            </p>
          </div>
          <Link
            href='/blog'
            className='text-clinic-primary font-medium hover:underline hidden md:block'
          >
            Ver todos os artigos →
          </Link>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <article key={i} className='group cursor-pointer'>
              <div className='h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden'>
                <div className='w-full h-full bg-gray-300 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-500'>
                  [Imagem Artigo]
                </div>
              </div>
              <div className='flex gap-2 text-sm text-clinic-primary mb-2'>
                <span>Psicologia</span>
                <span>•</span>
                <span>5 min de leitura</span>
              </div>
              <h3 className="font-['Kurale'] text-xl text-clinic-primary mb-2 group-hover:text-clinic-gold transition-colors">
                Título do Artigo sobre Saúde Mental {i}
              </h3>
              <p className='text-[#3c3b39] text-sm line-clamp-2'>
                Um breve resumo sobre o conteúdo do artigo que desperte o
                interesse do leitor para continuar lendo...
              </p>
            </article>
          ))}
        </div>

        <div className='mt-8 text-center md:hidden'>
          <Link
            href='/blog'
            className='text-clinic-primary font-medium hover:underline'
          >
            Ver todos os artigos →
          </Link>
        </div>
      </div>
    </section>
  );
}
