'use client';

import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

// Faz o cast para um componente SVG de React
const WarningIcon = RiAlarmWarningFill as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <WarningIcon
            width={60}
            height={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <Link href='/'>Back to home</Link>
        </div>
      </section>
    </main>
  );
}
