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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Images,
  Layers3
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { clinicalCases, clinicalCategories } from '@/data/clinicalCases';
import { fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './JobDescription.module.css';

export default function JobDescription() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isRtl = i18n.language === 'ar';

  // Retrieve raw arrays safely from translation
  const imagingItems = t('job_description.categories.imaging.items', { returnObjects: true }) || [];
  const imagingModalities = t('job_description.categories.imaging.modalities', { returnObjects: true }) || [];
  const radiationItems = t('job_description.categories.radiation.items', { returnObjects: true }) || [];
  const qaItems = t('job_description.categories.qa.items', { returnObjects: true }) || [];

  // Filter clinical cases according to active category
  const filteredCases = activeCategory === 'all' 
    ? clinicalCases 
    : clinicalCases.filter(c => c.category === activeCategory);

  const handleOpenCase = (item) => {
    setSelectedCase(item);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (!selectedCase) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedCase.images.length);
  };

  const handlePrevImage = () => {
    if (!selectedCase) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedCase.images.length) % selectedCase.images.length);
  };

  // Handle ESC key and Keyboard Arrow navigation for Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCase) return;
      if (e.key === 'Escape') {
        setSelectedCase(null);
      } else if (e.key === 'ArrowRight') {
        if (isRtl) handlePrevImage();
        else handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) handleNextImage();
        else handlePrevImage();
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
  }, [selectedCase, isRtl]);

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

        {/* Clinical Practice Showcase (Categorized Album Cards & Interactive Lightbox) */}
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

          {/* Category Filter Tabs */}
          <div className={classes.filterTabsContainer}>
            {clinicalCategories.map((cat) => (
              <button
                key={cat.id}
                className={`${classes.filterTab} ${activeCategory === cat.id ? classes.activeTab : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Categorized Cases Grid */}
          <motion.div className={classes.casesGrid} layout>
            <AnimatePresence mode="popLayout">
              {filteredCases.map((item) => {
                const caseTitle = t(`job_description.showcase.cases.${item.id}.title`);
                const caseCat = t(`job_description.showcase.cases.${item.id}.category`);
                const photosCount = item.images.length;
                const countText = photosCount === 1 
                  ? t('job_description.showcase.photos_count_one')
                  : t('job_description.showcase.photos_count_other', { count: photosCount });

                return (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={classes.caseCard}
                    onClick={() => handleOpenCase(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={caseTitle}
                  >
                    <div className={classes.caseImageWrapper}>
                      <img 
                        src={item.coverImage} 
                        alt={caseTitle}
                        loading="lazy"
                        className={classes.caseImage}
                      />
                      
                      {/* Count Badge Overlay */}
                      <div className={classes.countBadge}>
                        <Images size={13} />
                        <span>{countText}</span>
                      </div>

                      <div className={classes.caseOverlay}>
                        <div className={classes.zoomBadge}>
                          <Maximize2 size={18} />
                        </div>
                      </div>
                    </div>

                    <div className={classes.caseInfo}>
                      <span className={classes.caseCategory}>{caseCat}</span>
                      <h4 className={classes.caseTitle}>{caseTitle}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>

      {/* Interactive Multi-Image Gallery Lightbox Modal */}
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
              {/* Close Button */}
              <button 
                className={classes.modalCloseBtn}
                onClick={() => setSelectedCase(null)}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

              {/* Main Image Container & Navigation Arrows */}
              <div className={classes.modalGalleryViewer}>
                {selectedCase.images.length > 1 && (
                  <>
                    <button 
                      className={`${classes.modalNavBtn} ${classes.prevBtn}`}
                      onClick={isRtl ? handleNextImage : handlePrevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                      className={`${classes.modalNavBtn} ${classes.nextBtn}`}
                      onClick={isRtl ? handlePrevImage : handleNextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Main Active Image */}
                <div className={classes.modalImageWrapper}>
                  <img 
                    src={selectedCase.images[currentImageIndex]} 
                    alt={`${t(`job_description.showcase.cases.${selectedCase.id}.title`)} - ${currentImageIndex + 1}`} 
                    className={classes.modalImage}
                  />
                  
                  {/* Active Image Position Counter Badge */}
                  {selectedCase.images.length > 1 && (
                    <div className={classes.modalCounterBadge}>
                      <Layers3 size={13} />
                      <span>{currentImageIndex + 1} / {selectedCase.images.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails Navigation Strip */}
              {selectedCase.images.length > 1 && (
                <div className={classes.modalThumbnailsStrip}>
                  {selectedCase.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      className={`${classes.modalThumbBtn} ${currentImageIndex === index ? classes.activeThumb : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className={classes.thumbImg} />
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Footer Info */}
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

