'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const scrollToForm = () => {
  const formSection = document.getElementById('subscription-form');
  if (formSection) {
    const rect = formSection.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    window.scrollTo({
      top: absoluteTop,
      behavior: 'smooth',
    });
  }
};

const faqItems: FAQItem[] = [
  {
    question: 'Para quem é a Mentoria Inserção na Clínica Psicológica?',
    answer:
      'A Mentoria Inserção na Clínica Psicológica é destinada a psicólogos recém-formados ou em transição de carreira para a área clínica que desejam iniciar ou consolidar sua atuação clínica com mais segurança, clareza e estrutura.',
  },
  {
    question: 'Existe indicação de pacientes para os mentorados?',
    answer:
      'Sim. Um dos diferenciais centrais da mentoria é a possibilidade de indicação de pacientes ao longo do processo. O objetivo é facilitar a inserção real no mercado de trabalho, permitindo que o psicólogo tenha contato prático com atendimentos clínicos desde o início, sempre com suporte e orientação. E quem se destacar pode ser convidado a fazer parte da equipe da Clínica Menote e receber indicações constantes, receber qualificações e supervisão e network com outros membros da equipe.',
  },
  {
    question:
      'Já atendo alguns pacientes. A mentoria ainda faz sentido para mim?',
    answer:
      'Sim. A mentoria também é indicada para psicólogos que já atendem alguns pacientes, mas ainda sentem insegurança clínica, dificuldade em conduzir casos, organizar o processo terapêutico ou estruturar a clínica de forma mais consistente. O acompanhamento ajuda a aprimorar a prática, fortalecer a identidade clínica e ampliar a confiança nos atendimentos.',
  },
  {
    question:
      'Existe suporte para dúvidas clínicas e inseguranças do dia a dia?',
    answer:
      'Sim. A mentoria oferece suporte contínuo para dúvidas clínicas, manejo de casos e inseguranças comuns do início da prática profissional. O espaço é pensado para acolher as dificuldades reais do psicólogo iniciante, promovendo aprendizado, reflexão clínica e desenvolvimento de autonomia, sempre dentro dos limites éticos da Psicologia.',
  },
  {
    question: 'As aulas são ao vivo ou gravadas?',
    answer:
      'As aulas são síncronas, ao vivo, realizadas pelo Zoom, possibilitando interação, troca e acompanhamento direto. Todas as aulas ficam gravadas e disponíveis até o final da mentoria, permitindo que o mentorado revise os conteúdos sempre que necessário.',
  },
  {
    question: 'Qual é o investimento da mentoria?',
    answer:
      'O investimento da mentoria pode ser feito de duas formas: Pagamento à vista com 10% de desconto, o valor fica em R$ 90,00 por aula totalizando R$ 900,00. Pagamento parcelado em 4x de R$ 250,00. As condições são pensadas para facilitar o acesso à formação e ao acompanhamento necessário para a inserção na clínica psicológica.',
  },
  {
    question: 'Posso me inscrever na mentoria sem ter o CRP ativo?',
    answer:
      'Sim. Você pode se inscrever na mentoria mesmo sem estar com o CRP ativo e iniciar desde já sua preparação teórica e clínica. Isso permite que, quando seu registro estiver regularizado, você esteja mais seguro(a), organizado(a) e preparado(a) para conduzir seus primeiros atendimentos com embasamento técnico e ético. É importante destacar, porém, que para realizar atendimentos clínicos vinculados ao projeto, é necessário estar devidamente registrado(a) no CRP, conforme as normas da profissão.',
  },
  {
    question: 'Como faço para me inscrever?',
    answer: (
      <>
        Entre em contato pelo{' '}
        <a
          href='https://wa.me/5551999777486?text=Quero%20participar%20da%20mentoria'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#25D366] font-semibold hover:underline'
        >
          WhatsApp
        </a>{' '}
        enviando a mensagem "quero participar da mentoria" ou preencha o{' '}
        <button
          onClick={scrollToForm}
          className='text-[#C67A5B] font-semibold hover:underline'
        >
          formulário de interesse
        </button>{' '}
        abaixo que entraremos em contato com você para esclarecer dúvidas e
        realizar sua inscrição.
      </>
    ),
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className='w-full'>
      <button
        onClick={onToggle}
        className='w-full bg-[#fcf8f0] rounded-lg px-6 py-6 md:py-8 flex items-center justify-between gap-4 transition-all hover:bg-[#fcf8f0]/90'
      >
        <span className='text-[#234A57] text-base md:text-lg italic text-center flex-1'>
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'w-8 h-8 md:w-10 md:h-10 text-[#234A57] transition-transform duration-300 shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className='mx-4 md:mx-5 border-l border-r border-b border-[#fcf8f0] rounded-b-lg px-6 py-6 md:px-8 md:py-8'>
          <p className='text-[#fcf8f0] text-base md:text-lg italic leading-relaxed text-justify'>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SectionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id='faq' className='bg-[#234A57] py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        {/* Title */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className="font-['Kurale'] text-4xl md:text-5xl lg:text-6xl text-[#fcf8f0] tracking-tight">
            Perguntas Frequentes
          </h2>
          <div className='w-24 h-1 bg-[#C67A5B] mx-auto mt-4' />
        </div>

        {/* FAQ Accordion */}
        <div className='max-w-4xl mx-auto flex flex-col gap-6 md:gap-8'>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
