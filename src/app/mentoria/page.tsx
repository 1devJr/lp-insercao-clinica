'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import SectionCronograma from '../components/sections/section_cronograma';
import SectionFooter from '../components/sections/section_footer';
import SectionHero from '../components/sections/section_hero';
import SectionMentoring from '../components/sections/section_mentoring';
import SectionSubscription from '../components/sections/section_subscription';
import SectionUnderstandMethod from '../components/sections/section_understand-method';

export default function MentoriaPage() {
  return (
    <main>
      <Head>
        <title>Clinica Menote - Mentoria</title>
      </Head>
      <section className='bg-white'>
        <SectionHero></SectionHero>
        <SectionMentoring></SectionMentoring>
        <SectionUnderstandMethod></SectionUnderstandMethod>
        <SectionCronograma></SectionCronograma>
        <SectionSubscription></SectionSubscription>
        <SectionFooter></SectionFooter>
      </section>
    </main>
  );
}
