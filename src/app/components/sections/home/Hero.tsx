'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.5; // stronger slow-motion feel

    const skipFirstSecond = () => {
      if (video.currentTime < 1) {
        video.currentTime = 1;
      }
      void video.play().catch(() => {
        /* autoplay might be blocked; safe to ignore */
      });
    };

    video.addEventListener('loadedmetadata', skipFirstSecond);

    return () => {
      video.removeEventListener('loadedmetadata', skipFirstSecond);
    };
  }, []);

  return (
    <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-clinic-beige'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <h1 className="font-['Kurale'] text-5xl lg:text-7xl text-clinic-primary leading-tight">
              Saúde mental com afeto e excelência
            </h1>
            <p className='text-lg text-[#3c3b39] leading-relaxed max-w-xl'>
              Acolhimento humanizado e tratamentos baseados em evidências. Sua
              jornada de transformação começa aqui.
            </p>
            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <a
                href='https://wa.me/5551999977486'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-clinic-primary text-white px-8 py-4 rounded-full text-center font-medium hover:bg-clinic-primary/90 transition-colors'
              >
                Agendar Consulta
              </a>
              {/* <Link
                href='/sobre'
                className='border-2 border-clinic-primary text-clinic-primary px-8 py-4 rounded-full text-center font-medium hover:bg-clinic-primary hover:text-white transition-colors'
              >
                Conheça a Clínica
              </Link> */}
            </div>
          </div>
          <div className='relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-200'>
            <video
              ref={videoRef}
              className='absolute inset-0 w-full h-full object-cover'
              src='/IMG_2613.MOV'
              autoPlay
              muted
              loop
              playsInline
              suppressHydrationWarning
              data-no-vsc
              aria-label='Vídeo institucional da clínica'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/25 to-black/45' />
          </div>
        </div>
      </div>
    </section>
  );
}
