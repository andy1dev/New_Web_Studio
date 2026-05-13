'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const cursorRing = document.getElementById('cursor-ring')

    if (!cursor || !cursorRing) return

    let cursorX = 0
    let cursorY = 0
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
      cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select, .group')) {
        cursor.classList.add('hover')
        cursorRing.classList.add('hover')
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select, .group')) {
        cursor.classList.remove('hover')
        cursorRing.classList.remove('hover')
      }
    }

    const animate = () => {
      ringX += (cursorX - ringX) * 0.15
      ringY += (cursorY - ringY) * 0.15
      cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}