import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Building2, 
  Calendar, 
  Maximize2, 
  X, 
  FileCheck
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { certificateItems } from '@/data/certificates';
import { fadeInUp, staggerContainerMedium } from '@/utils/animations';
import classes from './Certificates.module.css';

export default function Certificates() {
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (certId) => {
    setFailedImages((prev) => ({ ...prev, [certId]: true }));
  };

  // Handle ESC key and scroll lock for Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };

    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="certificates" className={classes.certificatesSection}>
      <Container>
        <SectionHeader 
          titleKey="certificates.title" 
          subtitleKey="certificates.subtitle" 
          alignment="center"
          className={classes.header}
        />

        <motion.div 
          className={classes.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerMedium}
        >
          {certificateItems.map((cert) => {
            const title = t(`certificates.items.${cert.id}.title`);
            const issuer = t(`certificates.items.${cert.id}.issuer`);
            const year = t(`certificates.items.${cert.id}.year`);
            const description = t(`certificates.items.${cert.id}.description`);
            const hasImageFailed = failedImages[cert.id];

            return (
              <motion.div key={cert.id} variants={fadeInUp} className={classes.cardWrapper}>
                <div 
                  className={classes.certCard}
                  onClick={() => setSelectedCert(cert)}
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
      </Container>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className={classes.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
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
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className={classes.modalImageWrapper}>
                {!failedImages[selectedCert.id] ? (
                  <img 
                    src={selectedCert.image} 
                    alt={t(`certificates.items.${selectedCert.id}.title`)} 
                    className={classes.modalImage}
                  />
                ) : (
                  <div className={classes.modalPlaceholderBox}>
                    <FileCheck size={64} className={classes.modalPlaceholderIcon} />
                    <span className={classes.modalPlaceholderTitle}>
                      {t(`certificates.items.${selectedCert.id}.title`)}
                    </span>
                    <span className={classes.modalPlaceholderSub}>
                      {t('certificates.placeholder_badge')}
                    </span>
                  </div>
                )}
              </div>

              <div className={classes.modalFooter}>
                <div className={classes.modalMetaRow}>
                  <span className={classes.modalYearBadge} dir="ltr">
                    {t(`certificates.items.${selectedCert.id}.year`)}
                  </span>
                  <span className={classes.modalIssuer}>
                    {t(`certificates.items.${selectedCert.id}.issuer`)}
                  </span>
                </div>
                <h3 className={classes.modalTitle}>
                  {t(`certificates.items.${selectedCert.id}.title`)}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
