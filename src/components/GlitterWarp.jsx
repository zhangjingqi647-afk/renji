import { useEffect, useRef } from 'react'

const STAR_COUNT = 380
export default function GlitterWarp({
  speed = 1,
  color = '#ffffff',
  brightness = 1,
  starSize = 0.1,
  density = STAR_COUNT,
  alwaysVisible = false,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    let lastTime = performance.now()
    let visible = !document.hidden
    let stars = []

    const createStar = (fresh = false) => ({
      x: (Math.random() - 0.5) * width * 1.75,
      y: (Math.random() - 0.5) * height * 1.75,
      z: fresh ? 1 : Math.random(),
      previousZ: 1,
      size: (0.35 + Math.random() * 1.2) * (starSize / 0.1),
      alpha: Math.min(1, (0.25 + Math.random() * 0.7) * brightness),
      color,
      shimmer: Math.random() * Math.PI * 2,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from({ length: Math.max(1, Math.round(density)) }, () => createStar())
    }

    const draw = (time) => {
      frame = requestAnimationFrame(draw)
      if (!visible) return
      const delta = Math.min((time - lastTime) / 16.67, 2)
      lastTime = time
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      const centerX = width * 0.52
      const centerY = height * 0.48
      const motionSpeed = reducedMotion ? 0 : 0.0032 * speed * delta

      for (const star of stars) {
        star.previousZ = star.z
        star.z -= motionSpeed
        if (star.z < 0.035) Object.assign(star, createStar(true))

        const depth = 1 / Math.max(star.z, 0.035)
        const previousDepth = 1 / Math.max(star.previousZ, 0.035)
        const x = centerX + star.x * depth * 0.18
        const y = centerY + star.y * depth * 0.18
        const previousX = centerX + star.x * previousDepth * 0.18
        const previousY = centerY + star.y * previousDepth * 0.18

        if (x < -80 || x > width + 80 || y < -80 || y > height + 80) {
          Object.assign(star, createStar(true))
          continue
        }

        const shimmer = 0.68 + Math.sin(time * 0.0025 + star.shimmer) * 0.32
        context.beginPath()
        context.moveTo(previousX, previousY)
        context.lineTo(x, y)
        context.strokeStyle = star.color
        context.globalAlpha = star.alpha * shimmer * Math.max(0.28, Math.min(1, (1 - star.z) * 2.15))
        context.lineWidth = 0.45 + star.size * Math.min(2.4, depth * 0.28)
        context.stroke()

        context.beginPath()
        context.arc(x, y, Math.max(0.45, star.size * Math.min(1.8, depth * 0.18)), 0, Math.PI * 2)
        context.fillStyle = star.color
        context.fill()
      }
      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
    }

    const handleVisibility = () => {
      visible = !document.hidden
      lastTime = performance.now()
    }

    const handleScroll = () => {
      if (alwaysVisible) {
        canvas.style.opacity = String(reducedMotion ? 0.34 : 0.82)
        return
      }
      const progress = Math.max(0, Math.min(1, (window.scrollY - window.innerHeight * 0.72) / (window.innerHeight * 0.28)))
      canvas.style.opacity = String(progress * (reducedMotion ? 0.38 : 0.88))
    }

    resize()
    handleScroll()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [speed, color, brightness, starSize, density, alwaysVisible])

  return <canvas ref={canvasRef} className={`glitter-warp ${className}`} aria-hidden="true" />
}
