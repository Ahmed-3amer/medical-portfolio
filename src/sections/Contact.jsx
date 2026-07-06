import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Link, MessageCircle } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { contactInfo } from '@/data/contact';
import { fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();

  // Helper to render social icons (currently only handles LinkedIn)
  const renderSocialIcon = (platform) => {
    switch(platform.toLowerCase()) {
      case 'linkedin': return <Link size={24} />;
      default: return null;
    }
  };

  return (
    <section id="contact" className={classes.contactSection}>
      <Container>
        <SectionHeader 
          titleKey="contact.title" 
          subtitleKey="contact.subtitle"
          theme="dark"
        />

        <div className={classes.layout}>
          {/* Intro Column */}
          <motion.div 
            className={classes.introColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h3 className={classes.invitationText}>{t('contact.invitation_text')}</h3>
            <p className={classes.supportingText}>
              {/* Optional supporting text could go here, for now it's just styling the invitation */}
            </p>
          </motion.div>

          {/* Cards Column */}
          <motion.address 
            className={classes.cardsColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerNormal}
          >
            {/* Phone */}
            {contactInfo.phone && (
              <motion.div variants={fadeInUp}>
                <Card variant="flat" hoverable className={classes.contactCard}>
                  <a href={contactInfo.phoneHref} className={classes.cardLink}>
                    <div className={classes.iconWrapper}>
                      <Phone size={24} />
                    </div>
                    <div className={classes.cardContent}>
                      <span className={classes.cardLabel}>{t('contact.label_phone')}</span>
                      <span className={classes.cardValue} dir="ltr">{contactInfo.phone}</span>
                    </div>
                  </a>
                </Card>
              </motion.div>
            )}

            {/* Email */}
            {contactInfo.email && (
              <motion.div variants={fadeInUp}>
                <Card variant="flat" hoverable className={classes.contactCard}>
                  <a href={contactInfo.emailHref} className={classes.cardLink}>
                    <div className={classes.iconWrapper}>
                      <Mail size={24} />
                    </div>
                    <div className={classes.cardContent}>
                      <span className={classes.cardLabel}>{t('contact.label_email')}</span>
                      <span className={classes.cardValue}>{contactInfo.email}</span>
                    </div>
                  </a>
                </Card>
              </motion.div>
            )}

            {/* WhatsApp */}
            {contactInfo.whatsapp && (
              <motion.div variants={fadeInUp}>
                <Card variant="flat" hoverable className={classes.contactCard}>
                  <a href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer" className={classes.cardLink}>
                    <div className={classes.iconWrapper}>
                      <MessageCircle size={24} />
                    </div>
                    <div className={classes.cardContent}>
                      <span className={classes.cardLabel}>{t('contact.label_whatsapp')}</span>
                      <span className={classes.cardValue} dir="ltr">{contactInfo.whatsapp}</span>
                    </div>
                  </a>
                </Card>
              </motion.div>
            )}

            {/* Location (Static) */}
            {contactInfo.locationKey && (
              <motion.div variants={fadeInUp}>
                <Card variant="flat" className={classes.contactCard}>
                  <div className={classes.cardStatic}>
                    <div className={classes.iconWrapper}>
                      <MapPin size={24} />
                    </div>
                    <div className={classes.cardContent}>
                      <span className={classes.cardLabel}>{t('contact.label_location')}</span>
                      <span className={classes.cardValue}>{t(contactInfo.locationKey)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Social Links */}
            {contactInfo.socialLinks && contactInfo.socialLinks.map((social, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card variant="flat" hoverable className={classes.contactCard}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className={classes.cardLink}>
                    <div className={classes.iconWrapper}>
                      {renderSocialIcon(social.platform)}
                    </div>
                    <div className={classes.cardContent}>
                      <span className={classes.cardLabel}>{t('contact.label_linkedin')}</span>
                      <span className={classes.cardValue}>{social.platform}</span>
                    </div>
                  </a>
                </Card>
              </motion.div>
            ))}
          </motion.address>
        </div>
      </Container>
    </section>
  );
}
