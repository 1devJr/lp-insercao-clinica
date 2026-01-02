import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

export default function SectionFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#234A57] text-[#fcf8f0] pt-16 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {/* Brand Column */}
          <div className='space-y-4'>
            <h3 className='font-primary text-2xl mb-4'>Clínica Menote</h3>
            <p className='text-sm opacity-90 leading-relaxed'>
              Saúde mental com afeto, vínculo e excelência. Nossa missão é
              proporcionar acolhimento e transformação através da psicologia.
            </p>
            <div className='pt-4'>
              <p className='text-xs opacity-75'>CRP 00/00000</p>
              <p className='text-xs opacity-75'>
                Responsável Técnica: Dra. Nome Sobrenome
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-primary text-xl mb-6 text-[#C67A5B]'>
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
                  href='#sobre'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href='#metodo'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Nossa Metodologia
                </Link>
              </li>
              <li>
                <Link
                  href='#cronograma'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Cronograma
                </Link>
              </li>
              <li>
                <Link
                  href='#subscription-form'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Agendar Consulta
                </Link>
              </li>
              <li className='pt-2'>
                <Link
                  href='/termos-de-uso'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href='/politica-de-privacidade'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-primary text-xl mb-6 text-[#C67A5B]'>
              Contato
            </h4>
            <ul className='space-y-4 text-sm'>
              <li className='flex items-start gap-3'>
                <MapPin className='w-5 h-5 text-[#C67A5B] shrink-0' />
                <span>
                  Medplex Santana Torre Sul, Sala 1006
                  <br />
                  Porto Alegre - RS
                  <br />
                  Atendimento Online para todo Brasil
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='w-5 h-5 text-[#C67A5B] shrink-0' />
                <a
                  href='https://wa.me/5551999999999'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  (51) 99999-9999
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='w-5 h-5 text-[#C67A5B] shrink-0' />
                <a
                  href='mailto:contato@clinicamenote.com.br'
                  className='hover:text-[#C67A5B] transition-colors'
                >
                  contato@clinicamenote.com.br
                </a>
              </li>
            </ul>
            <div className='flex gap-4 mt-6'>
              <a
                href='#'
                className='bg-[#fcf8f0]/10 p-2 rounded-full hover:bg-[#C67A5B] transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='bg-[#fcf8f0]/10 p-2 rounded-full hover:bg-[#C67A5B] transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='bg-[#fcf8f0]/10 p-2 rounded-full hover:bg-[#C67A5B] transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className='h-full min-h-[200px] rounded-lg overflow-hidden bg-white/5'>
            <iframe
              src='https://maps.google.com/maps?q=Medplex%20Santana%20Torre%20Sul%2C%20Porto%20Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed'
              width='100%'
              height='100%'
              title='Mapa de localização da Clínica Menote'
              style={{ border: 0, minHeight: '200px' }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='grayscale hover:grayscale-0 transition-all duration-500'
            ></iframe>
          </div>
        </div>

        <div className='border-t border-[#fcf8f0]/10 pt-8 mt-8 text-center text-sm opacity-60'>
          <p>© {currentYear} Clínica Menote. Todos os direitos reservados.</p>
          <p className='mt-2 text-xs'>Desenvolvido com ❤️ para saúde mental.</p>
        </div>
      </div>
    </footer>
  );
}
