import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/Container';
// import { Button } from '@/components/Button';
import { fadeIn, fadeInUp } from '@/utils/animations';
import classes from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is active, set initial to visible to bypass animations
  const initial = prefersReducedMotion ? 'visible' : 'hidden';

  return (
    <section id="hero" className={classes.hero}>
      {/* Background Image Layer */}
      <div className={classes.bgImage} />
      
      {/* Gradient Overlay Layer */}
      <div className={classes.bgOverlay} aria-hidden="true" role="presentation" />

      {/* Optional Pattern Overlay */}
      <div className={classes.bgPattern} aria-hidden="true" role="presentation" />

      {/* Content Layer */}
      <Container className={classes.contentContainer}>
        <div className={classes.content}>
          <motion.p
            className={classes.eyebrow}
            initial={initial}
            animate="visible"
            variants={fadeIn}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            {t('hero.eyebrow')}
          </motion.p>
          
          <motion.h1
            className={classes.headline}
            initial={initial}
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
          >
            {t('hero.headline')}
          </motion.h1>
          
          <motion.p
            className={classes.subheadline}
            initial={initial}
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
          >
            {t('hero.subheadline')}
          </motion.p>
          
          {/* 
          <motion.div
            className={classes.ctaWrapper}
            initial={initial}
            animate="visible"
            variants={fadeIn}
            transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
          >
            <Button variant="primary" className={classes.ctaButton}>
              <a href="#contact" className={classes.ctaLink}>{t('hero.cta_primary')}</a>
            </Button>
          </motion.div>
          */}
        </div>
      </Container>
    </section>
  );
}
