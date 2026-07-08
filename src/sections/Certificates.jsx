import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { certificateItems } from '@/data/certificates';
import { fadeInUp, staggerContainerMedium } from '@/utils/animations';
import classes from './Certificates.module.css';

export default function Certificates() {
  const { t } = useTranslation();

  return (
    <section id="certificates" className={classes.certificatesSection}>
      <Container>
        <SectionHeader 
          titleKey="certificates.title" 
          subtitleKey="certificates.subtitle" 
          theme="dark"
        />

        <motion.div 
          className={classes.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerMedium}
        >
          {certificateItems.map((cert) => (
            <motion.div key={cert.id} variants={fadeInUp} className={classes.cardWrapper}>
              <Card variant="default" hoverable className={classes.certCard}>
                <div className={classes.imageWrapper}>
                  <img 
                    src={cert.image} 
                    alt={t(cert.titleKey, cert.titleKey)} 
                    loading="lazy"
                    className={classes.image}
                  />
                </div>
                <div className={classes.content}>
                  <span className={classes.year} dir="ltr">{cert.year}</span>
                  <h3 className={classes.title}>{t(cert.titleKey, cert.titleKey)}</h3>
                  <p className={classes.issuer}>{t(cert.issuerKey, cert.issuerKey)}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
