'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import SectionFooter from '../components/sections/section_footer';

export default function TermosDeUsoPage() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <main className='bg-[#FCF8F0] min-h-screen flex flex-col'>
      <div className='container mx-auto px-4 py-12 flex-grow'>
        <button
          onClick={handleBack}
          className='inline-flex items-center gap-2 text-[#234A57] hover:text-[#C67A5B] transition-colors mb-8 font-medium'
        >
          <ArrowLeft className='w-4 h-4' />
          Voltar
        </button>

        <article className='max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm'>
          <h1 className="font-['Kurale',serif] text-4xl md:text-5xl text-[#234A57] mb-8 tracking-tight">
            Termos de Uso
          </h1>

          <div className='prose prose-stone max-w-none text-[#3c3b39]'>
            <p className='lead'>
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              1. Aceitação dos Termos
            </h3>
            <p>
              Ao acessar e utilizar o site da <strong>Clínica Menote</strong>,
              você concorda em cumprir e estar vinculado aos seguintes Termos de
              Uso. Se você não concordar com qualquer parte destes termos, não
              deverá utilizar nosso site ou serviços.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              2. Uso do Site
            </h3>
            <p>
              Este site destina-se a fornecer informações sobre nossos programas
              de mentoria e serviços de psicologia. Você concorda em usar o site
              apenas para fins legais e de uma maneira que não infrinja os
              direitos de terceiros ou restrinja o uso e aproveitamento do site
              por qualquer outra pessoa.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              3. Propriedade Intelectual
            </h3>
            <p>
              Todo o conteúdo presente neste site, incluindo textos, gráficos,
              logotipos, ícones, imagens e software, é propriedade da Clínica
              Menote ou de seus fornecedores de conteúdo e é protegido pelas
              leis de direitos autorais do Brasil e internacionais. A
              reprodução, distribuição ou transmissão de qualquer material deste
              site sem autorização prévia por escrito é estritamente proibida.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              4. Cadastro e Informações
            </h3>
            <p>
              Ao preencher formulários em nosso site, você garante que as
              informações fornecidas são verdadeiras, precisas, atuais e
              completas. A Clínica Menote não se responsabiliza por dados
              incorretos ou falsos fornecidos pelos usuários.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              5. Limitação de Responsabilidade
            </h3>
            <p>
              A Clínica Menote envida os melhores esforços para manter as
              informações do site precisas e atualizadas. No entanto, não
              garantimos que o conteúdo esteja livre de erros ou omissões. O uso
              das informações contidas neste site é de sua inteira
              responsabilidade.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              6. Alterações nos Termos
            </h3>
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a
              qualquer momento. As alterações entrarão em vigor imediatamente
              após a publicação no site. Recomendamos que você revise esta
              página periodicamente.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              7. Contato
            </h3>
            <p>
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato
              conosco através dos canais oficiais disponibilizados no site.
            </p>
          </div>
        </article>
      </div>
      <SectionFooter />
    </main>
  );
}
