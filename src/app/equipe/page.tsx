'use client';

import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function EquipePage() {
  return (
    <main className='min-h-screen bg-white'>
      <Header />
      <section className='pt-32 pb-20'>
        <div className='container mx-auto px-4'>
          <h1 className="font-['Kurale'] text-4xl text-[#234A57] mb-8">
            Nossa Equipe
          </h1>
          <p className='text-[#3c3b39]'>Página em construção...</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
