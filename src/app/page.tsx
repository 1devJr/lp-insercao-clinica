'use client';

import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import AboutQuick from '@/app/components/sections/home/AboutQuick';
import BlogPreview from '@/app/components/sections/home/BlogPreview';
import Differentials from '@/app/components/sections/home/Differentials';
import Hero from '@/app/components/sections/home/Hero';
import Services from '@/app/components/sections/home/Services';
import TeamHighlight from '@/app/components/sections/home/TeamHighlight';
import Testimonials from '@/app/components/sections/home/Testimonials';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-white'>
      <Header />
      <Hero />
      <AboutQuick />
      <Services />
      <Differentials />
      <TeamHighlight />
      <Testimonials />
      <BlogPreview />
      <Footer />
    </main>
  );
}
