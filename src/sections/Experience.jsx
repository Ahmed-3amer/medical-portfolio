import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, Calendar, CheckCircle2 } from 'lucide-react';
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
          theme="dark"
          className={classes.header}
        />

        <motion.div 
          className={classes.timeline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerNormal}
        >
          {experienceTimeline.map((item, index) => {
            const title = t(`experience.items.${item.id}.title`);
            const institution = t(`experience.items.${item.id}.institution`);
            const period = t(`experience.items.${item.id}.period`);
            const responsibilities = t(`experience.items.${item.id}.responsibilities`, { returnObjects: true }) || [];

            return (
              <motion.div key={item.id} className={classes.timelineItem} variants={fadeInUp}>
                <div className={classes.timelineMarker}>
                  <div className={classes.markerDot} />
                  {index !== experienceTimeline.length - 1 && <div className={classes.markerLine} />}
                </div>
                
                <div className={classes.timelineContent}>
                  <div className={classes.contentHeader}>
                    <span className={classes.yearBadge} dir="ltr">
                      <Calendar size={14} className={classes.calendarIcon} />
                      <span>{period}</span>
                    </span>
                    <h3 className={classes.jobTitle}>{title}</h3>
                    <div className={classes.institutionRow}>
                      <Building2 size={16} className={classes.institutionIcon} />
                      <span className={classes.institution}>{institution}</span>
                    </div>
                  </div>

                  {Array.isArray(responsibilities) && responsibilities.length > 0 && (
                    <div className={classes.responsibilitiesBlock}>
                      <h4 className={classes.responsibilitiesLabel}>
                        {t('experience.responsibilities_label')}
                      </h4>
                      <ul className={classes.responsibilitiesList}>
                        {responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className={classes.responsibilityItem}>
                            <CheckCircle2 size={16} className={classes.checkIcon} />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
