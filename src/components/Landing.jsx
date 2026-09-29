import { useState } from 'react';
import './Landing.css';

const flock = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  top: 13 + ((index * 19) % 72),
  delay: (index % 10) * 0.13,
  duration: 4.5 + (index % 5) * 0.22,
  scale: 0.55 + (index % 4) * 0.12,
  arc: -58 + (index % 7) * 19,
  loop: 18 + (index % 6) * 8,
  rotation: -16 + (index % 7) * 5,
  color: ['var(--gradient-blue)', 'var(--gradient-lilac)', 'var(--gradient-periwinkle)', 'var(--gradient-pink)', 'var(--gradient-lavender)'][index % 5],
}));

const settled = [
  { id: 'left', top: '34%', left: '24%', color: 'var(--gradient-blue)', scale: 0.68, wingDelay: '0s' },
  { id: 'right', top: '63%', left: '76%', color: 'var(--gradient-periwinkle)', scale: 0.58, wingDelay: '0.12s' },
  { id: 'bottom', top: '74%', left: '48%', color: 'var(--gradient-pink)', scale: 0.48, wingDelay: '0.24s' },
];

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const ButterflySVG = ({ color, className = '', style }) => (
    <svg className={`butterfly ${className}`} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <g className="wing wing-left">
        <path d="M11.7 10.6C9.1 6.1 4.1 3.6 2.3 6.5c-1.3 2.1.7 5.8 4.9 7.1-3.3.4-5.9 2.2-5.3 4.4.7 2.4 5.2 2.2 8.9-1.2l1.6-1.7c-.2-1.6-.3-3-.7-4.5Z" fill={color} stroke="currentColor" strokeOpacity=".22" strokeWidth=".35" />
      </g>
      <g className="wing wing-right">
        <path d="M12.3 10.6c2.6-4.5 7.6-7 9.4-4.1 1.3 2.1-.7 5.8-4.9 7.1 3.3.4 5.9 2.2 5.3 4.4-.7 2.4-5.2 2.2-8.9-1.2l-1.6-1.7c.2-1.6.3-3 .7-4.5Z" fill={color} stroke="currentColor" strokeOpacity=".22" strokeWidth=".35" />
      </g>
      <path d="M12 9.2c-1.1 2.5-1.2 6.1 0 9.1 1.2-3 1.1-6.6 0-9.1ZM11.7 8.7C10.6 6.2 9.2 5.3 8.2 4.9m4.1 3.8c1.1-2.5 2.5-3.4 3.5-3.8" fill="none" stroke="currentColor" strokeWidth=".55" strokeLinecap="round" />
      <path d="M12 18.3v3.4" fill="none" stroke="currentColor" strokeWidth=".6" strokeLinecap="round" />
    </svg>
  );

  const MoonIcon = () => (
    <span className="animated-theme-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
    </span>
  );

  const SunIcon = () => (
    <span className="animated-theme-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        {['M12 2v2', 'm19.07 4.93-1.41 1.41', 'M20 12h2', 'm17.66 17.66 1.41 1.41', 'M12 20v2', 'm6.34 17.66-1.41 1.41', 'M2 12h2', 'm4.93 4.93 1.41 1.41'].map((path) => <path d={path} key={path} />)}
      </svg>
    </span>
  );

  return (
    <main className={`landing-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar modo de color">
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
        {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
      </button>

      <div className="animation-area">
        <div className="flock" aria-hidden="true">
          {flock.map((butterfly) => (
            <ButterflySVG
              key={butterfly.id}
              className="flying-butterfly"
              color={butterfly.color}
              style={{ '--top': `${butterfly.top}%`, '--delay': `${butterfly.delay}s`, '--duration': `${butterfly.duration}s`, '--scale': butterfly.scale, '--arc': `${butterfly.arc}px`, '--loop': `${butterfly.loop}px`, '--rotation': `${butterfly.rotation}deg`, '--wing-delay': `${(butterfly.id % 5) * 0.08}s` }}
            />
          ))}
        </div>
        <div className="settled-butterflies" aria-hidden="true">
          {settled.map((butterfly) => (
            <ButterflySVG key={butterfly.id} className="settled-butterfly" color={butterfly.color} style={{ '--top': butterfly.top, '--left': butterfly.left, '--scale': butterfly.scale, '--wing-delay': butterfly.wingDelay }} />
          ))}
        </div>
      </div>

      <div className="text-container is-visible">
        <h1 className="title-main">YariCB</h1>
        <h2 className="title-sub">Lic. Yarima Contreras Blanco</h2>
      </div>
    </main>
  );
}