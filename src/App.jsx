import React, { useState, useEffect } from 'react'
import Background3D from './components/Background3D'
import Loader from './components/Loader'
import SectionHeader from './components/SectionHeader'
import ProjectCard from './components/ProjectCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Code, Palette, Globe, Layers, Cpu, Cloud, ShoppingCart, Diamond, Sparkles, MessageSquare, Menu, X } from 'lucide-react'

import logo from './assets/logo.jpg'
import profilePic from './assets/yo.jpeg'
import sakuraImg from './assets/sakura.jpeg'
import benchmarkImg from './assets/Captura de pantalla_7-5-2026_22540_station-lptsgamer.vercel.app.jpeg'
import iamidImg from './assets/iamid.png'
import nexonImg from './assets/nexon.png'
import nexadminImg from './assets/nexadmin.png'

function App() {
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, success, error
  const [navVisible, setNavVisible] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 50) {
        setNavScrolled(true)
      } else {
        setNavScrolled(false)
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("jmfiguera90@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // Aquí pegarás tu ID de Formspree después
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mjgaylbp", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="app">
      <AnimatePresence>
        {loading && <Loader onFinished={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Background3D />

          <nav className={`nav-container ${navScrolled ? 'scrolled' : ''} ${navVisible ? 'visible' : 'hidden'}`}>
            <div className="nav-inner">
              <div className="nav-logo" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="Logo" style={{ height: '60px', width: '60px', borderRadius: '50%', border: '2px solid var(--accent-color)', objectFit: 'cover' }} />
              </div>

              <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X color="var(--accent-color)" size={30} /> : <Menu color="var(--accent-color)" size={30} />}
              </div>

              <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>Sobre Mí</a>
                <a href="#methodology" className="nav-link" onClick={() => setMenuOpen(false)}>Método</a>
                <a href="#services" className="nav-link" onClick={() => setMenuOpen(false)}>Servicios</a>
                <a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Trabajos</a>
                <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contacto</a>
              </div>
            </div>
          </nav>

          <main>
            <section className="hero-section" id="home">
              <motion.span
                className="hero-subtitle"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontWeight: '500', color: 'var(--accent-color)' }}
              >
                E-commerce, Aplicaciones Escalables & Soluciones con Supabase
              </motion.span>
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: 1,
                  y: -12
                }}
                transition={{
                  opacity: { delay: 0.8, duration: 1.2 },
                  y: {
                    delay: 1,
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }
                }}
                style={{
                  fontWeight: '900',
                  letterSpacing: '-0.1rem',
                  willChange: 'transform'
                }}
              >
                JF | Frontend Engineer <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFF3D1 0%, #E5B23E 50%, #B8860B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  paddingBottom: '0.15em',
                  marginBottom: '-0.15em'
                }}>& Product Designer</span>
              </motion.h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ margin: '6rem 0 4rem' }}
              >
                <button className="btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>Ver Proyectos</button>
              </motion.div>

              <motion.div
                style={{ display: 'flex', gap: '2rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="social-link"><Github size={20} /></div>
                <div className="social-link"><Mail size={20} /></div>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', bottom: '4rem' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown color="var(--accent-color)" size={24} />
              </motion.div>
            </section>

            <section id="about" className="section-container">
              <SectionHeader title="Sobre Mí" subtitle="Mi Trayectoria" />
              <div className="responsive-grid about-grid">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                    Soy Técnico Superior en Informática especializado en el desarrollo ágil de plataformas digitales. Mi enfoque combina la arquitectura técnica con un flujo de trabajo optimizado mediante IA para entregar productos de alto impacto en tiempos reducidos. Me apasiona fusionar la estética visual con soluciones robustas y escalables.
                  </p>
                  <div className="responsive-grid grid-2" style={{ gap: '1.5rem' }}>
                    <div className="skill-item">
                      <Code color="var(--accent-color)" size={32} style={{ marginBottom: '1rem' }} />
                      <h4 style={{ marginBottom: '0.5rem' }}>Full Stack Focus</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Implementación con Antigravity y gestión de datos relacionales en Supabase.</p>
                    </div>
                    <div className="skill-item">
                      <Palette color="var(--accent-color)" size={32} style={{ marginBottom: '1rem' }} />
                      <h4 style={{ marginBottom: '0.5rem' }}>Product Design</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Interfaces de alta fidelidad creadas en Stitch y optimizadas para UX.</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="profile-image-container" style={{ height: '420px' }}>
                    <img src={profilePic} alt="Jesus Figuera" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '1px solid var(--accent-color)', opacity: 0.3, pointerEvents: 'none' }}></div>
                  </div>
                  <p className="image-caption">
                    Imagen conceptual generada mediante IA para representar mi enfoque tecnológico
                  </p>
                </motion.div>
              </div>
            </section>

            <section id="methodology" className="section-container">
              <SectionHeader title="Mi Metodología" subtitle="Flujo de trabajo optimizado" />
              <div className="responsive-grid grid-3">
                <motion.div
                  className="skill-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    rotateX: 12,
                    rotateY: 12,
                    z: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Layers className="icon-pulse" color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Diseño & UX</h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>Herramienta: Stitch</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Arquitectura visual y maquetación de interfaces de alta fidelidad, priorizando siempre la experiencia del usuario y la conversión.
                  </p>
                </motion.div>

                <motion.div
                  className="skill-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{
                    rotateX: -12,
                    rotateY: 12,
                    z: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Cpu className="icon-glow" color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Inteligencia Artificial</h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>Herramienta: Google AI Studio</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Optimización de la lógica y prototipado rápido mediante modelos de IA para acelerar el ciclo de desarrollo y resolver problemas complejos.
                  </p>
                </motion.div>

                <motion.div
                  className="skill-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{
                    rotateX: 12,
                    rotateY: -12,
                    z: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Cloud className="icon-float" color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Desarrollo & Cloud</h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>Herramientas: Antigravity & Supabase</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Construcción de aplicaciones robustas con gestión de datos escalable, autenticación segura y despliegue continuo en la nube.
                  </p>
                </motion.div>
              </div>
            </section>

            <section id="services" className="section-container">
              <SectionHeader title="Mis Servicios" subtitle="Soluciones digitales de alto impacto" />
              <div className="responsive-grid grid-3">
                <motion.div
                  className="skill-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    rotateX: 12,
                    rotateY: 12,
                    z: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <ShoppingCart className="icon-pulse" color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>E-commerce & Web Apps</h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>Soluciones Escalables</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Desarrollo de tiendas online y aplicaciones web robustas con gestión de datos en tiempo real y arquitecturas preparadas para el crecimiento.
                  </p>
                </motion.div>

                <motion.div
                  className="skill-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{
                    rotateX: -12,
                    rotateY: 12,
                    z: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Diamond className="icon-float" color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Landings & Portafolios</h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>Presencia Digital & Branding</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Creación de portafolios personales, menús digitales dinámicos para restaurantes y sitios corporativos elegantes, diseñados para proyectar una imagen profesional y captar clientes desde el primer clic.
                  </p>
                </motion.div>

                <motion.div
                  className="skill-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{
                    rotateX: 12,
                    rotateY: -12,
                    z: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Sparkles className="icon-glow" color="var(--accent-color)" size={40} style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Optimización con IA</h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>Consultoría Tecnológica</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Integración de herramientas de Inteligencia Artificial para automatizar tareas, mejorar la atención al cliente o potenciar flujos de trabajo existentes.
                  </p>
                </motion.div>
              </div>
            </section>

            <section id="projects" style={{ padding: '8rem 2rem', background: 'rgba(0, 0, 0, 0.4)' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <SectionHeader title="Proyectos" subtitle="Mis Trabajos" />
                <div className="projects-grid">
                  <ProjectCard
                    title="I AM ID - Landing Page"
                    tags={['Frontend Development', 'React', 'EmailJS', 'Vercel Deploy']}
                    description="Estudio boutique digital especializado en la creación de identidades gráficas y páginas web. Diseño de marca, branding corporativo y presencia digital de alto impacto."
                    image={iamidImg}
                    link="https://www.aimidagency.com/"
                    featured />
                  <ProjectCard
                    title="NexAdmin – Business Management Platform"
                    tags={['SaaS', 'React', 'Supabase', 'PostgreSQL', 'Realtime']}
                    description="Dashboard administrativo full-stack con autenticación, gestión de empleados, clientes, proyectos y facturación. Integra PostgreSQL, Supabase y funcionalidades en tiempo real en una interfaz moderna y totalmente responsive."
                    image={nexadminImg}
                    link="https://nex-admin-tau.vercel.app/"
                    credentials={[
                      { label: 'Usuario administrador', role: 'admin', accounts: [
                        { email: 'admin@nexadmin.com', password: 'admin123' }
                      ]},
                      { label: 'Equipo', role: 'team', accounts: [
                        { email: 'ana@nexadmin.com', password: 'ana123' },
                        { email: 'carlos@nexadmin.com', password: 'carlos123' }
                      ]}
                    ]}
                    featured />
                  <ProjectCard
                    title="Nexon"
                    tags={['Clean Architecture', 'React', 'UI/UX Design']}
                    image={nexonImg}
                    link="https://nexondemo.vercel.app" />
                  <ProjectCard
                    title="Benchmark Station"
                    tags={['Fullstack Development', 'React', 'Supabase']}
                    image={benchmarkImg}
                    link="https://station-lptsgamer.vercel.app" />
                  <ProjectCard
                    title="Sakura Linguis"
                    tags={['Vanilla JavaScript', 'Advanced CSS', 'UI/UX Design']}
                    image={sakuraImg}
                    github="https://github.com/chulox20/SAKURA-LINGUIS"
                    link="https://sakura-linguis-lq9x.vercel.app/index.html" />
                </div>
              </div>
            </section>

            <section id="contact" className="section-container">
              <SectionHeader title="¿Tienes un proyecto en mente?" subtitle="Hagámoslo realidad" />

              <div className="responsive-grid grid-2" style={{ gap: '4rem', marginTop: '4rem' }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                    Estoy disponible para nuevos proyectos y colaboraciones estratégicas. Si buscas elevar tu presencia digital con un enfoque técnico y una estética de alto impacto, hablemos.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <a href="https://wa.me/584128034685" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                      <MessageSquare color="var(--accent-color)" size={24} />
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: '600' }}>WhatsApp</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Escríbeme directamente</span>
                      </div>
                    </a>
                    <a
                      href="mailto:jmfiguera90@gmail.com"
                      onClick={handleCopy}
                      className="social-link"
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', cursor: 'pointer', position: 'relative' }}
                    >
                      <Mail color="var(--accent-color)" size={24} />
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: '600' }}>Email</span>
                        <span style={{ fontSize: '0.85rem', color: copied ? '#4CAF50' : 'var(--accent-color)', fontWeight: '500', transition: 'color 0.3s ease' }}>
                          {copied ? '¡Copiado!' : 'jmfiguera90@gmail.com'}
                        </span>
                      </div>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {formStatus === 'success' ? (
                      <div style={{
                        padding: '3rem',
                        textAlign: 'center',
                        background: 'rgba(229, 178, 62, 0.1)',
                        border: '1px solid var(--accent-color)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <Sparkles color="var(--accent-color)" size={48} style={{ marginBottom: '1.5rem' }} />
                        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>¡Mensaje Enviado con Éxito!</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Gracias por contactarme, Jesús te responderá lo antes posible.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="input-group">
                          <input name="name" type="text" placeholder="Nombre" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(229,178,62,0.25)', color: 'white', borderRadius: '4px', outline: 'none' }} />
                        </div>
                        <div className="input-group">
                          <input name="email" type="email" placeholder="Correo" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(229,178,62,0.25)', color: 'white', borderRadius: '4px', outline: 'none' }} />
                        </div>
                        <div className="input-group">
                          <textarea name="message" placeholder="Mensaje" rows="5" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(229,178,62,0.25)', color: 'white', borderRadius: '4px', outline: 'none', resize: 'none' }}></textarea>
                        </div>
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={formStatus === 'sending'}
                          style={{ width: '100%', opacity: formStatus === 'sending' ? 0.7 : 1 }}
                        >
                          {formStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                        </button>
                        {formStatus === 'error' && (
                          <p style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                            Hubo un error al enviar. Por favor, intenta de nuevo o escríbeme al correo directamente.
                          </p>
                        )}
                      </form>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <footer style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.75rem', borderTop: '1px solid rgba(229, 178, 62, 0.15)', letterSpacing: '0.1rem' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <a href="https://github.com/chulox20/Portafolio" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', padding: '0.5rem' }}>
                  <Github size={20} />
                </a>
              </div>
              <p>© 2026 Jesús Figuera | Construido con Inteligencia Artificial y Pasión.</p>
            </footer>
          </main>
        </motion.div>
      )}
    </div>
  )
}

export default App
