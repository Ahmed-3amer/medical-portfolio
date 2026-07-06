import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { fadeIn, fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './About.module.css';

export default function About() {
  const { t } = useTranslation();

  const values = [
    t('about.value_01'),
    t('about.value_02'),
    t('about.value_03'),
    t('about.value_04'),
    t('about.value_05'),
    t('about.value_06')
  ].filter(Boolean); // Remove empty slots

  return (
    <section id="about" className={classes.aboutSection}>
      <Container>
        <div className={classes.layout}>
          {/* Portrait Column */}
          <motion.div 
            className={classes.imageColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className={classes.imageWrapper}>
              <img 
                src="/assets/doctor-portrait.webp" 
                alt="Dr. Salah Portrait" 
                className={classes.portraitImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className={classes.placeholderImage} style={{ display: 'none' }}>
                <span>{t('about.title')}</span>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className={classes.contentColumn}>
            <SectionHeader 
              titleKey="about.title" 
              subtitleKey="about.subtitle" 
              alignment="start" 
              className={classes.header}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className={classes.textBlock}
            >
              <p className={classes.biography}>{t('about.biography')}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className={classes.missionBlock}
            >
              <h3 className={classes.blockTitle}>{t('about.mission_label')}</h3>
              <p className={classes.mission}>{t('about.mission')}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerNormal}
              className={classes.valuesBlock}
            >
              <motion.h3 variants={fadeInUp} className={classes.blockTitle}>
                {t('about.values_label')}
              </motion.h3>
              <ul className={classes.valuesList}>
                {values.map((value, idx) => (
                  <motion.li key={idx} variants={fadeInUp} className={classes.valueItem}>
                    <CheckCircle2 className={classes.valueIcon} size={20} />
                    <span>{value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
