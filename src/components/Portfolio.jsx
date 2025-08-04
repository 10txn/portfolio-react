import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Send } from 'lucide-react';
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
              Turning Your{' '}
              <span className="gradient-text">Visions</span>
              <br />
              Into Reality
            </h1>
            <p className="hero-subtitle">
              I specialize in creating beatiful web designs in react and making discord bots in javascript.
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
                  Hello, I'm a young developer who creates clean and pretty web designs in React and discord bots in Javascript. 
                  I am also working on building my c++ background up with advanced imgui designs and game exploitation projects.
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
                    <p>I create beatiful modern interfaces for my web designs.</p>
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

        {/* Work */}
        <section id="work" className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Work</h2>
              <p className="section-subtitle">
                A showcase of some of my most recent projects.
              </p>
            </div>

              <div className="projects-grid">
              {[
                { title: 'E-Commerce Demo', description: 'A simple E-Commerce demo', members: '10/07/25', tech: 'React, Node.js, MongoDB', link: 'https://simple-ecommerce-ebon.vercel.app/' },
                { title: 'WinRar Activiation', description: 'A simple WinRar activation tool', members: '04/08/25', tech: 'C++', link: 'https://github.com/10txn/WinRar-Activation-Tool'},
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
                { step: '01', title: 'Step 1', description: 'Understanding what you want to be created and your requirements via a deatiled order.'},
                { step: '02', title: 'Step 2', description: 'Creating your order with the best modern pratices and optimization.' },
                { step: '03', title: 'Step 3', description: 'Final testing to ensure you are happy with the product before we send it to you.' }
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
                href="discord://-/users/559067950489927691"
                className="btn btn-primary btn-with-icon"
              >
                <Send size={20} />
                <span>Discord</span>
              </a>
              <div className="social-links">
                <a href="https://github.com/10txn" className="social-link">
                  <Github size={24} />
                </a>
                <a href="mailto:drakebouth.gsrp@gmail.com" className="social-link">
                  <Mail size={24} />
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