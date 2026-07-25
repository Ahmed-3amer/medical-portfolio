import React from 'react';

/**
 * Clean, Crisp SVG Flag for Egypt 🇪🇬
 * Featuring the official Golden Eagle of Saladin emblem scaled strictly within the white stripe
 */
export function EgyptFlag({ className, size = 24 }) {
  const height = Math.round(size * 0.67);
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 36 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: '3px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', flexShrink: 0 }}
      aria-label="Egypt Flag"
    >
      {/* Top Red Stripe */}
      <rect width="36" height="8" fill="#CE1126" />
      {/* Middle White Stripe */}
      <rect y="8" width="36" height="8" fill="#FFFFFF" />
      {/* Bottom Black Stripe */}
      <rect y="16" width="36" height="8" fill="#000000" />

      {/* Official Eagle of Saladin Emblem (Scaled strictly inside the white stripe) */}
      <g transform="translate(18, 12) scale(0.52)">
        {/* Head & Neck facing left */}
        <path d="M 0 -5.5 L -1.2 -5.5 C -2.2 -5.5 -2.6 -4.8 -2.6 -4.0 C -2.6 -3.4 -3.4 -3.4 -3.8 -3.6 C -3.8 -3.0 -3.0 -2.5 -2.0 -2.5 L -1.5 -1.5 L 0.5 -1.5 L 0.8 -5.5 Z" fill="#C09300" />
        
        {/* Left Wing (Feathers) */}
        <path d="M -1.5 -1.5 L -5.5 -1.5 L -5.5 4.5 C -5.5 5.2 -4.8 5.5 -4.0 5.5 L -1.5 5.5 Z" fill="#C09300" />
        <line x1="-2.5" y1="-1" x2="-2.5" y2="5" stroke="#FFFFFF" strokeWidth="0.35" />
        <line x1="-3.5" y1="-1" x2="-3.5" y2="5" stroke="#FFFFFF" strokeWidth="0.35" />
        <line x1="-4.5" y1="-1" x2="-4.5" y2="4.8" stroke="#FFFFFF" strokeWidth="0.35" />

        {/* Right Wing (Feathers) */}
        <path d="M 1.5 -1.5 L 5.5 -1.5 L 5.5 4.5 C 5.5 5.2 4.8 5.5 4.0 5.5 L 1.5 5.5 Z" fill="#C09300" />
        <line x1="2.5" y1="-1" x2="2.5" y2="5" stroke="#FFFFFF" strokeWidth="0.35" />
        <line x1="3.5" y1="-1" x2="3.5" y2="5" stroke="#FFFFFF" strokeWidth="0.35" />
        <line x1="4.5" y1="-1" x2="4.5" y2="4.8" stroke="#FFFFFF" strokeWidth="0.35" />

        {/* Center Shield */}
        <rect x="-2.0" y="-1.8" width="4.0" height="6.2" rx="0.3" fill="#C09300" />
        <rect x="-1.5" y="-1.4" width="3.0" height="5.4" fill="#FFFFFF" />
        <rect x="-1.3" y="-1.2" width="0.8" height="5.0" fill="#CE1126" />
        <rect x="-0.4" y="-1.2" width="0.8" height="5.0" fill="#FFFFFF" />
        <rect x="0.5" y="-1.2" width="0.8" height="5.0" fill="#000000" />

        {/* Scroll Base */}
        <path d="M -5.0 5.5 L 5.0 5.5 L 4.5 7.0 L -4.5 7.0 Z" fill="#C09300" />
      </g>
    </svg>
  );
}

/**
 * Clean, Crisp SVG Flag for Iraq 🇮🇶
 * Featuring the official Kufic Calligraphy "الله أكبر"
 */
export function IraqFlag({ className, size = 24 }) {
  const height = Math.round(size * 0.67);
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 36 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: '3px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', flexShrink: 0 }}
      aria-label="Iraq Flag"
    >
      {/* Top Red Stripe */}
      <rect width="36" height="8" fill="#CE1126" />
      {/* Middle White Stripe */}
      <rect y="8" width="36" height="8" fill="#FFFFFF" />
      {/* Bottom Black Stripe */}
      <rect y="16" width="36" height="8" fill="#000000" />

      {/* Kufic Calligraphy "الله أكبر" */}
      <text 
        x="18" 
        y="13.6" 
        fill="#007A3D" 
        fontSize="4.8" 
        fontWeight="800" 
        fontFamily="'Tahoma', 'Arial', sans-serif"
        textAnchor="middle" 
        letterSpacing="0.3px"
      >
        الله أكبر
      </text>
    </svg>
  );
}
