import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { experienceTimeline } from '@/data/experience';
import { fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './Experience.module.css';

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className={classes.experienceSection}>
      <Container>
        <SectionHeader 
          titleKey="experience.title" 
          subtitleKey="experience.subtitle" 
        />

        <motion.div 
          className={classes.timeline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerNormal}
        >
          {experienceTimeline.map((item, index) => (
            <motion.div key={item.id} className={classes.timelineItem} variants={fadeInUp}>
              <div className={classes.timelineMarker}>
                <div className={classes.markerDot} />
                {/* Omit the line for the last item */}
                {index !== experienceTimeline.length - 1 && <div className={classes.markerLine} />}
              </div>
              
              <div className={classes.timelineContent}>
                <span className={classes.year} dir="ltr">{item.year}</span>
                <h3 className={classes.jobTitle}>
                  {/* Assuming keys aren't in translation.json yet, we fallback to string itself if missing. Normally these would be in translation.json */}
                  {t(item.titleKey, item.titleKey)}
                </h3>
                <h4 className={classes.institution}>
                  {t(item.institutionKey, item.institutionKey)}
                </h4>
                <p className={classes.description}>
                  {t(item.descriptionKey, item.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
