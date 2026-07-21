import React, { Suspense } from 'react';
import { useLanguageDirection } from '@/hooks/useLanguageDirection';
import { Navbar } from '@/layout/Navbar';
import { Footer } from '@/layout/Footer';
// Sections
import Hero from '@/sections/Hero';
const About = React.lazy(() => import('@/sections/About'));
const JobDescription = React.lazy(() => import('@/sections/JobDescription'));
const Contact = React.lazy(() => import('@/sections/Contact'));
const Expertise = React.lazy(() => import('@/sections/Expertise'));
const Experience = React.lazy(() => import('@/sections/Experience'));
const Certificates = React.lazy(() => import('@/sections/Certificates'));

function App() {
  // Sync HTML lang and dir attributes
  useLanguageDirection();

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero is loaded eagerly (above the fold) */}
        <Hero />
        
        {/* Lazy loaded sections wrapped in Suspense */}
        <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'var(--color-surface-alt)' }} />}>
          <About />
        </Suspense>

        <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'var(--color-background)' }} />}>
          <JobDescription />
        </Suspense>

        <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'var(--color-background)' }} />}>
          <Expertise />
        </Suspense>

        <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'var(--color-surface-alt)' }} />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'var(--color-background)' }} />}>
          <Certificates />
        </Suspense>

        <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'var(--color-surface-alt)' }} />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
