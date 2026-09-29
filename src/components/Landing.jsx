import { useEffect, useState } from 'react';
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
  { id: 'bottom', top: '84%', left: '48%', color: 'var(--gradient-pink)', scale: 0.48, wingDelay: '0.24s' },
];

const sectionButterflyPositions = [
  { top: '34%', right: '12%' },
  { top: '22%', left: '11%' },
  { top: '69%', right: '18%' },
  { top: '18%', left: '31%' },
  { top: '76%', right: '34%' },
];

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [activeSection, setActiveSection] = useState('inicio');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const labels = language === 'es'
    ? ['Inicio', 'Sobre mí', 'Stack Tecnológico', 'Experiencia', 'Proyectos', 'Contacto']
    : ['Home', 'About me', 'Tech Stack', 'Experience', 'Projects', 'Contact'];
  const sectionIds = ['inicio', 'sobre-mi', 'stack', 'experiencia', 'proyectos', 'contacto'];

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
      <header className="site-header">
        <a className="brand-mark" href="#inicio" aria-label="YCB, inicio">Y<span>C</span><b>B<i><ButterflySVG color="var(--gradient-pink)" /></i></b></a>
        <nav className="main-nav" aria-label="Navegación principal">
          {labels.map((label, index) => <a className={activeSection === sectionIds[index] ? 'active' : ''} href={`#${sectionIds[index]}`} key={label}>{label}</a>)}
        </nav>
        <div className="header-tools">
          <button className="language-toggle" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} aria-label="Cambiar idioma">{language === 'es' ? 'EN' : 'ES'}</button>
          <button className="icon-button" onClick={toggleTheme} aria-label="Cambiar modo de color">{isDarkMode ? <SunIcon /> : <MoonIcon />}</button>
          <a className="icon-button" href="https://github.com/YariCB" target="_blank" rel="noreferrer" aria-label="GitHub"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.8S18 0 15 2.1a13.4 13.4 0 0 0-6 0C6 0 4.8.8 4.8.8a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg></a>
        </div>
      </header>

      <section className="hero-content" id="inicio">
        <div className="animation-area">
          <div className="flock" aria-hidden="true">
            {flock.map((butterfly) => <ButterflySVG key={butterfly.id} className="flying-butterfly" color={butterfly.color} style={{ '--top': `${butterfly.top}%`, '--delay': `${butterfly.delay}s`, '--duration': `${butterfly.duration}s`, '--scale': butterfly.scale, '--arc': `${butterfly.arc}px`, '--loop': `${butterfly.loop}px`, '--rotation': `${butterfly.rotation}deg`, '--wing-delay': `${(butterfly.id % 5) * 0.08}s` }} />)}
          </div>
          <div className="settled-butterflies" aria-hidden="true">
            {settled.map((butterfly) => <ButterflySVG key={butterfly.id} className="settled-butterfly" color={butterfly.color} style={{ '--top': butterfly.top, '--left': butterfly.left, '--scale': butterfly.scale, '--wing-delay': butterfly.wingDelay }} />)}
          </div>
        </div>
        <div className="text-container is-visible">
          <h1 className="title-main">YariCB</h1>
          <h2 className="title-sub">{language === 'es' ? 'Lic. Yarima Contreras Blanco' : 'B.S. Yarima Contreras Blanco'}</h2>
          <p className="hero-statement">{language === 'es' ? 'Lógica y arte visual para crear experiencias digitales que se sienten' : 'Merging logic and visual art to craft digital experiences people can feel'}</p>
        </div>
        <a className="scroll-hint" href="#sobre-mi">{language === 'es' ? 'Desplázate para explorar' : 'Scroll to explore'} <span>↓</span></a>
      </section>

      {labels.slice(1).map((label, index) => <section className={`empty-section section-tone-${index + 1}`} id={sectionIds[index + 1]} key={label}><span>{String(index + 1).padStart(2, '0')}</span><h2>{label}</h2><ButterflySVG className="section-butterfly" color={['var(--gradient-blue)', 'var(--gradient-lilac)', 'var(--gradient-pink)', 'var(--gradient-periwinkle)', 'var(--gradient-lavender)'][index]} style={{ '--top': sectionButterflyPositions[index].top, '--left': sectionButterflyPositions[index].left || 'auto', '--right': sectionButterflyPositions[index].right || 'auto', '--wing-delay': `${index * 0.14}s` }} /></section>)}

      <footer className="site-footer">
        <div className="footer-signature"><a className="footer-brand" href="#inicio">YCB</a><span>Yarima Contreras Blanco</span><span>© 2026</span><a className="footer-github" href="https://github.com/YariCB" target="_blank" rel="noreferrer" aria-label="GitHub"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.8S18 0 15 2.1a13.4 13.4 0 0 0-6 0C6 0 4.8.8 4.8.8a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg></a></div>
      </footer>
    </main>
  );
}