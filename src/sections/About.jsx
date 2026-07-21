import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Radio, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  Sparkles, 
  Target,
  Quote,
  Target as MissionIcon
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { fadeIn, fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './About.module.css';

export default function About() {
  const { t } = useTranslation();

  const coreValues = [
    { key: 'patient_safety', label: t('about.values.patient_safety'), icon: ShieldCheck },
    { key: 'radiation_protection', label: t('about.values.radiation_protection'), icon: Radio },
    { key: 'excellence', label: t('about.values.excellence'), icon: Award },
    { key: 'integrity', label: t('about.values.integrity'), icon: CheckCircle2 },
    { key: 'learning', label: t('about.values.learning'), icon: BookOpen },
    { key: 'collaboration', label: t('about.values.collaboration'), icon: Users },
    { key: 'innovation', label: t('about.values.innovation'), icon: Sparkles },
    { key: 'quality', label: t('about.values.quality'), icon: Target }
  ];

  return (
    <section id="about" className={classes.aboutSection}>
      <Container>
        <SectionHeader 
          titleKey="about.title" 
          subtitleKey="about.subtitle" 
          alignment="center" 
          className={classes.header}
        />

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
                alt="Salah Nagah Portrait" 
                className={classes.portraitImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className={classes.placeholderImage} style={{ display: 'none' }}>
                <span>Salah Nagah</span>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className={classes.contentColumn}>
            {/* Biography Intro Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className={classes.bioCard}
            >
              <div className={classes.bioHeader}>
                <Quote size={28} className={classes.quoteIcon} />
                <span className={classes.bioTag}>{t('about.title')}</span>
              </div>
              <p className={classes.biography}>{t('about.biography')}</p>
            </motion.div>

            {/* Mission & Professional Profile */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className={classes.missionBlock}
            >
              <div className={classes.missionHeader}>
                <MissionIcon size={24} className={classes.missionHeaderIcon} />
                <h3 className={classes.blockTitle}>{t('about.mission_title')}</h3>
              </div>

              <div className={classes.missionParagraphs}>
                <p className={classes.missionText}>{t('about.mission_p1')}</p>
                <p className={classes.missionText}>{t('about.mission_p2')}</p>
                <p className={classes.missionText}>{t('about.mission_p3')}</p>
              </div>

              <div className={classes.missionTaglineBar}>
                <span>{t('about.mission_tagline')}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerNormal}
          className={classes.valuesSection}
        >
          <motion.h3 variants={fadeInUp} className={classes.valuesTitle}>
            {t('about.values_title')}
          </motion.h3>
          <div className={classes.valuesGrid}>
            {coreValues.map((value) => {
              const IconComp = value.icon;
              return (
                <motion.div 
                  key={value.key} 
                  variants={fadeInUp} 
                  className={classes.valueCard}
                >
                  <div className={classes.valueIconWrapper}>
                    <IconComp className={classes.valueIcon} size={22} />
                  </div>
                  <span className={classes.valueText}>{value.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
