import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Scan, 
  Brain, 
  Monitor, 
  Crosshair, 
  Briefcase, 
  Stethoscope, 
  Sparkles 
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { expertiseItems } from '@/data/expertise';
import { fadeInUp, staggerContainerFast } from '@/utils/animations';
import classes from './Expertise.module.css';

// Map icon string names to imported Lucide components to ensure tree-shaking
const iconMap = {
  activity: Activity,
  scan: Scan,
  brain: Brain,
  monitor: Monitor,
  crosshair: Crosshair,
  briefcase: Briefcase,
  stethoscope: Stethoscope,
  sparkles: Sparkles
};

export default function Expertise() {
  const { t } = useTranslation();

  return (
    <section id="expertise" className={classes.expertiseSection}>
      <Container>
        <SectionHeader 
          titleKey="expertise.title" 
          subtitleKey="expertise.subtitle" 
        />

        <motion.div 
          className={classes.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerFast}
        >
          {expertiseItems.map((item) => {
            const IconComponent = iconMap[item.iconName] || Activity;
            
            return (
              <motion.div key={item.id} variants={fadeInUp}>
                <Card hoverable className={classes.expertiseCard}>
                  <div className={classes.iconWrapper}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className={classes.cardTitle}>
                    {t(`expertise.${item.id}.title`)}
                  </h3>
                  <p className={classes.cardDesc}>
                    {t(`expertise.${item.id}.description`)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
