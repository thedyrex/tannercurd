'use client'

import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  { name: 'OWVL', sub: 'Co-Founder & Lead Engineer', years: '2026 – Present', location: 'BA, OK &  BC, CANADA', desc: 'Overwatch Vod Library is a tool players and recruiters can use to study player and team gameplay using every provided VOD and player POV. Multiple filters allow users to find exactly what they\'re looking for. Developed by Nogfriend and I.' },
  { name: 'NTMR Esports LLC', sub: 'Frontend Web Development Intern', years: '2024 – 2025', location: 'MIAMI, FL', desc: 'Led concept design for the organization\'s website during its grassroot stages.' },
  { name: 'OWCSLE', sub: 'Founder & Lead Engineer', years: '2024 – Present', location: 'BA, OK', desc: 'Daily guessing game centered around the Overwatch Champion Series (OWCS). Players use correct and incorrect attributes as clues to identify the right OWCS pro player each day. Collaborated with numerous orgs such as Team Liquid, NTMR, and YFP.' },
]
import ParallaxScene from './components/ParallaxScene'
import LiquidGlass from 'liquid-glass-react'

export default function Home() {
  const [overWhite, setOverWhite] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [openProject, setOpenProject] = useState<string | null>(null)
  const isSnapping = useRef(false)
  const workSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    Work: workSectionRef, About: aboutSectionRef, Contact: contactSectionRef,
  }

  const scrollToSection = (key: string) => {
    const el = sectionRefs[key]?.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const whiteStart = () => window.innerHeight * 0.9

    const onScroll = () => setOverWhite(window.scrollY > whiteStart() - 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const snapTo = (target: number) => {
      isSnapping.current = true
      window.scrollTo({ top: target, behavior: 'smooth' })
      setTimeout(() => { isSnapping.current = false }, 1000)
    }

    const getSnapPoints = () => {
      const abs = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY
      return [
        0,
        ...(workSectionRef.current ? [abs(workSectionRef.current)] : [whiteStart()]),
        ...(aboutSectionRef.current ? [abs(aboutSectionRef.current)] : []),
        ...(contactSectionRef.current ? [abs(contactSectionRef.current)] : []),
      ]
    }

    const snapDirection = (dir: 1 | -1) => {
      const cur = window.scrollY
      const points = getSnapPoints()
      if (dir === 1) {
        const next = points.find(p => p > cur + 80)
        if (next !== undefined) snapTo(next)
      } else {
        const prev = [...points].reverse().find(p => p < cur - 80)
        if (prev !== undefined) snapTo(prev)
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (isSnapping.current) { e.preventDefault(); return }
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (tag === 'TEXTAREA' || tag === 'INPUT') return
      e.preventDefault()
      snapDirection(e.deltaY > 0 ? 1 : -1)
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (isSnapping.current) return
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (tag === 'TEXTAREA' || tag === 'INPUT') return
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) > 80) snapDirection(delta > 0 ? 1 : -1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <>
      <LiquidGlass
        displacementScale={200}
        blurAmount={0}
        saturation={140}
        aberrationIntensity={1.5}
        elasticity={0.5}
        overLight={overWhite}
        cornerRadius={10}
        padding="14px 36px"
        className="nav-wrapper"
        style={{ position: 'fixed', top: '48px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, borderRadius: '10px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Work', 'About', 'Contact'].map((item) => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); scrollToSection(item) }} className={`nav-link${overWhite ? ' nav-link-dark' : ''}`} style={{ textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'MonaSans', whiteSpace: 'nowrap' }}>
              {item}
            </a>
          ))}
        </div>
      </LiquidGlass>

      <ParallaxScene />
      <div style={{ height: '90vh' }} />
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'white',
        minHeight: '100vh',
        borderRadius: '24px 24px 0 0',
        marginTop: '-24px',
        paddingTop: '48px',
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px',
          left: 'clamp(16px, 4vw, 48px)',
          background: 'white',
          padding: '10px 16px',
          borderRadius: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/globe.png" alt="" style={{ height: '16px', width: 'auto' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.15em', color: '#111', whiteSpace: 'nowrap' }}>MADE W/ LOVE BY TANNER</span>
        </div>
        <div
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0px', marginTop: '-16px', gap: '8px', cursor: 'pointer', opacity: overWhite ? 0 : 1, pointerEvents: overWhite ? 'none' : 'auto', transition: 'opacity 0.3s ease' }}
        >
          <span style={{ fontFamily: 'MonaSans', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: '#111' }}>SCROLL</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0v20M1 13l7 7 7-7" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div ref={workSectionRef} style={{ padding: 'clamp(24px, 5vw, 80px)', paddingTop: '48px' }}>
          <h2 style={{ fontFamily: 'HelveticaSBold', fontSize: 'clamp(2rem, 5vw, 5rem)', color: '#111', margin: '0 0 40px 0', letterSpacing: '-0.03em', lineHeight: 1 }}>WORK</h2>
          {PROJECTS.map(({ name, sub, years, location, desc }) => (
            <div key={name} style={{ borderTop: '1px solid #e0e0e0' }} onMouseEnter={() => setOpenProject(name)} onMouseLeave={() => setOpenProject(null)}>
              <button
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0', background: 'none', border: 'none', cursor: 'default' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                  <span style={{ fontFamily: 'HelveticaSBold', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#111', letterSpacing: '-0.02em' }}>{name}</span>
                  <span style={{ fontFamily: 'MonaSans', fontSize: 'clamp(0.75rem, 1.2vw, 1rem)', color: '#888', fontWeight: 400 }}>{sub}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#bbb', fontWeight: 600, letterSpacing: '0.1em' }}>{location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>{years}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: openProject === name ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    <path d="M6 9l6 6 6-6" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: openProject === name ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ paddingBottom: '28px', fontFamily: 'MonaSans', fontSize: '1rem', color: '#555', lineHeight: 1.7, maxWidth: '55ch' }}>
                    {desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e0e0e0' }} />
        </div>

        <div ref={aboutSectionRef} style={{ padding: 'clamp(24px, 5vw, 80px)', paddingTop: '80px' }}>
          <h2 style={{ fontFamily: 'HelveticaSBold', fontSize: 'clamp(2rem, 5vw, 5rem)', color: '#111', margin: '0 0 40px 0', letterSpacing: '-0.03em', lineHeight: 1 }}>ABOUT</h2>
          <p style={{ fontFamily: 'MonaSans', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#555', lineHeight: 1.8, maxWidth: '60ch', margin: '0 0 24px 0' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p style={{ fontFamily: 'MonaSans', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#555', lineHeight: 1.8, maxWidth: '60ch', margin: 0 }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div ref={contactSectionRef} style={{ padding: 'clamp(24px, 5vw, 80px)', paddingTop: '80px', paddingBottom: '120px' }}>
          <h2 style={{ fontFamily: 'HelveticaSBold', fontSize: 'clamp(2rem, 5vw, 5rem)', color: '#111', margin: '0 0 40px 0', letterSpacing: '-0.03em', lineHeight: 1 }}>CONTACT</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const f = e.target as HTMLFormElement
              const name = (f.elements.namedItem('name') as HTMLInputElement).value
              const email = (f.elements.namedItem('email') as HTMLInputElement).value
              const message = (f.elements.namedItem('message') as HTMLTextAreaElement).value
              setFormStatus('sending')
              try {
                await fetch('https://discord.com/api/webhooks/1466579365969264784/s2DelYzuJmqGsSDyAsi78Wg3DpVUIpz0VApZkXF8WLee1AEI6SoHi6U-s5epvmzVrKuI', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ embeds: [{ title: `New message from ${name}`, description: message, fields: [{ name: 'Email', value: email }], color: 0x111111 }] }),
                })
                setFormStatus('sent')
                f.reset()
              } catch { setFormStatus('error') }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}
          >
            <div className="contact-row">
              <input name="name" required placeholder="Name" style={{ flex: 1, fontFamily: 'MonaSans', fontSize: '1rem', padding: '14px 0', background: 'none', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', color: '#111' }} />
              <input name="email" type="email" required placeholder="Email" style={{ flex: 1, fontFamily: 'MonaSans', fontSize: '1rem', padding: '14px 0', background: 'none', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', color: '#111' }} />
            </div>
            <textarea name="message" required placeholder="Message" rows={5} style={{ fontFamily: 'MonaSans', fontSize: '1rem', padding: '14px 0', background: 'none', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', color: '#111', resize: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button type="submit" disabled={formStatus === 'sending'} style={{ fontFamily: 'HelveticaSBold', fontSize: '0.9rem', letterSpacing: '0.1em', color: 'white', background: '#111', border: 'none', padding: '14px 36px', cursor: formStatus === 'sending' ? 'default' : 'pointer', borderRadius: '4px', opacity: formStatus === 'sending' ? 0.6 : 1 }}>
                {formStatus === 'sending' ? 'SENDING...' : 'SEND'}
              </button>
              {formStatus === 'sent' && <span style={{ fontFamily: 'MonaSans', fontSize: '0.9rem', color: '#555' }}>Message sent!</span>}
              {formStatus === 'error' && <span style={{ fontFamily: 'MonaSans', fontSize: '0.9rem', color: '#e00' }}>Something went wrong. Try again.</span>}
            </div>
          </form>
        </div>

        <footer style={{ padding: 'clamp(24px, 5vw, 80px)', paddingTop: '40px', paddingBottom: '48px', borderTop: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#bbb' }}>KIMOCHI, LLC</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#bbb' }}>© {new Date().getFullYear()} Tanner Curd. All rights reserved.</span>
        </footer>
      </div>
    </>
  )
}
