'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import SectionHero from './components/sections/section_hero';
import SectionMentoring from './components/sections/section_mentoring';
import SectionUnderstandMethod from './components/sections/section_understand-method';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <SectionHero></SectionHero>
        <SectionMentoring></SectionMentoring>
        <SectionUnderstandMethod></SectionUnderstandMethod>
        {/* <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://github.com/1devjr' target='_blank'>
             Criado por 1devJr
            </UnderlineLink>
          </footer> */}
      </section>
    </main>
  );
}
