'use client';

import {
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#234A57] text-[#fcf8f0] pt-16 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {/* Brand Column */}
          <div className='space-y-4'>
            <h3 className="font-['Kurale'] text-2xl mb-4">Clínica Menote</h3>
            <p className='text-sm opacity-90 leading-relaxed'>
              Saúde mental com afeto, vínculo e excelência. Nossa missão é
              proporcionar acolhimento e transformação através da psicologia.
            </p>
            <div className='pt-4'>
              <p className='text-xs opacity-75'>CRP 07/26202</p>
              <p className='text-xs opacity-75'>
                Responsável técnica: Psicóloga Nicole Menote
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Kurale'] text-xl mb-6 text-[#C67A5B]">
              Links Rápidos
            </h4>
            <ul className='space-y-3 text-sm'>
              <li>
                <Link
                  href='/'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href='/sobre'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href='/servicos'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href='/equipe'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Equipe
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/contato'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href='/mentoria'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Mentoria
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Kurale'] text-xl mb-6 text-[#C67A5B]">
              Contato
            </h4>
            <ul className='space-y-4 text-sm'>
              <li className='flex items-start gap-3'>
                <MapPin className='w-5 h-5 text-[#C67A5B] shrink-0 mt-0.5' />
                <span>
                  Av. Carlos Gomes, 123 - Sala 405
                  <br />
                  Auxiliadora, Porto Alegre - RS
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='w-5 h-5 text-[#C67A5B] shrink-0' />
                <span>(51) 99732-6916</span>
              </li>
              <li className='flex items-center gap-3'>
                <MessageCircle className='w-5 h-5 text-[#C67A5B] shrink-0' />
                <span>(51) 99732-6916</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-['Kurale'] text-xl mb-6 text-[#C67A5B]">
              Redes Sociais
            </h4>
            <div className='flex gap-4'>
              <a
                href='https://instagram.com/clinicamenote'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-[#fcf8f0]/10 p-3 rounded-full hover:bg-[#C67A5B] transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='https://linkedin.com/company/clinicamenote'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-[#fcf8f0]/10 p-3 rounded-full hover:bg-[#C67A5B] transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
            </div>
            <div className='mt-8'>
              <a
                href='https://wa.me/5551997326916'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-medium transition-colors'
              >
                <MessageCircle className='w-5 h-5' />
                Agendar via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-[#fcf8f0]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70'>
          <p>© {currentYear} Clínica Menote. Todos os direitos reservados.</p>
          <div className='flex gap-6'>
            <Link href='/termos-de-uso' className='hover:text-white'>
              Termos de Uso
            </Link>
            <Link href='/politica-de-privacidade' className='hover:text-white'>
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
