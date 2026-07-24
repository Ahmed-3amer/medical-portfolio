import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Activity, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Radio,
  Maximize2,
  X,
  Sparkles
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { clinicalCases } from '@/data/clinicalCases';
import { fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './JobDescription.module.css';

export default function JobDescription() {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Retrieve raw arrays safely from translation
  const imagingItems = t('job_description.categories.imaging.items', { returnObjects: true }) || [];
  const imagingModalities = t('job_description.categories.imaging.modalities', { returnObjects: true }) || [];
  const radiationItems = t('job_description.categories.radiation.items', { returnObjects: true }) || [];
  const qaItems = t('job_description.categories.qa.items', { returnObjects: true }) || [];

  // Double the cases list for seamless infinite marquee loop
  const marqueeCases = [...clinicalCases, ...clinicalCases, ...clinicalCases];

  // Handle ESC key and scroll lock for Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCase(null);
      }
    };

    if (selectedCase) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCase]);

  return (
    <section id="job-description" className={classes.section}>
      <Container>
        <SectionHeader 
          titleKey="job_description.title" 
          subtitleKey="job_description.subtitle" 
          alignment="center" 
          theme="dark"
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

        {/* Clinical Practice Showcase Carousel (Real Case Gallery) */}
        <motion.div 
          className={classes.showcaseSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={classes.showcaseHeader}>
            <div className={classes.showcaseBadge}>
              <Sparkles size={16} className={classes.showcaseIcon} />
              <span>{t('job_description.showcase.title')}</span>
            </div>
            <p className={classes.showcaseSubtitle}>
              {t('job_description.showcase.subtitle')}
            </p>
          </div>

          <div 
            className={classes.marqueeContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className={`${classes.marqueeTrack} ${isPaused ? classes.paused : ''}`}>
              {marqueeCases.map((item, idx) => {
                const caseTitle = t(`job_description.showcase.cases.${item.id}.title`);
                const caseCat = t(`job_description.showcase.cases.${item.id}.category`);
                return (
                  <div 
                    key={`${item.id}-${idx}`}
                    className={classes.caseCard}
                    onClick={() => setSelectedCase(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={caseTitle}
                  >
                    <div className={classes.caseImageWrapper}>
                      <img 
                        src={item.image} 
                        alt={caseTitle}
                        loading="lazy"
                        className={classes.caseImage}
                      />
                      <div className={classes.caseOverlay}>
                        <div className={classes.zoomBadge}>
                          <Maximize2 size={16} />
                        </div>
                      </div>
                    </div>
                    <div className={classes.caseInfo}>
                      <span className={classes.caseCategory}>{caseCat}</span>
                      <h4 className={classes.caseTitle}>{caseTitle}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div 
            className={classes.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCase(null)}
          >
            <motion.div 
              className={classes.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={classes.modalCloseBtn}
                onClick={() => setSelectedCase(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className={classes.modalImageWrapper}>
                <img 
                  src={selectedCase.image} 
                  alt={t(`job_description.showcase.cases.${selectedCase.id}.title`)} 
                  className={classes.modalImage}
                />
              </div>

              <div className={classes.modalFooter}>
                <span className={classes.modalCategory}>
                  {t(`job_description.showcase.cases.${selectedCase.id}.category`)}
                </span>
                <h3 className={classes.modalTitle}>
                  {t(`job_description.showcase.cases.${selectedCase.id}.title`)}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
