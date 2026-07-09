import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail } from 'lucide-react';
import { LinkedinIcon } from '@/components/LinkedinIcon';
import { WhatsappIcon } from '@/components/WhatsappIcon';
import { Container } from '@/components/Container';
import { siteMetadata } from '@/data/siteMetadata';
import { contactInfo } from '@/data/contact';
import classes from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { id: 'about', label: t('nav.about') },
    { id: 'expertise', label: t('nav.expertise') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'certificates', label: t('nav.certificates') }
  ];

  const navLabel = t('footer.nav_label');

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.grid}>
          {/* Column 1: Brand */}
          <div className={classes.brandCol}>
            <div className={classes.logo}>
              <span className={classes.logoBadge}>Dr.</span>
              <span className={classes.logoName}>Salah</span>
            </div>
            <p className={classes.tagline}>{t('footer.tagline')}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={classes.linksCol}>
            {navLabel && <h3 className={classes.columnHeader}>{navLabel}</h3>}
            <ul className={classes.linkList}>
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={classes.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social Links */}
          <div className={classes.actionsCol}>
            <h3 className={classes.columnHeader}>{t('footer.social_label')}</h3>
            <div className={classes.socialGroup} aria-label={t('footer.social_label')}>
              {contactInfo.phone && (
                <a 
                  href={contactInfo.phoneHref}
                  className={classes.socialLink}
                  aria-label={t('contact.label_phone')}
                >
                  <Phone size={24} />
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={contactInfo.emailHref}
                  className={classes.socialLink}
                  aria-label={t('contact.label_email')}
                >
                  <Mail size={24} />
                </a>
              )}
              {contactInfo.whatsapp && (
                <a 
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialLink}
                  aria-label={t('contact.label_whatsapp')}
                >
                  <WhatsappIcon size={24} />
                </a>
              )}
              {contactInfo.socialLinks && contactInfo.socialLinks.map((social, index) => {
                if (social.platform.toLowerCase() === 'linkedin') {
                  return (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.socialLink}
                      aria-label={t(social.ariaLabelKey)}
                    >
                      <LinkedinIcon size={24} />
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        <hr className={classes.divider} />

        <div className={classes.bottomBar}>
          <p className={classes.copyright}>
            &copy; {currentYear} {siteMetadata.copyrightName}. {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
