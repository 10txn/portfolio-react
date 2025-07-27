import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap } from 'lucide-react';
import '../Portfolio.css';

const Portfolio = () => {
  // Custom Scroll Shit To Make It Feel Smoother
  const [scrollY, setScrollY] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis (The Weird Smooth Scroll Library)
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      lenisRef.current.on('scroll', ({ scroll }) => {
        setScrollY(scroll);
      });

      function raf(time) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: 0,
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    }
  };
  

  return (
      <div className="portfolio">
        {/* Navigation Bar */}
        <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
          <div className="nav-container">
            <div className="logo">10TXN</div>
            <ul className="nav-links">
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="nav-link"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Hero */}
        <section id="home" className="hero">
          {/* Nice Paticles */}
          <div className="particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              Bringing Your{' '}
              <span className="gradient-text">Visions</span>
              <br />
              To Life
            </h1>
            <p className="hero-subtitle">
              I specialize in creating exceptional interfaces and discord applications.
            </p>
            
            <div className="button-group">
              <button 
                onClick={() => scrollToSection('work')}
                className="btn btn-primary"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn btn-secondary"
              >
                Contact Me
              </button>
            </div>

            <div className="bounce-icon">
              <ChevronDown size={24} />
            </div>
          </div>
        </section>

        {/* About Me */}
        <section id="about" className="section section-alt">
          <div className="container">
            <div className="grid-two">
              <div className="about-text">
                <h2 className="section-title">About Me</h2>
                <p className="text-lg">
                  Hello, I'm a young developer who creates clean interfaces in React and works
                  in c++ enviroments with things such as game exploitation, imgui applications
                  and bootstrappers.
                </p>
                
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number blue">3+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number purple">20+</div>
                    <div className="stat-label">Projects Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="skills-container">
                <div className="skill-card">
                  <Code size={32} color="#3b82f6" />
                  <div className="skill-content">
                    <h3>Clean Code</h3>
                    <p>I write easily maintainable and lighting fast code.</p>
                  </div>
                </div>
                
                <div className="skill-card">
                  <Palette size={32} color="#8b5cf6" />
                  <div className="skill-content">
                    <h3>Modern Design</h3>
                    <p>I create beatiful modern interfaces for my applications and web designs.</p>
                  </div>
                </div>
                
                <div className="skill-card">
                  <Zap size={32} color="#ec4899" />
                  <div className="skill-content">
                    <h3>Performance</h3>
                    <p>I optimize all solutions and websites for the fastest speed possible.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wor */}
        <section id="work" className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Work</h2>
              <p className="section-subtitle">
                A showcase of projects where I've contributed and made a difference
              </p>
            </div>

              <div className="projects-grid">
              {[
                { title: 'E-Commerce Demo', description: 'A simple E-Commerce demo', members: '10/07/25', tech: 'React, Node.js, MongoDB', link: 'https://simple-ecommerce-ebon.vercel.app/' },
                 { title: 'Password Generator', description: 'A simple but amazing password generator', members: '15/03/24', tech: 'React, Node.js', link: 'https://pass-gen-azure.vercel.app/' },
                { title: 'Roblox External', description: 'A roblox external client', members: '10/07/25', tech: 'C++', link: 'https://drive.google.com/file/d/1hx6WPFDMN_cv35855P6L2xY7TzvGQRGh/view' },
                { title: 'DLL Injector', description: 'A dll injector built with advanced protection functionality.', members: '10/07/25', tech: 'C++', link: 'https://classroom.google.com/c/NjE1OTA3MDI3ODI5' },
                { title: 'Discord Bot', description: 'An advanced discord bot with a beatiful modern interface.', members: '10/07/25', tech: 'Node.js, MongoDB', link: 'https://github.com/10txn/asl-bot' },
              ].map((project, index) => (
                <div 
                  key={index} 
                  className="project-card"
                  onClick={() => window.open(project.link, '_blank')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="project-image">
                    <ExternalLink size={32} />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <span className="project-users">{project.members}</span>
                    <span className="project-tech">{project.tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">The Process</h2>
              <p className="section-subtitle">
                Get your vision created now!
              </p>
            </div>

            <div className="process-grid">
              {[
                { step: '01', title: 'Step 1', description: 'Understanding your vision and requirements through a detailed order.' },
                { step: '02', title: 'Step 2', description: 'Creating your code with the best modern practices and optimization.' },
                { step: '03', title: 'Step 3', description: 'Final testing to ensure you are happy with the product.' }
              ].map((process, index) => (
                <div key={index} className="process-step">
                  <div className="process-number">{process.step}</div>
                  <h3 className="process-title">{process.title}</h3>
                  <p className="process-description">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <h2 className="section-title">Contact Me</h2>
            <p className="section-subtitle">More Options Coming.</p>
            <div className="contact-actions">
              <a 
                href="mailto:jackmorley.uk@gmail.com"
                className="btn btn-primary btn-with-icon"
              >
                <Mail size={20} />
                <span>Send Email</span>
              </a>
              <div className="social-links">
                <a href="https://github.com/10txn" className="social-link">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 10TXN</p>
          </div>
        </footer>
      </div>
   );
};

export default Portfolio;