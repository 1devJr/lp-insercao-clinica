'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const mainNavigation = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  {
    label: 'Serviços',
    href: '/servicos',
    submenu: [
      { label: 'Psicologia', href: '/servicos/psicologia' },
      { label: 'Psiquiatria', href: '/servicos/psiquiatria' },
      {
        label: 'Projeto Saúde Mental para Todos',
        href: '/servicos/projeto-saude-mental',
      },
      { label: 'Cursos', href: '/servicos/cursos' },
      { label: 'Mentoria Inserção na Clínica', href: '/mentoria' },
    ],
  },
  { label: 'Equipe', href: '/equipe' },
  { label: 'Blog', href: '/blog' },
  { label: 'Mentoria', href: '/mentoria', highlight: true },
  { label: 'Contato', href: '/contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className='fixed w-full bg-clinic-primary z-50 border-b border-clinic-gold/20 shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='relative w-12 h-12'>
              <Image
                src='/images/LogoClinicaSemTexto.jpeg'
                alt='Logo Clínica Menote'
                fill
                className='object-contain'
              />
            </div>
            <span className="font-['Kurale'] text-2xl text-white group-hover:text-clinic-gold transition-colors">
              Clínica Menote
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {mainNavigation.map((item) => (
              <div key={item.label} className='relative group'>
                {item.submenu ? (
                  <button className='flex items-center gap-1 text-white/90 hover:text-clinic-gold transition-colors text-sm font-medium'>
                    {item.label}
                    <ChevronDown className='w-4 h-4' />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-clinic-gold',
                      item.highlight
                        ? 'text-clinic-gold font-bold'
                        : 'text-white/90'
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Desktop Submenu */}
                {item.submenu && (
                  <div className='absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                    <div className='bg-clinic-primary rounded-lg shadow-lg border border-clinic-gold/20 py-2 w-48'>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className='block px-4 py-2 text-sm text-white/90 hover:bg-clinic-gold/10 hover:text-clinic-gold'
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <a
              href='https://wa.me/5551999977486'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-clinic-gold text-clinic-primary px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-clinic-primary transition-colors'
            >
              Agendar Consulta
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2 text-white hover:text-clinic-gold transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-clinic-primary border-t border-clinic-gold/20 absolute w-full h-screen overflow-y-auto pb-20'>
          <div className='container mx-auto px-4 py-6 flex flex-col gap-4'>
            {mainNavigation.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveSubmenu(
                          activeSubmenu === item.label ? null : item.label
                        )
                      }
                      className='flex items-center justify-between w-full text-lg font-medium text-white/90 py-2 hover:text-clinic-gold'
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 transition-transform',
                          activeSubmenu === item.label && 'rotate-180'
                        )}
                      />
                    </button>
                    {activeSubmenu === item.label && (
                      <div className='pl-4 flex flex-col gap-2 mt-2 border-l-2 border-clinic-gold/30'>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className='text-white/80 py-2 hover:text-clinic-gold'
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block text-lg font-medium py-2 hover:text-clinic-gold',
                      item.highlight ? 'text-clinic-gold' : 'text-white/90'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <a
              href='https://wa.me/5551997326916'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-clinic-gold text-clinic-primary text-center py-3 rounded-lg font-medium mt-4 block hover:bg-white transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
