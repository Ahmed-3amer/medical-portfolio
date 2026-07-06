import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'lucide-react';
import { Container } from '@/components/Container';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
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

  const renderSocialIcon = (platform) => {
    switch(platform.toLowerCase()) {
      case 'linkedin': return <Link size={20} />;
      // Add other icons here if provided later
      default: return null;
    }
  };

  const navLabel = t('footer.nav_label');

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.grid}>
          {/* Column 1: Brand */}
          <div className={classes.brandCol}>
            <div className={classes.logo}>{siteMetadata.clientName}</div>
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

          {/* Column 3: Social & Language */}
          <div className={classes.actionsCol}>
            <div className={classes.socialGroup} aria-label={t('footer.social_label')}>
              {contactInfo.socialLinks && contactInfo.socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialLink}
                  aria-label={t(social.ariaLabelKey)}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
            <LanguageSwitcher className={classes.langSwitcher} />
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
