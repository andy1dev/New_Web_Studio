'use client'

import { useState, useEffect } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentWord, setCurrentWord] = useState('')
  const [wordClass, setWordClass] = useState('entering')

  const words = ['Diseño', 'Código', 'Digital']

  useEffect(() => {
    setVisible(true)

    // Word animation
    let wordIdx = 0
    setCurrentWord(words[0])
    setTimeout(() => {
      setWordClass('active')
    }, 100)

    const nextWord = () => {
      wordIdx++
      if (wordIdx >= words.length) return
      setWordClass('exiting')
      setTimeout(() => {
        setCurrentWord(words[wordIdx])
        setWordClass('entering')
        setTimeout(() => setWordClass('active'), 50)
        if (wordIdx < words.length - 1) setTimeout(nextWord, 700)
      }, 350)
    }
    setTimeout(nextWord, 700)

    // Progress animation
    const DURATION = 2000
    const startTime = Date.now()
    const animateProgress = () => {
      const elapsed = Date.now() - startTime
      const progressValue = Math.min(elapsed / DURATION, 1)
      setProgress(Math.round(progressValue * 100))

      if (progressValue < 1) {
        requestAnimationFrame(animateProgress)
      } else {
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(() => {
            setHidden(true)
          }, 650)
        }, 300)
      }
    }
    requestAnimationFrame(animateProgress)
  }, [])

  if (hidden) return null

  return (
    <div
      id="loading-screen"
      className={`preloader-loader ${fadeOut ? 'preloader-fadeOut' : ''} ${hidden ? 'preloader-hidden' : ''}`}
    >
      <div className={`preloader-loaderLabel ${visible ? 'preloader-visible' : ''}`}>
        SPTECH Studio Web
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={`preloader-loaderWord ${wordClass === 'entering' ? 'preloader-entering' : wordClass === 'active' ? 'preloader-active' : 'preloader-exiting'}`}>
          {currentWord}
        </div>
      </div>
      <div className={`preloader-loaderCounter ${visible ? 'preloader-visible' : ''}`}>
        {progress.toString().padStart(3, '0')}
      </div>
      <div className="preloader-loaderBarTrack">
        <div className="preloader-loaderBarFill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}