'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
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
    <header className='fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-[#fcf8f0]/20 shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className="font-['Kurale'] text-2xl text-[#234A57]">
            Clínica Menote
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {mainNavigation.map((item) => (
              <div key={item.label} className='relative group'>
                {item.submenu ? (
                  <button className='flex items-center gap-1 text-[#3c3b39] hover:text-[#C67A5B] transition-colors text-sm font-medium'>
                    {item.label}
                    <ChevronDown className='w-4 h-4' />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-[#C67A5B]',
                      item.highlight
                        ? 'text-[#C67A5B] font-bold'
                        : 'text-[#3c3b39]'
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Desktop Submenu */}
                {item.submenu && (
                  <div className='absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                    <div className='bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-48'>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className='block px-4 py-2 text-sm text-[#3c3b39] hover:bg-[#fcf8f0] hover:text-[#C67A5B]'
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href='/agendar'
              className='bg-[#C67A5B] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#b06a4d] transition-colors'
            >
              Agendar Consulta
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2 text-[#234A57]'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 absolute w-full h-screen overflow-y-auto pb-20'>
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
                      className='flex items-center justify-between w-full text-lg font-medium text-[#3c3b39] py-2'
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
                      <div className='pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[#fcf8f0]'>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className='text-[#3c3b39] py-2 hover:text-[#C67A5B]'
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
                      'block text-lg font-medium py-2',
                      item.highlight ? 'text-[#C67A5B]' : 'text-[#3c3b39]'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href='/agendar'
              className='bg-[#C67A5B] text-white text-center py-3 rounded-lg font-medium mt-4'
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar Consulta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
