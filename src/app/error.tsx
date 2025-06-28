'use client';

import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import TextButton from '@/components/buttons/TextButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Roda o console.error apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  // Faça o cast para um componente SVG de React
  const WarningIcon = RiAlarmWarningFill as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <WarningIcon
            width={60}
            height={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>
            Oops, something went wrong!
          </h1>
          <TextButton variant='basic' onClick={reset} className='mt-4'>
            Try again
          </TextButton>
        </div>
      </section>
    </main>
  );
}
