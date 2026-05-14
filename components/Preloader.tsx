'use client'

import { useState, useEffect } from 'react'

export default function Preloader() {
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [wordClass, setWordClass] = useState<'entering' | 'active' | 'exiting'>('entering')
  const [counter, setCounter] = useState(0)

  const words = ['W', 'WE', 'WEB', 'WEB ', 'WEB S', 'WEB ST', 'WEB STU', 'WEB STUD', 'WEB STUDI', 'WEB STUDIO']

  useEffect(() => {
    setVisible(true)

    const duration = 2000
    const interval = 20
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = (currentStep / steps) * 100
      setProgress(newProgress)
      setCounter(Math.floor(newProgress))

      const wordIndex = Math.floor((currentStep / steps) * words.length)
      if (wordIndex < words.length) {
        setWordClass('entering')
        setTimeout(() => setWordClass('active'), 50)
      }

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(() => {
            setHidden(true)
          }, 600)
        }, 500)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [words.length])

  return (
    <div
      className={`preloader-loader ${fadeOut ? 'preloader-fadeOut' : ''} ${hidden ? 'preloader-hidden' : ''}`}
    >
      <div className={`preloader-loaderLabel ${visible ? 'preloader-visible' : ''}`}>
        Loading
      </div>
      <div
        className={`preloader-loaderWord ${wordClass === 'entering' ? 'preloader-entering' : wordClass === 'active' ? 'preloader-active' : 'preloader-exiting'}`}
      >
        {words[Math.min(Math.floor((progress / 100) * words.length), words.length - 1)]}
      </div>
      <div className={`preloader-loaderCounter ${visible ? 'preloader-visible' : ''}`}>
        {counter}
      </div>
      <div className="preloader-loaderBarTrack">
        <div className="preloader-loaderBarFill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}