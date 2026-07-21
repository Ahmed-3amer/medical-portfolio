import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Scan, 
  Crosshair, 
  Activity, 
  ShieldAlert, 
  FileCheck, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Stethoscope, 
  Box, 
  TrendingUp, 
  PackageCheck, 
  GraduationCap 
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { expertiseItems } from '@/data/expertise';
import { fadeInUp, staggerContainerFast } from '@/utils/animations';
import classes from './Expertise.module.css';

const iconMap = {
  Scan,
  Crosshair,
  Activity,
  ShieldAlert,
  FileCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Sliders,
  Stethoscope,
  Box,
  TrendingUp,
  PackageCheck,
  GraduationCap
};

export default function Expertise() {
  const { t } = useTranslation();

  return (
    <section id="expertise" className={classes.expertiseSection}>
      <Container>
        <SectionHeader 
          titleKey="expertise.title" 
          subtitleKey="expertise.subtitle" 
          alignment="center"
          className={classes.header}
        />

        <motion.div 
          className={classes.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerFast}
        >
          {expertiseItems.map((item) => {
            const IconComponent = iconMap[item.icon] || Activity;
            
            return (
              <motion.div key={item.id} variants={fadeInUp} className={classes.cardWrapper}>
                <div className={classes.card}>
                  <div className={classes.iconWrapper}>
                    <IconComponent size={24} className={classes.icon} />
                  </div>
                  <h3 className={classes.cardTitle}>
                    {t(`expertise.items.${item.id}`)}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
