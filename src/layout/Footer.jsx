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
    { id: 'job-description', label: t('nav.job_description') },
    { id: 'expertise', label: t('nav.expertise') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'certificates', label: t('nav.certificates') }
  ];

  const navLabel = t('footer.nav_label');

  const phoneHref = contactInfo.phones?.[0]?.href || '#contact';
  const whatsappHref = contactInfo.whatsapp?.[0]?.href || '#contact';

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.grid}>
          {/* Column 1: Brand */}
          <div className={classes.brandCol}>
            <div className={classes.logo}>
              <span className={classes.logoBadge}>B.Sc. RT</span>
              <span className={classes.logoName}>Salah Nagah</span>
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
              {/* Phone */}
              <a 
                href={phoneHref}
                className={classes.socialLink}
                aria-label={t('contact.label_phone')}
              >
                <Phone size={24} />
              </a>

              {/* Email */}
              {contactInfo.emailHref && (
                <a 
                  href={contactInfo.emailHref}
                  className={classes.socialLink}
                  aria-label={t('contact.label_email')}
                >
                  <Mail size={24} />
                </a>
              )}

              {/* WhatsApp */}
              <a 
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialLink}
                aria-label={t('contact.label_whatsapp')}
              >
                <WhatsappIcon size={24} />
              </a>

              {/* LinkedIn */}
              {contactInfo.linkedin && (
                <a 
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialLink}
                  aria-label={t('contact.label_linkedin')}
                >
                  <LinkedinIcon size={24} />
                </a>
              )}
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
