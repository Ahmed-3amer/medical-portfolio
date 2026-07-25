import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { LinkedinIcon } from '@/components/LinkedinIcon';
import { WhatsappIcon } from '@/components/WhatsappIcon';
import { EgyptFlag, IraqFlag } from '@/components/CountryFlags';
import { contactInfo } from '@/data/contact';
import { fadeInUp, staggerContainerNormal } from '@/utils/animations';
import classes from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();

  const renderFlag = (countryKey) => {
    if (countryKey?.includes('egypt')) return <EgyptFlag size={24} />;
    if (countryKey?.includes('iraq')) return <IraqFlag size={24} />;
    return null;
  };

  return (
    <section id="contact" className={classes.contactSection}>
      <Container>
        <SectionHeader 
          titleKey="contact.title" 
          subtitleKey="contact.subtitle"
          theme="dark"
          alignment="center"
          className={classes.header}
        />

        <motion.div 
          className={classes.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerNormal}
        >
          {/* Card 1: Phone Calls */}
          <motion.div variants={fadeInUp} className={classes.cardWrapper}>
            <div className={classes.contactCard}>
              <div className={classes.cardHeader}>
                <div className={classes.iconWrapper}>
                  <Phone size={22} className={classes.cardIcon} />
                </div>
                <h3 className={classes.cardLabel}>{t('contact.label_phone')}</h3>
              </div>

              <div className={classes.numbersList}>
                {contactInfo.phones.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href} 
                    className={classes.numberRow}
                    aria-label={`${t(item.countryKey)} ${item.number}`}
                  >
                    <span className={classes.flagWrapper} title={t(item.countryKey)}>
                      {renderFlag(item.countryKey)}
                    </span>
                    <span className={classes.countryName}>
                      {t(item.countryKey)}:
                    </span>
                    <span className={classes.phoneNumber} dir="ltr">
                      {item.number}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: WhatsApp */}
          <motion.div variants={fadeInUp} className={classes.cardWrapper}>
            <div className={classes.contactCard}>
              <div className={classes.cardHeader}>
                <div className={classes.iconWrapper}>
                  <WhatsappIcon size={22} className={classes.cardIcon} />
                </div>
                <h3 className={classes.cardLabel}>{t('contact.label_whatsapp')}</h3>
              </div>

              <div className={classes.numbersList}>
                {contactInfo.whatsapp.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={classes.numberRow}
                    aria-label={`WhatsApp ${t(item.countryKey)} ${item.number}`}
                  >
                    <span className={classes.flagWrapper} title={t(item.countryKey)}>
                      {renderFlag(item.countryKey)}
                    </span>
                    <span className={classes.countryName}>
                      {t(item.countryKey)}:
                    </span>
                    <span className={classes.phoneNumber} dir="ltr">
                      {item.number}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Email */}
          <motion.div variants={fadeInUp} className={classes.cardWrapper}>
            <div className={classes.contactCard}>
              <div className={classes.cardHeader}>
                <div className={classes.iconWrapper}>
                  <Mail size={22} className={classes.cardIcon} />
                </div>
                <h3 className={classes.cardLabel}>{t('contact.label_email')}</h3>
              </div>

              <div className={classes.singleLinkWrapper}>
                <a 
                  href={contactInfo.emailHref} 
                  className={classes.singleLink}
                  aria-label={contactInfo.email}
                >
                  <span className={classes.linkText}>{contactInfo.email}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 4: LinkedIn */}
          <motion.div variants={fadeInUp} className={classes.cardWrapper}>
            <div className={classes.contactCard}>
              <div className={classes.cardHeader}>
                <div className={classes.iconWrapper}>
                  <LinkedinIcon size={22} className={classes.cardIcon} />
                </div>
                <h3 className={classes.cardLabel}>{t('contact.label_linkedin')}</h3>
              </div>

              <div className={classes.singleLinkWrapper}>
                <a 
                  href={contactInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={classes.singleLink}
                  aria-label="LinkedIn Profile"
                >
                  <span className={classes.linkText}>{contactInfo.linkedinDisplay}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
