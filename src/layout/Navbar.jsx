import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Container } from '@/components/Container';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/Button';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { siteMetadata } from '@/data/siteMetadata';
import classes from './Navbar.module.css';

// IDs of sections to track for active link highlighting
const SECTION_IDS = ['hero', 'about', 'expertise', 'experience', 'certificates', 'contact'];

export function Navbar() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(50);
  const activeSection = useActiveSection(SECTION_IDS);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Trap focus within mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'about', label: t('nav.about') },
    { id: 'expertise', label: t('nav.expertise') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'certificates', label: t('nav.certificates') }
  ];

  return (
    <header className={cn(classes.header, isScrolled && classes.scrolled)}>
      <Container className={classes.navContainer}>
        
        {/* NavLogo */}
        <div className={classes.logo}>
          <a href="#hero" onClick={closeMenu} aria-label={siteMetadata.clientName}>
            <span className={classes.logoBadge}>Dr.</span>
            <span className={classes.logoName}>Salah</span>
            <svg 
              className={classes.logoPulse} 
              viewBox="0 0 44 24" 
              fill="none"
            >
              {/* Rounded Rectangle Scanner Frame */}
              <rect 
                x="1.5" 
                y="1.5" 
                width="41" 
                height="21" 
                rx="5" 
                ry="5" 
                className={classes.scanRect}
                strokeWidth="1.5" 
              />
              {/* Gliding Scanner Beam */}
              <line 
                x1="3.5" 
                y1="12" 
                x2="40.5" 
                y2="12" 
                className={classes.scanBeam}
                strokeWidth="2" 
                strokeLinecap="round"
              />
              {/* Flowing Wave (appears when beam is in center) */}
              <path 
                d="M 3.5,12 H 12 C 17,5 19,5 22,12 C 25,19 27,19 32,12 H 40.5" 
                className={classes.pulseFlow}
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Desktop NavLinks */}
        <nav className={classes.desktopNav} aria-label={t('aria.nav_main')}>
          <ul className={classes.linkList}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={cn(classes.link, activeSection === link.id && classes.activeLink)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className={classes.actions}>
          <LanguageSwitcher className={classes.langSwitch} />
          <Button variant="primary" className={classes.ctaButton}>
            <a href="#contact" className={classes.ctaLink}>{t('nav.cta')}</a>
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button
            className={classes.mobileToggle}
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? t('aria.menu_close') : t('aria.menu_open')}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(classes.mobileMenu, isMobileMenuOpen && classes.mobileMenuOpen)}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav aria-label={t('aria.nav_mobile')}>
          <ul className={classes.mobileLinkList}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={cn(classes.mobileLink, activeSection === link.id && classes.activeMobileLink)}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className={classes.mobileActionItem}>
              <a href="#contact" className={classes.mobileCtaLink} onClick={closeMenu}>
                {t('nav.cta')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
