import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Activity, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Radio
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './JobDescription.module.css';

export default function JobDescription() {
  const { t } = useTranslation();

  // Retrieve raw arrays safely from translation
  const imagingItems = t('job_description.categories.imaging.items', { returnObjects: true }) || [];
  const imagingModalities = t('job_description.categories.imaging.modalities', { returnObjects: true }) || [];
  const radiationItems = t('job_description.categories.radiation.items', { returnObjects: true }) || [];
  const qaItems = t('job_description.categories.qa.items', { returnObjects: true }) || [];

  return (
    <section id="job-description" className={classes.section}>
      <Container>
        <SectionHeader 
          titleKey="job_description.title" 
          subtitleKey="job_description.subtitle" 
          alignment="center" 
          className={classes.header}
        />

        {/* Role Summary Highlight Card */}
        <motion.div 
          className={classes.summaryCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className={classes.summaryHeader}>
            <div className={classes.summaryIconWrapper}>
              <Briefcase size={24} className={classes.summaryIcon} />
            </div>
            <h3 className={classes.summaryTitle}>{t('job_description.summary_title')}</h3>
          </div>
          <p className={classes.summaryText}>{t('job_description.summary_text')}</p>
        </motion.div>

        {/* Key Responsibilities Grid */}
        <motion.div 
          className={classes.categoriesContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerNormal}
        >
          {/* Category 1: Imaging Procedures & Modalities */}
          <motion.div variants={fadeInUp} className={classes.categoryCard}>
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIconWrapper}>
                <Activity size={26} className={classes.categoryIcon} />
              </div>
              <div>
                <h3 className={classes.categoryTitle}>
                  {t('job_description.categories.imaging.title')}
                </h3>
                <span className={classes.categorySubtitle}>
                  {t('job_description.categories.imaging.subtitle')}
                </span>
              </div>
            </div>

            {/* Operated Imaging Modalities Grid */}
            <div className={classes.modalitiesBlock}>
              <h4 className={classes.modalitiesTitle}>
                <Cpu size={18} className={classes.modalitiesIcon} />
                <span>{t('job_description.categories.imaging.modalities_title')}</span>
              </h4>
              <div className={classes.modalitiesGrid}>
                {Array.isArray(imagingModalities) && imagingModalities.map((modality, idx) => (
                  <div key={idx} className={classes.modalityBadge}>
                    <Layers size={14} className={classes.modalityIcon} />
                    <span>{modality}</span>
                  </div>
                ))}
              </div>
            </div>

            <ul className={classes.itemsList}>
              {Array.isArray(imagingItems) && imagingItems.map((item, idx) => (
                <li key={idx} className={classes.listItem}>
                  <CheckCircle2 size={18} className={classes.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Category 2: Radiation Protection & Regulatory (RPO) */}
          <motion.div variants={fadeInUp} className={classes.categoryCard}>
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIconWrapper}>
                <ShieldAlert size={26} className={classes.categoryIcon} />
              </div>
              <div>
                <h3 className={classes.categoryTitle}>
                  {t('job_description.categories.radiation.title')}
                </h3>
                <span className={classes.categorySubtitle}>
                  {t('job_description.categories.radiation.subtitle')}
                </span>
              </div>
            </div>

            <ul className={classes.itemsList}>
              {Array.isArray(radiationItems) && radiationItems.map((item, idx) => (
                <li key={idx} className={classes.listItem}>
                  <Radio size={18} className={classes.radioIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Category 3: Quality Assurance & Clinical Excellence */}
          <motion.div variants={fadeInUp} className={classes.categoryCard}>
            <div className={classes.categoryHeader}>
              <div className={classes.categoryIconWrapper}>
                <Award size={26} className={classes.categoryIcon} />
              </div>
              <div>
                <h3 className={classes.categoryTitle}>
                  {t('job_description.categories.qa.title')}
                </h3>
                <span className={classes.categorySubtitle}>
                  {t('job_description.categories.qa.subtitle')}
                </span>
              </div>
            </div>

            <ul className={classes.itemsList}>
              {Array.isArray(qaItems) && qaItems.map((item, idx) => (
                <li key={idx} className={classes.listItem}>
                  <CheckCircle2 size={18} className={classes.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
