import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlitterWarp from './components/GlitterWarp'
import NeonBorder from './components/originkit/ui/neon-border'

gsap.registerPlugin(ScrollTrigger)

const themes = [
  ['01', 'Urban services', 'Robots that guide, deliver, maintain landscapes and communicate in shared public settings.'],
  ['02', 'Spatial intelligence', 'Shared maps, mobile sensing and environmental intelligence for people and autonomous agents.'],
  ['03', 'Care & inclusion', 'Assistive systems that support mobility, independence and unobtrusive health observation.'],
  ['04', 'Public participation', 'New interfaces for planning communication, collective decisions and social acceptance.'],
  ['05', 'Urban resilience', 'Coordinated robotic systems for inspection, risk assessment and emergency response.'],
]

const projects = [
  { code: 'HURI–01', title: 'Guide Beagle', subtitle: 'An intelligent reception and campus guide robot for public services', lead: 'Yang Yue', theme: 'Urban services', image: '/project-media/image2.jpg', description: 'A campus navigation vehicle designed around real-time environmental sensing and human–robot interaction analysis. It improves the visitor experience while providing a practical platform for exploring future communities where people and robots coexist.' },
  { code: 'HURI–02', title: 'Gardener Robots', subtitle: 'Mobile robots for campus vegetation management and mosquito control', lead: 'Rushi Dai', theme: 'Urban services', image: '/project-media/image5.png', description: 'A modular mobile robot that irrigates vegetation by day and supports mosquito control by night. LiDAR, RTK positioning and visual perception enable autonomous mapping, navigation and obstacle avoidance.' },
  { code: 'HURI–03', title: 'Shared Readership', subtitle: 'One spatial structure, many task-dependent representations', lead: 'Bin Jiang', theme: 'Spatial intelligence', image: '/project-media/image4.jpg', description: 'A continuous-scale spatial framework that maintains one shared geographic reality while deriving representations suited to pedestrians, vehicles, drones, delivery robots, quadrupeds and humanoids.' },
  { code: 'HURI–04', title: 'Wheelchair Robot', subtitle: 'Integrated living assistance for older adults', lead: 'Lingbo Liu', theme: 'Care & inclusion', image: '/project-media/image1.jpg', description: 'An intelligent wheelchair integrating autonomous mobility, body support, bed–chair transfer and daily assistance to help older adults live with greater independence and dignity.' },
  { code: 'HURI–05', title: 'Campus Delivery Robots', subtitle: 'Indoor–outdoor autonomy for last-mile delivery', lead: 'Wufan Zhao', theme: 'Urban services', image: '/project-media/image9.png', description: 'A delivery platform combining multimodal perception with Vision–Language–Action intelligence to understand tasks, navigate across indoor and outdoor environments and support secure pickup.' },
  { code: 'HURI–06', title: 'Community Planner Robot', subtitle: 'LLM-enabled planning communication and decision support', lead: 'Si Qiao', theme: 'Public participation', image: '/project-media/image13.png', description: 'A humanoid planning companion that translates technical proposals into everyday scenarios, accompanies residents on community walks and turns lived experience into location-specific planning criteria.' },
  { code: 'HURI–07', title: 'Road Inspection Robot', subtitle: 'Inspection for 3D campus pedestrian networks', lead: 'Maosu Li', theme: 'Spatial intelligence', image: '/project-media/image6.png', description: 'A system combining machine vision, LiDAR and GIS data to identify pavement defects, locate risks and build a dynamic 3D map of pedestrian–robot accessibility across campus.' },
  { code: 'HURI–08', title: 'UrbanMesh', subtitle: 'Air–ground intelligence for smarter cities', lead: 'Jianying Wang', theme: 'Urban resilience', image: '/project-media/image8.jpg', description: 'An air–ground collaborative robotics project in which autonomous rovers and low-altitude drones share maps, sensor data and task plans for logistics, monitoring and emergency response.' },
  { code: 'HURI–09', title: 'Space Pulse', subtitle: 'Smart sensing for human-centred spatial performance', lead: 'Haoxiang Zhang', theme: 'Spatial intelligence', image: '/project-media/image3.jpg', description: 'An autonomous sensing robot that evaluates visual exposure, tree shade, microclimate and human activity to reveal how outdoor spaces support comfort, movement and vitality.' },
  { code: 'HURI–10', title: 'Urban Perceiver', subtitle: 'Inspection robots and environmental exposure maps', lead: 'Qiumeng Li', theme: 'Spatial intelligence', image: '/project-media/image15.png', description: 'A mobile environmental observatory using cameras, air-quality, noise, temperature, humidity and GPS sensors to identify pollution hotspots and update street-scale exposure maps.' },
  { code: 'HURI–11', title: 'Campus Promotion Robot', subtitle: 'Attention-aware interaction in public spaces', lead: 'Cai Wu', theme: 'Urban services', image: '/project-media/image10.png', description: 'An interactive mobile platform that observes pedestrian flow, gaze and approach behaviour, then adapts speech, light, movement and display content to the social context.' },
  { code: 'HURI–12', title: 'Emergency Response Robot', subtitle: 'Intelligent robotics for disaster response', lead: 'Rui Cao', theme: 'Urban resilience', image: '/project-media/image11.png', description: 'An AI and digital-twin system for environmental perception, risk assessment, disaster simulation and autonomous decisions supporting early warning, search and rescue.' },
  { code: 'HURI–13', title: 'EchoRover', subtitle: 'A four-wheel mobile robot for indoor sensing', lead: 'Hao Xue', theme: 'Spatial intelligence', image: '/project-media/image14.png', description: 'A research rover carrying LiDAR, cameras, a microphone array and low-frequency acoustic emitters to sense people, nearby robots and physical obstacles with less reliance on clear imagery.' },
  { code: 'HURI–14', title: 'Health Assistant Robot', subtitle: 'Social interaction and unobtrusive health monitoring for older adults', lead: 'Bingzhe Wang', theme: 'Care & inclusion', description: 'A community-based companion that observes conversational rhythm and body movement during everyday social activities, combining care with continuous, low-profile health assessment.' },
  { code: 'HURI–15', title: 'Public Perception', subtitle: 'Measuring human–machine coexistence through generative video', lead: 'Keemoon Jang', theme: 'Public participation', description: 'A cross-regional study of motion predictability, perceived safety, comfort, spatial fit and robot-density tolerance using controlled generative-video stimuli across seven world regions.' },
]

function Mark({ className = '' }) {
  return <svg className={className} viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3v34M3 20h34"/><circle cx="20" cy="20" r="7"/></svg>
}

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 20 20" aria-hidden="true">{diagonal ? <path d="M5 15 15 5M8 5h7v7"/> : <path d="M3 10h13M12 6l4 4-4 4"/>}</svg>
}

function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="dialog-title">
      <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()}>Close <span aria-hidden="true">×</span></button>
      <div className="dialog-layout">
        <div className="dialog-visual">
          {project.image ? <img src={project.image} alt={`${project.title} project visual`} /> : <div className="dialog-placeholder"><Mark /></div>}
        </div>
        <div className="dialog-copy">
          <div className="project-meta"><span>{project.code}</span><span>{project.theme}</span></div>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-subtitle">{project.subtitle}</p>
          <p className="dialog-description">{project.description}</p>
          <div className="dialog-facts"><span>Project lead</span><strong>{project.lead}</strong><span>Context</span><strong>HKUST(GZ) Campus</strong></div>
        </div>
      </div>
    </dialog>
  )
}

function ThemeDialog({ theme, projects: themeProjects, onClose, onSelectProject }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog ref={dialogRef} className="theme-dialog" aria-labelledby="theme-dialog-title">
      <div className="theme-dialog-shell">
        <button className="theme-dialog-close" type="button" onClick={() => dialogRef.current?.close()}><span aria-hidden="true">←</span> Back to research</button>
        <header className="theme-dialog-header">
          <div><span>{theme.index} / Research field</span><h2 id="theme-dialog-title">{theme.title}</h2></div>
          <div><p>{theme.body}</p><strong>{String(themeProjects.length).padStart(2, '0')} projects</strong></div>
        </header>
        <div className="theme-project-grid">
          {themeProjects.map((project, index) => (
            <button className="theme-project-card" type="button" key={project.code} onClick={() => onSelectProject(project)}>
              <div className="theme-project-visual">
                {project.image ? <img src={project.image} alt="" loading={index > 3 ? 'lazy' : 'eager'} /> : <div className="theme-project-placeholder"><Mark /></div>}
              </div>
              <div className="theme-project-info"><span>{project.code}</span><strong>{project.title}</strong><p>{project.subtitle}</p><i aria-hidden="true"><Arrow diagonal /></i></div>
            </button>
          ))}
        </div>
      </div>
    </dialog>
  )
}

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [activeTheme, setActiveTheme] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerFloating, setHeaderFloating] = useState(false)
  const siteRef = useRef(null)

  useEffect(() => {
    const updateHeader = () => setHeaderFloating(window.scrollY >= window.innerHeight - 110)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [])

  useEffect(() => {
    const hero = siteRef.current?.querySelector('.hero')
    const scene = hero?.querySelector('.hero-scene')
    const panels = hero?.querySelector('.hero-hover-panels')
    const glow = hero?.querySelector('.hero-contact-glow')
    if (!hero || !scene || !panels || !glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const sceneX = gsap.quickTo(scene, 'x', { duration: 1.4, ease: 'power3.out' })
    const sceneY = gsap.quickTo(scene, 'y', { duration: 1.4, ease: 'power3.out' })
    const panelsX = gsap.quickTo(panels, 'x', { duration: 1.05, ease: 'power3.out' })
    const panelsY = gsap.quickTo(panels, 'y', { duration: 1.05, ease: 'power3.out' })
    const glowX = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' })
    const glowY = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' })

    const move = (event) => {
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      sceneX(x * -18)
      sceneY(y * -12)
      panelsX(x * 32)
      panelsY(y * 22)
      glowX(x * 42)
      glowY(y * 30)
    }

    const reset = () => {
      sceneX(0); sceneY(0); panelsX(0); panelsY(0); glowX(0); glowY(0)
    }

    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', reset)
    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', reset)
    }
  }, [])

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const ease = 'power4.out'
      const opening = gsap.timeline({ defaults: { ease } })

      opening
        .from('.hero-media', { scale: 1.13, opacity: 0, duration: 2.2, ease: 'power3.out' })
        .from('.site-header', { y: -44, opacity: 0, duration: 1.1 }, 0.2)
        .from('.hero .eyebrow', { y: 24, opacity: 0, letterSpacing: '.32em', duration: 1 }, 0.55)
        .from('.hero-title-line > span', {
          yPercent: 115,
          scaleX: 0.82,
          transformOrigin: 'left center',
          duration: 1.35,
          stagger: 0.16,
        }, 0.55)
        .from('.hero-foot', { y: 45, opacity: 0, duration: 1.1 }, 1.2)
        .from('.hero-index span', { y: 18, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.45)

      gsap.to('.hero-media', {
        scale: 1.065,
        xPercent: 1.4,
        duration: 11,
        delay: 2.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.utils.toArray('.section-kicker').forEach((kicker) => {
        if (kicker.closest('.hero')) return
        gsap.from(kicker, {
          scrollTrigger: { trigger: kicker, start: 'top 88%', once: true },
          x: -38,
          opacity: 0,
          duration: 0.9,
          ease,
        })
      })

      gsap.utils.toArray('.vision-heading h2, .lab-copy h2, .research-intro h2, .projects-heading h2, .site-footer h2').forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: { trigger: heading, start: 'top 86%', once: true },
          y: 110,
          scaleX: 0.84,
          opacity: 0,
          transformOrigin: 'left center',
          duration: 1.35,
          ease,
        })
      })

      gsap.utils.toArray('.reveal-frame').forEach((frame) => {
        const image = frame.querySelector('img')
        const preserveFullImageOnMobile = window.matchMedia('(max-width: 720px)').matches && frame.closest('.vision-image')
        if (image && !frame.classList.contains('reveal-frame--full-image') && !preserveFullImageOnMobile) {
          gsap.fromTo(image, { yPercent: 4, scale: 1.06 }, {
            yPercent: -4,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1.35 },
          })
        }
      })

      gsap.from('.theme-row', {
        scrollTrigger: { trigger: '.theme-list', start: 'top 82%', once: true },
        x: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease,
        clearProps: 'transform,opacity',
      })

      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.project-grid', start: 'top 82%', once: true },
        opacity: 0,
        duration: 1.05,
        stagger: { each: 0.1, from: 'start' },
        ease: 'power2.out',
        clearProps: 'opacity',
      })

      gsap.utils.toArray('.projects-heading > p, .vision-heading p, .lab-copy > p').forEach((copy) => {
        gsap.from(copy, {
          scrollTrigger: { trigger: copy, start: 'top 88%', once: true },
          y: 32,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      })
    }, siteRef)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      context.revert()
    }
  }, [])

  return (
    <main ref={siteRef} className="motion-site">
      <header className={`site-header shell ${headerFloating ? 'site-header--floating' : ''}`}>
        <a className="brand" href="#top" aria-label="Human-Centered Urban Robotics home"><Mark className="brand-mark" /><span>HURI</span></a>
        <div
          className="menu-cluster"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          onFocus={() => setMenuOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
          }}
        >
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
          <nav id="primary-nav" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
            <a className="society-hub-link" href="https://soch.hkust-gz.edu.cn/" target="_blank" rel="noreferrer">Society Hub <span aria-hidden="true">↗</span></a>
            {['Vision', 'Living Lab', 'Research', 'Projects'].map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </nav>
        </div>
        <a className="contact-link" href="#contact">Contact <Arrow diagonal /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-scene" aria-hidden="true">
          <img className="hero-media" src="/project-media/hero-human-robot-handshake.png" alt="" />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <GlitterWarp
          speed={0.5}
          color="#42b8ef"
          brightness={1.1}
          starSize={0.12000000000000001}
          density={640}
          alwaysVisible
          className="glitter-warp--hero"
        />
        <div className="hero-contact-glow" aria-hidden="true"><span /><span /></div>
        <div className="hero-hover-panels" aria-hidden="true">
          <span className="hero-hover-panel hero-hover-panel--one" />
          <span className="hero-hover-panel hero-hover-panel--two" />
          <span className="hero-hover-panel hero-hover-panel--three" />
        </div>
        <div className="hero-content shell">
          <p className="eyebrow">Human-Centered Urban Robotics Initiative</p>
          <h1 aria-label="Designing cities where humans and robots coexist.">
            <span className="hero-title-line"><span>Designing cities</span></span>
            <span className="hero-title-line"><span>where humans and</span></span>
            <span className="hero-title-line"><span>robots <em>coexist.</em></span></span>
          </h1>
          <div className="hero-foot">
            <p>A campus-scale research initiative exploring how intelligent machines can serve people, share space and participate responsibly in urban life.</p>
            <a className="round-link" href="#vision" aria-label="Explore the initiative"><Arrow /></a>
          </div>
        </div>
        <div className="hero-index shell" aria-hidden="true"><span>HKUST(GZ)</span><span>2026 / 15 Projects</span></div>
      </section>

      <GlitterWarp
        speed={0.5}
        color="#42b8ef"
        brightness={1.1}
        starSize={0.12000000000000001}
      />

      <section className="vision-section section shell" id="vision">
        <div className="section-kicker">01 / Vision</div>
        <div className="vision-heading">
          <h2>Robots are becoming part of the city.</h2>
          <p>As robots enter campuses, neighbourhoods, hospitals and transport hubs, they become more than machines. They become service providers, users of shared space and participants in urban systems.</p>
        </div>
        <figure className="vision-image">
          <div className="neon-media reveal-frame">
            <img src="/project-media/image7.png" alt="A conceptual human-centered urban robotics city" />
            <div className="neon-border-layer" aria-hidden="true"><NeonBorder color="#42b8ef" rounded={0} thickness={3} borderSize={60} glow={88} movement="continuous" speed={13} /></div>
          </div>
          <figcaption><span>Human-centered urban robotics</span><span>People · Space · Systems</span></figcaption>
        </figure>
      </section>

      <section className="living-lab section shell" id="living-lab">
        <div className="lab-copy">
          <div className="section-kicker">02 / Campus as a micro-city</div>
          <h2>A living laboratory for real-world integration.</h2>
          <p>The HKUST(GZ) campus brings people, robots, buildings, public space, mobility and institutional systems into one open testbed. Research begins with unmet human needs—not a predetermined machine.</p>
          <div className="lab-sequence" aria-label="Research process"><span>01 Identify</span><span>02 Prototype</span><span>03 Deploy</span><span>04 Evaluate</span></div>
        </div>
        <div className="lab-visual"><div className="neon-media reveal-frame reveal-frame--full-image"><img src="/project-media/image12.png" alt="Campus robotics integration project overview" /><div className="neon-border-layer" aria-hidden="true"><NeonBorder color="#a981ff" rounded={0} thickness={3} borderSize={60} glow={88} movement="continuous" speed={13} /></div></div></div>
      </section>

      <section className="research-section section shell" id="research">
        <div className="research-intro"><div className="section-kicker">03 / Research fields</div><h2>One shared agenda.<br />Five connected fields.</h2></div>
        <div className="theme-list">{themes.map(([index, title, body]) => <button className="theme-row" type="button" key={index} onClick={() => setActiveTheme({ index, title, body })}><span>{index}</span><h3>{title}</h3><p>{body}</p><span className="theme-arrow" aria-hidden="true"><Arrow diagonal /></span></button>)}</div>
      </section>

      <section className="projects-section section" id="projects">
        <div className="shell projects-heading"><div><div className="section-kicker">04 / HURI Projects</div><h2>Fifteen ways to make coexistence real.</h2></div><p>Faculty-led projects translate a shared vision into tangible urban scenarios, research questions and robotic systems.</p></div>
        <div className="project-grid shell">
          {projects.map((project, index) => (
            <button className={`project-card ${!project.image ? 'project-card--text' : ''}`} type="button" key={project.code} onClick={() => setActiveProject(project)} aria-label={`Open ${project.title} project`}>
              {project.image && <img src={project.image} alt="" loading={index > 3 ? 'lazy' : 'eager'} />}
              <span className="project-card-shade" aria-hidden="true" />
              <span className="project-card-top"><span>{project.code}</span><span>{project.theme}</span></span>
              <span className="project-card-copy"><strong>{project.title}</strong><span>{project.subtitle}</span></span>
              <span className="project-card-arrow"><Arrow diagonal /></span>
            </button>
          ))}
        </div>
      </section>

      <footer className="site-footer shell" id="contact">
        <div className="footer-mark"><Mark /></div><h2>Build the next urban relationship.</h2>
        <div className="footer-bottom"><p>Human-Centered Urban Robotics Initiative<br />HKUST(GZ)</p><a href="https://soch.hkust-gz.edu.cn/faculty-research/urban-robotics" target="_blank" rel="noreferrer">Contact the initiative <Arrow diagonal /></a><span>Research · Design · AI</span></div>
      </footer>
      {activeTheme && <ThemeDialog theme={activeTheme} projects={projects.filter((project) => project.theme === activeTheme.title)} onClose={() => setActiveTheme(null)} onSelectProject={(project) => { setActiveTheme(null); setActiveProject(project) }} />}
      {activeProject && <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />}
    </main>
  )
}

export default App
