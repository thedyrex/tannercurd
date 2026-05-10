'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function ParallaxScene() {
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const tannerRef = useRef<HTMLSpanElement>(null)
  const curdRowRef = useRef<HTMLSpanElement>(null)
  const paraRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08)

      const { x } = currentRef.current

      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translate(${x * 10}px, 0px)`
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translate(${x * 20}px, 0px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    gsap.set([layer3Ref.current, layer2Ref.current], { opacity: 0 })
    gsap.set([tannerRef.current, curdRowRef.current, paraRef.current], { opacity: 0, y: 40 })

    gsap.to(layer3Ref.current, { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 })
    gsap.to(layer2Ref.current, { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.35 })
    gsap.to(tannerRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0 })
    gsap.to(curdRowRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
    gsap.to(paraRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 })

    window.addEventListener('mousemove', handleMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div onDragStart={(e) => e.preventDefault()} style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>

      {/* Layer 1: background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/parallax/tanner_background_scuffed.png"
          alt=""
          fill
          draggable={false}
          style={{ objectFit: 'cover', objectPosition: 'center 65%' }}
          priority
        />
      </div>

      {/* Layer 2: tanner cutout */}
      <div ref={layer2Ref} style={{ position: 'absolute', inset: '-60px', zIndex: 3 }}>
        <Image
          src="/parallax/tanner_cutout.png"
          alt=""
          fill
          draggable={false}
          style={{ objectFit: 'cover', objectPosition: 'center 65%' }}
          priority
        />
      </div>

      {/* Layer 3: lamppost cutout */}
      <div ref={layer3Ref} style={{ position: 'absolute', inset: '-60px', zIndex: 4 }}>
        <Image
          src="/parallax/lamppost_cutout.png"
          alt=""
          fill
          draggable={false}
          style={{ objectFit: 'cover', objectPosition: 'center 65%' }}
          priority
        />
      </div>

      {/* Name + paragraph */}
      <div style={{
        position: 'absolute',
        top: '42%',
        right: 'clamp(16px, 4vw, 48px)',
        transform: 'translateY(-50%)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span ref={tannerRef} style={{ fontFamily: 'HelveticaSBold', color: 'white', fontSize: 'clamp(5rem, 10vw, 11rem)', fontWeight: '300', lineHeight: 0.9 }}>Tanner</span>
          {/* font-size on curd-row so star em resolves relative to text size */}
          <span ref={curdRowRef} style={{ display: 'flex', alignItems: 'center', gap: '0.25em', fontSize: 'clamp(5rem, 10vw, 11rem)', lineHeight: 0.9 }}>
            <span style={{ fontFamily: 'BaskervvilleItalic', color: 'white', fontStyle: 'italic' }}>Curd</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/starburst-four-point-icon.webp" alt="" style={{ height: '0.5em', width: 'auto', filter: 'invert(1)' }} />
          </span>
        </div>
        <div ref={paraRef} style={{ marginTop: '1rem', maxWidth: 'min(55ch, 90vw)', textAlign: 'right' }}>
          <p style={{ fontFamily: 'MonaSans', color: 'white', fontSize: 'clamp(1rem, 2vw, 2rem)', lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
            front-end web developer, created interactive utilites/games for esport communities.
          </p>
        </div>
      </div>
    </div>
  )
}
