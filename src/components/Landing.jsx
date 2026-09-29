import { useEffect, useState } from 'react';
import './Landing.css';
import yariStackImage from '../assets/Yari_Stack.png';
import yariPhoto from '../assets/YariCB_Photo.jpg';
import yariArt from '../assets/YariCB_Art.png';

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

const computerTools = ['C / C++', 'Python', 'JavaScript', 'HTML5 / CSS3', 'React JS', 'Flask / Django', 'SQL Server', 'PostgreSQL', 'Pentaho Data Integration', 'Power BI'];
const designTools = ['MediBang Paint Pro', 'Krita', 'Wondershare Filmora X', 'Canva', 'Figma', 'Penpot', 'Grasshopper (Rhino)'];
const aboutImageSources = [
  { src: yariPhoto, alt: 'Yarima en un paisaje montañoso' },
  { src: yariArt, alt: 'Ilustración creada por Yarima' },
];
const experienceEntries = [
  {
    title: { es: 'Auxiliar docente', en: 'Teaching Assistant' },
    organization: { es: 'Universidad Central de Venezuela (UCV)', en: 'Central University of Venezuela (UCV)' },
    period: { es: 'Abril de 2025 - actualidad', en: 'April 2025 - present' },
    mode: { es: 'Híbrido', en: 'Hybrid' },
  },
  {
    title: { es: 'Preparadora - Matemáticas Discretas I', en: 'Teaching Assistant - Discrete Mathematics I' },
    organization: { es: 'Universidad Central de Venezuela (UCV)', en: 'Central University of Venezuela (UCV)' },
    period: { es: 'Abril de 2024 - actualidad', en: 'April 2024 - present' },
    mode: { es: 'Presencial', en: 'On-site' },
  },
  {
    title: { es: 'Ilustradora digital', en: 'Digital Illustrator' },
    organization: { es: 'Independiente', en: 'Self-employed' },
    period: { es: 'Junio de 2020 - actualidad', en: 'June 2020 - present' },
    mode: { es: 'Remoto', en: 'Remote' },
  },
  {
    title: { es: 'Desarrolladora Full Stack', en: 'Full Stack Developer' },
    organization: { es: 'Consultora TDV --> Gipsy', en: 'TDV Consulting --> Gipsy' },
    period: { es: 'Diciembre de 2024 - abril de 2026', en: 'December 2024 - April 2026' },
    mode: { es: 'Remoto', en: 'Remote' },
  },
];

const sectionButterflyPositions = [
  { top: '18%', left: '10%' },
  { top: '22%', left: '11%' },
  { top: '69%', right: '18%' },
  { top: '18%', left: '31%' },
  { top: '76%', right: '34%' },
];

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutImage, setAboutImage] = useState(0);
  const [hasStartedExperience, setHasStartedExperience] = useState(false);
  const [hasCompletedExperienceFlight, setHasCompletedExperienceFlight] = useState(false);

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

  useEffect(() => {
    const imageRotation = window.setInterval(() => {
      setAboutImage((currentImage) => (currentImage + 1) % aboutImageSources.length);
    }, 6500);
    return () => window.clearInterval(imageRotation);
  }, []);

  useEffect(() => {
    if (activeSection === 'experiencia') setHasStartedExperience(true);
  }, [activeSection]);

  const ButterflySVG = ({ color, className = '', style, onAnimationEnd }) => (
    <svg className={`butterfly ${className}`} style={style} viewBox="0 0 24 24" aria-hidden="true" onAnimationEnd={onAnimationEnd}>
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
      {isMenuOpen && <button className="menu-backdrop" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú" />}
      {/* Header */}
      <header className="site-header">
        <a className="brand-mark" href="#inicio" aria-label="YCB, inicio">Y<span>C</span><b>B<i><ButterflySVG color="var(--gradient-pink)" /></i></b></a>
        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú" aria-expanded={isMenuOpen}>
          <span /><span /><span />
        </button>
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <div className="drawer-header">
            <a className="brand-mark" href="#inicio" onClick={() => setIsMenuOpen(false)} aria-label="YCB, inicio">Y<span>C</span><b>B<i><ButterflySVG color="var(--gradient-pink)" /></i></b></a>
            <div className="drawer-tools">
              <button className="language-toggle" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} aria-label="Cambiar idioma">{language === 'es' ? 'EN' : 'ES'}</button>
              <button className="icon-button" onClick={toggleTheme} aria-label="Cambiar modo de color">{isDarkMode ? <SunIcon /> : <MoonIcon />}</button>
            </div>
          </div>
          {labels.map((label, index) => <a onClick={() => setIsMenuOpen(false)} className={activeSection === sectionIds[index] ? 'active' : ''} href={`#${sectionIds[index]}`} key={label}>{label}</a>)}
          <div className="drawer-footer">
            <span>Yarima Contreras Blanco</span>
            <span>© 2026</span>
            <a href="https://github.com/YariCB" target="_blank" rel="noreferrer" aria-label="GitHub"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.8S18 0 15 2.1a13.4 13.4 0 0 0-6 0C6 0 4.8.8 4.8.8a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg></a>
          </div>
        </nav>
        <div className="header-tools">
          <button className="language-toggle" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} aria-label="Cambiar idioma">{language === 'es' ? 'EN' : 'ES'}</button>
          <button className="icon-button" onClick={toggleTheme} aria-label="Cambiar modo de color">{isDarkMode ? <SunIcon /> : <MoonIcon />}</button>
          <a className="icon-button" href="https://github.com/YariCB" target="_blank" rel="noreferrer" aria-label="GitHub"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.8S18 0 15 2.1a13.4 13.4 0 0 0-6 0C6 0 4.8.8 4.8.8a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg></a>
        </div>
      </header>

      {/* Home */}
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

      {/* About me */}
      {labels.slice(1).map((label, index) => {
        const sectionId = sectionIds[index + 1];
        const isStack = sectionId === 'stack';
        const isAbout = sectionId === 'sobre-mi';
        const isExperience = sectionId === 'experiencia';
        return (
          <section className={`empty-section section-tone-${index + 1} ${isStack ? 'stack-section' : ''} ${isAbout ? 'about-section' : ''} ${isExperience ? `experience-section ${hasStartedExperience ? 'experience-visible' : ''}` : ''}`} id={sectionId} key={label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {isAbout ? (
              <div className="about-layout">
                <div className="about-visual">
                  <div className="about-card-shadow" aria-hidden="true" />
                  <div className="about-photo-card">
                    <ButterflySVG className="about-butterfly" color="var(--gradient-lilac)" />
                    <div className="about-image-frame">
                      {aboutImageSources.map((image, imageIndex) => <img className={`about-image ${aboutImage === imageIndex ? 'is-active' : ''}`} src={image.src} alt={image.alt} key={image.src} />)}
                    </div>
                    <div className="about-flowers" aria-hidden="true">
                      <span className="flower flower-one" /><span className="flower flower-two" /><span className="flower flower-three" />
                    </div>
                    <div className="about-dots" role="group" aria-label={language === 'es' ? 'Cambiar imagen' : 'Change image'}>
                      {aboutImageSources.map((image, imageIndex) => <button className={aboutImage === imageIndex ? 'is-active' : ''} onClick={() => setAboutImage(imageIndex)} aria-label={`${language === 'es' ? 'Ver imagen' : 'View image'} ${imageIndex + 1}`} aria-pressed={aboutImage === imageIndex} key={image.src} />)}
                    </div>
                  </div>
                </div>
                <div className="about-copy">
                  <p className="about-eyebrow">{language === 'es' ? 'Sobre mí' : 'About me'}</p>
                  <h2>{language === 'es' ? 'Tecnología con sensibilidad creativa.' : 'Technology with a creative sensibility.'}</h2>
                  <p>{language === 'es' ? 'Soy Licenciada en Computación y artista de corazón. Me interesa crear experiencias digitales visualmente atractivas, funcionales y llenas de intención.' : 'I am a Computer Science graduate and an artist at heart. I enjoy creating visually engaging, functional digital experiences.'}</p>
                  <p>{language === 'es' ? 'También me apasiona descubrir historias en los datos, desde su procesamiento hasta su análisis, y compartir lo que aprendo con nuevas generaciones.' : 'I am also passionate about finding stories in data, from processing to analysis, and sharing what I learn with the next generation.'}</p>
                  <div className="about-highlights">
                    <div><span className="highlight-icon">✦</span><p><strong>{language === 'es' ? 'Preparadora de Matemáticas Discretas I' : 'Teaching Assistant, Discrete Mathematics I'}</strong><small>{language === 'es' ? 'Escuela de Computación UCV.' : 'UCV School of Computing.'}</small><small>{language === 'es' ? 'Desde abril de 2024' : 'Since April 2024'}</small></p></div>
                    <div><span className="highlight-icon">✎</span><p><strong>{language === 'es' ? 'Ilustradora digital independiente' : 'Independent digital illustrator'}</strong><small>{language === 'es' ? 'Desde junio de 2020' : 'Since June 2020'}</small></p></div>
                  </div>
                </div>
              </div>
            ) : isStack ? (
              <>
                <h2>{label}</h2>
              <div className="stack-layout">
                <div className="tool-column">
                  <h3>{language === 'es' ? 'Computación' : 'Computing'}</h3>
                  <div className="tool-list">{computerTools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
                <div className="tool-column design-column">
                  <h3>{language === 'es' ? 'Ilustración y Diseño' : 'Illustration and Design'}</h3>
                  <div className="tool-list">{designTools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
              </div>
              </>
            ) : isExperience ? (
              <>
                <h2>{label}</h2>
                <div className="experience-timeline">
                  {experienceEntries.map((entry) => <article className="experience-card" key={entry.title.en}>
                    <span className="experience-card-icon" aria-hidden="true">✦</span>
                    <div><h3>{entry.title[language]}</h3><p>{entry.organization[language]}</p><small>{entry.period[language]}</small><small>{entry.mode[language]}</small></div>
                  </article>)}
                </div>
                <ButterflySVG className={`section-butterfly experience-butterfly ${hasCompletedExperienceFlight ? 'experience-flight-complete' : ''}`} color="var(--gradient-pink)" style={{ '--wing-delay': '0.28s' }} onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget) setHasCompletedExperienceFlight(true);
                }} />
              </>
            ) : <><h2>{label}</h2><ButterflySVG className="section-butterfly" color={['var(--gradient-blue)', 'var(--gradient-lilac)', 'var(--gradient-pink)', 'var(--gradient-periwinkle)', 'var(--gradient-lavender)'][index]} style={{ '--top': sectionButterflyPositions[index].top, '--left': sectionButterflyPositions[index].left || 'auto', '--right': sectionButterflyPositions[index].right || 'auto', '--wing-delay': `${index * 0.14}s` }} /></>}
            {isStack && <><ButterflySVG className="stack-butterfly" color="var(--gradient-lilac)" style={{ '--wing-delay': '0.18s' }} /><img className="stack-illustration" src={yariStackImage} alt="Ilustración de Yari relacionada con el stack tecnológico" /></>}
          </section>
        );
      })}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-signature"><a className="footer-brand" href="#inicio">YCB</a><span>Yarima Contreras Blanco</span><span>© 2026</span><a className="footer-github" href="https://github.com/YariCB" target="_blank" rel="noreferrer" aria-label="GitHub"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.8S18 0 15 2.1a13.4 13.4 0 0 0-6 0C6 0 4.8.8 4.8.8a5 5 0 0 0-.1 3.2A5.4 5.4 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg></a></div>
      </footer>
    </main>
  );
}