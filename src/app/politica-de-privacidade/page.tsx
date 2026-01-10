'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import SectionFooter from '../components/sections/section_footer';

export default function PoliticaDePrivacidadePage() {
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
            Política de Privacidade
          </h1>

          <div className='prose prose-stone max-w-none text-[#3c3b39]'>
            <p className='lead'>
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p>
              A <strong>Clínica Menote</strong> valoriza a sua privacidade e
              está comprometida em proteger os seus dados pessoais. Esta
              Política de Privacidade explica como coletamos, usamos,
              armazenamos e protegemos suas informações, em conformidade com a
              Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              1. Coleta de Dados
            </h3>
            <p>
              Coletamos informações pessoais que você nos fornece
              voluntariamente ao preencher nossos formulários de interesse ou
              contato. Os dados coletados podem incluir:
            </p>
            <ul className='list-disc pl-5 space-y-2 mt-2'>
              <li>Nome completo;</li>
              <li>Endereço de e-mail;</li>
              <li>Número de telefone;</li>
              <li>Informações profissionais (se é estudante ou formado);</li>
              <li>Experiências e interesses profissionais relatados.</li>
            </ul>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              2. Finalidade do Uso dos Dados
            </h3>
            <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
            <ul className='list-disc pl-5 space-y-2 mt-2'>
              <li>
                Entrar em contato para fornecer informações sobre a mentoria e
                serviços solicitados;
              </li>
              <li>
                Avaliar o perfil dos interessados para melhor adequação aos
                nossos programas;
              </li>
              <li>
                Enviar comunicações relevantes sobre psicologia e atualizações
                da clínica (caso tenha consentido);
              </li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              3. Compartilhamento de Dados
            </h3>
            <p>
              A Clínica Menote não vende, aluga ou comercializa seus dados
              pessoais. Seus dados podem ser compartilhados apenas com:
            </p>
            <ul className='list-disc pl-5 space-y-2 mt-2'>
              <li>
                Colaboradores internos estritamente para fins de atendimento;
              </li>
              <li>
                Prestadores de serviços essenciais (como plataformas de
                hospedagem e e-mail), que operam sob nossas instruções e com
                dever de confidencialidade;
              </li>
              <li>
                Autoridades judiciais ou governamentais, quando exigido por lei.
              </li>
            </ul>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              4. Armazenamento e Segurança
            </h3>
            <p>
              Adotamos medidas técnicas e administrativas adequadas para
              proteger seus dados pessoais contra acessos não autorizados,
              perda, alteração ou divulgação indevida. Seus dados são
              armazenados em ambientes seguros e controlados.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              5. Seus Direitos (LGPD)
            </h3>
            <p>Como titular dos dados, você tem o direito de:</p>
            <ul className='list-disc pl-5 space-y-2 mt-2'>
              <li>Confirmar a existência de tratamento de dados;</li>
              <li>Acessar seus dados;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>
                Solicitar a anonimização, bloqueio ou eliminação de dados
                desnecessários;
              </li>
              <li>Revogar seu consentimento a qualquer momento.</li>
            </ul>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              6. Cookies
            </h3>
            <p>
              Podemos utilizar cookies para melhorar sua experiência de
              navegação. Você pode gerenciar as preferências de cookies
              diretamente nas configurações do seu navegador.
            </p>

            <h3 className='text-[#C67A5B] font-bold text-xl mt-8 mb-4'>
              7. Contato
            </h3>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta Política de
              Privacidade, entre em contato conosco através dos canais oficiais
              disponíveis no site.
            </p>
          </div>
        </article>
      </div>
      <SectionFooter />
    </main>
  );
}
