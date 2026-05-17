'use client'

import { useEffect } from 'react'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Technologies from '@/components/Technologies'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Metrics from '@/components/Metrics'
import Footer from '@/components/Footer'
import Preloader from '@/components/ui/html-preloader'





export default function Home() {
  useEffect(() => {
    const initLenis = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    }

    initLenis()
  }, [])

  return (
    <>
      <Preloader />
      <main className="relative">
        <Navbar />
        <Hero />
        <Services />
        <Technologies />
        <About />
        <Portfolio />
        <Metrics />
        <Footer />
      </main>
    </>
  )
}