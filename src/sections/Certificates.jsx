import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Building2, 
  Calendar, 
  Maximize2, 
  X, 
  FileCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FileBadge,
  Sparkles,
  Layers
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { certificateItems } from '@/data/certificates';
import { fadeInUp, staggerContainerMedium } from '@/utils/animations';
import classes from './Certificates.module.css';

const ITEMS_PER_PAGE = 6;

const categoryIcons = {
  all: Layers,
  academic: GraduationCap,
  licenses: FileBadge,
  training: Sparkles
};

export default function Certificates() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIndex, setModalIndex] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (certId) => {
    setFailedImages((prev) => ({ ...prev, [certId]: true }));
  };

  // Filter items by category
  const filteredCertificates = useMemo(() => {
    if (activeCategory === 'all') return certificateItems;
    return certificateItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE);

  // Paginated slice
  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCertificates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCertificates, currentPage]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    setCurrentPage(1);
  };

  // Modal navigation handlers
  const handleOpenModal = (indexInPaginated) => {
    const globalFilteredIndex = (currentPage - 1) * ITEMS_PER_PAGE + indexInPaginated;
    setModalIndex(globalFilteredIndex);
  };

  const handlePrevModal = (e) => {
    if (e) e.stopPropagation();
    if (modalIndex === null) return;
    setModalIndex((prev) => (prev === 0 ? filteredCertificates.length - 1 : prev - 1));
  };

  const handleNextModal = (e) => {
    if (e) e.stopPropagation();
    if (modalIndex === null) return;
    setModalIndex((prev) => (prev === filteredCertificates.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex === null) return;
      if (e.key === 'Escape') setModalIndex(null);
      if (e.key === 'ArrowLeft') {
        isRtl ? handleNextModal() : handlePrevModal();
      }
      if (e.key === 'ArrowRight') {
        isRtl ? handlePrevModal() : handleNextModal();
      }
    };

    if (modalIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIndex, isRtl]);

  const activeModalCert = modalIndex !== null ? filteredCertificates[modalIndex] : null;

  // Pagination bounds info
  const startItemNum = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemNum = Math.min(currentPage * ITEMS_PER_PAGE, filteredCertificates.length);

  return (
    <section id="certificates" className={classes.certificatesSection}>
      <Container>
        <SectionHeader 
          titleKey="certificates.title" 
          subtitleKey="certificates.subtitle" 
          alignment="center"
          className={classes.header}
        />

        {/* Category Filter Tabs */}
        <div className={classes.filterTabsContainer}>
          {['all', 'academic', 'licenses', 'training'].map((catKey) => {
            const Icon = categoryIcons[catKey] || Layers;
            const count = catKey === 'all' 
              ? certificateItems.length 
              : certificateItems.filter(item => item.category === catKey).length;
            const isActive = activeCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => handleCategoryChange(catKey)}
                className={`${classes.filterTab} ${isActive ? classes.filterTabActive : ''}`}
                type="button"
              >
                <Icon size={16} className={classes.tabIcon} />
                <span>{t(`certificates.categories.${catKey}`)}</span>
                <span className={classes.tabCountBadge}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Certificates Grid */}
        <motion.div 
          key={`${activeCategory}-${currentPage}`}
          className={classes.grid}
          initial="hidden"
          animate="visible"
          variants={staggerContainerMedium}
        >
          {paginatedCertificates.map((cert, index) => {
            const title = t(`certificates.items.${cert.id}.title`);
            const issuer = t(`certificates.items.${cert.id}.issuer`);
            const year = t(`certificates.items.${cert.id}.year`);
            const hasImageFailed = failedImages[cert.id];

            return (
              <motion.div key={cert.id} variants={fadeInUp} className={classes.cardWrapper}>
                <div 
                  className={classes.certCard}
                  onClick={() => handleOpenModal(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={title}
                >
                  <div className={classes.imageWrapper}>
                    {!hasImageFailed ? (
                      <img 
                        src={cert.image} 
                        alt={title}
                        loading="lazy"
                        className={classes.image}
                        onError={() => handleImageError(cert.id)}
                      />
                    ) : (
                      <div className={classes.placeholderBox}>
                        <Award size={36} className={classes.placeholderIcon} />
                        <span className={classes.placeholderText}>
                          {t('certificates.placeholder_badge')}
                        </span>
                      </div>
                    )}

                    <div className={classes.cardOverlay}>
                      <div className={classes.zoomBadge}>
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>

                  <div className={classes.content}>
                    <div className={classes.metaRow}>
                      <span className={classes.yearBadge} dir="ltr">
                        <Calendar size={13} className={classes.metaIcon} />
                        <span>{year}</span>
                      </span>
                    </div>

                    <h3 className={classes.title}>{title}</h3>

                    <div className={classes.issuerRow}>
                      <Building2 size={15} className={classes.issuerIcon} />
                      <span className={classes.issuer}>{issuer}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className={classes.paginationContainer}>
            <div className={classes.paginationInfo}>
              {t('certificates.pagination.showing_info', {
                start: startItemNum,
                end: endItemNum,
                total: filteredCertificates.length
              })}
            </div>

            <div className={classes.paginationControls}>
              <button
                className={classes.pageNavBtn}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                <span>{t('certificates.pagination.prev')}</span>
              </button>

              <div className={classes.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`${classes.pageNumberBtn} ${currentPage === pageNum ? classes.pageNumberActive : ''}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                className={classes.pageNavBtn}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                <span>{t('certificates.pagination.next')}</span>
                {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        )}
      </Container>

      {/* Lightbox Modal Preview Slider */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div 
            className={classes.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalIndex(null)}
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
                onClick={() => setModalIndex(null)}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

              {/* Counter Badge */}
              <div className={classes.modalCounterBadge}>
                {modalIndex + 1} / {filteredCertificates.length}
              </div>

              {/* Image & Slider Controls */}
              <div className={classes.modalImageWrapper}>
                {filteredCertificates.length > 1 && (
                  <button 
                    className={`${classes.sliderArrowBtn} ${classes.arrowLeft}`}
                    onClick={isRtl ? handleNextModal : handlePrevModal}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {!failedImages[activeModalCert.id] ? (
                  <img 
                    key={activeModalCert.id}
                    src={activeModalCert.image} 
                    alt={t(`certificates.items.${activeModalCert.id}.title`)} 
                    className={classes.modalImage}
                  />
                ) : (
                  <div className={classes.modalPlaceholderBox}>
                    <FileCheck size={64} className={classes.modalPlaceholderIcon} />
                    <span className={classes.modalPlaceholderTitle}>
                      {t(`certificates.items.${activeModalCert.id}.title`)}
                    </span>
                    <span className={classes.modalPlaceholderSub}>
                      {t('certificates.placeholder_badge')}
                    </span>
                  </div>
                )}

                {filteredCertificates.length > 1 && (
                  <button 
                    className={`${classes.sliderArrowBtn} ${classes.arrowRight}`}
                    onClick={isRtl ? handlePrevModal : handleNextModal}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Footer Meta */}
              <div className={classes.modalFooter}>
                <div className={classes.modalMetaRow}>
                  <span className={classes.modalYearBadge} dir="ltr">
                    {t(`certificates.items.${activeModalCert.id}.year`)}
                  </span>
                  <span className={classes.modalIssuer}>
                    {t(`certificates.items.${activeModalCert.id}.issuer`)}
                  </span>
                </div>
                <h3 className={classes.modalTitle}>
                  {t(`certificates.items.${activeModalCert.id}.title`)}
                </h3>
                {t(`certificates.items.${activeModalCert.id}.description`, { defaultValue: '' }) && (
                  <p className={classes.modalDescription}>
                    {t(`certificates.items.${activeModalCert.id}.description`)}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
