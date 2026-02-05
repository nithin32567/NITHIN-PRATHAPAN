"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null) // The small dot
    const followerRef = useRef<HTMLDivElement>(null) // The large jelly blob
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]) // The fluid trail



    // Store the actual element to track its live position
    const hoverTarget = useRef<HTMLElement | null>(null)

    // Trail physics state: Create 12 points for the fluid tail
    const trailPos = useRef<{ x: number, y: number }[]>(Array.from({ length: 12 }, () => ({ x: 0, y: 0 })))

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current
        const trails = trailRefs.current

        if (!cursor || !follower) return

        // Check for touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        // Hide default cursor
        document.body.style.cursor = 'none'

        // Initial setup
        gsap.set([cursor, follower, ...trails], { xPercent: -50, yPercent: -50, opacity: 0 })

        // Appear animation - Staggered for a cool entrance
        gsap.to([cursor, follower], { opacity: 1, duration: 0.5, delay: 0.2 })
        gsap.to(trails, { opacity: 0.6, duration: 0.5, stagger: 0.05, delay: 0.2 })

        // --------------------------------------------------------
        // ANIMATIONS (Blinking & Colors)
        // --------------------------------------------------------

        // 1. Dynamic Rainbow Colors
        // Colors cycle through HSL spectrum. 
        // Background is low opacity, Border is full opacity.
        const colorKeyframes = {
            "0%": { borderColor: "hsl(0, 100%, 60%)", backgroundColor: "hsla(0, 100%, 60%, 0.1)" },
            "25%": { borderColor: "hsl(90, 100%, 60%)", backgroundColor: "hsla(90, 100%, 60%, 0.1)" },
            "50%": { borderColor: "hsl(180, 100%, 60%)", backgroundColor: "hsla(180, 100%, 60%, 0.1)" },
            "75%": { borderColor: "hsl(270, 100%, 60%)", backgroundColor: "hsla(270, 100%, 60%, 0.1)" },
            "100%": { borderColor: "hsl(360, 100%, 60%)", backgroundColor: "hsla(360, 100%, 60%, 0.1)" }
        }

        gsap.to(follower, {
            keyframes: colorKeyframes,
            duration: 8,
            repeat: -1,
            ease: "none"
        })

        // Trail colors: Solid dots that follow the spectrum
        gsap.to(trails, {
            keyframes: {
                "0%": { backgroundColor: "hsl(0, 100%, 60%)" },
                "25%": { backgroundColor: "hsl(90, 100%, 60%)" },
                "50%": { backgroundColor: "hsl(180, 100%, 60%)" },
                "75%": { backgroundColor: "hsl(270, 100%, 60%)" },
                "100%": { backgroundColor: "hsl(360, 100%, 60%)" }
            },
            duration: 8,
            repeat: -1,
            ease: "none",
            stagger: 0.1 // Ripple effect through the trail
        })

        // Cursor Dot colors
        gsap.to(cursor, {
            keyframes: {
                "0%": { backgroundColor: "hsl(0, 100%, 60%)" },
                "25%": { backgroundColor: "hsl(90, 100%, 60%)" },
                "50%": { backgroundColor: "hsl(180, 100%, 60%)" },
                "75%": { backgroundColor: "hsl(270, 100%, 60%)" },
                "100%": { backgroundColor: "hsl(360, 100%, 60%)" }
            },
            duration: 8,
            repeat: -1,
            ease: "none"
        })

        // 2. Blinking / Pulsing Effect
        // Make the follower "breathe" (scale)
        gsap.to(follower, {
            scale: 1.1,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })

        // Make the trail dots twinkle (opacity)
        gsap.to(trails, {
            opacity: 0.2, // Fade out to 0.2
            duration: 0.8,
            stagger: {
                amount: 1,
                from: "random",
                repeat: -1,
                yoyo: true
            },
            ease: "power1.inOut"
        })


        // --------------------------------------------------------
        // MOVEMENT LOGIC
        // --------------------------------------------------------
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" })
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" })

        // Physics variables for the main follower
        const pos = { x: 0, y: 0 }
        const lastMouse = { x: 0, y: 0 }
        let mouseX = 0
        let mouseY = 0

        // Config
        const friction = 0.15; // smoothness of follower
        const stretchFactor = 0.25; // amount of squash & stretch

        let currentWidth = 40
        let currentHeight = 40
        // let currentRadius = "50%"   

        const loop = () => {
            // 1. Determine Target State
            let targetX = mouseX
            let targetY = mouseY
            let targetWidth = 40 // Default size
            let targetHeight = 40
            let targetRadius = "50%"
            let isSnapping = false

            if (hoverTarget.current) {
                isSnapping = true
                const rect = hoverTarget.current.getBoundingClientRect()
                targetX = rect.left + rect.width / 2
                targetY = rect.top + rect.height / 2

                const padding = 15 // Increased padding for thicker border
                targetWidth = rect.width + padding
                targetHeight = rect.height + padding

                const style = window.getComputedStyle(hoverTarget.current)
                targetRadius = style.borderRadius
                if (parseInt(style.borderRadius) >= 50 || Math.abs(rect.width - rect.height) < 5) {
                    targetRadius = "50%"
                }
            }

            // 2. Physics & Interpolation (Main Follower)
            pos.x += (targetX - pos.x) * friction
            pos.y += (targetY - pos.y) * friction

            currentWidth += (targetWidth - currentWidth) * friction
            currentHeight += (targetHeight - currentHeight) * friction

            // Velocity for stretch
            const dx = mouseX - lastMouse.x
            const dy = mouseY - lastMouse.y
            const speed = Math.sqrt(dx * dx + dy * dy)
            const angle = Math.atan2(dy, dx) * 180 / Math.PI

            let scaleX = 1
            let scaleY = 1
            let rotation = 0

            if (!isSnapping && speed > 0.5) {
                const stretch = Math.min(speed * stretchFactor * 0.01, 0.5)
                scaleX = 1 + stretch
                scaleY = 1 - stretch * 0.4
                rotation = angle
            }

            if (isSnapping) {
                rotation = 0
            }

            // Render Main Follower
            gsap.set(follower, {
                x: pos.x,
                y: pos.y,
                width: currentWidth,
                height: currentHeight,
                borderRadius: targetRadius,
                scaleX: scaleX,
                scaleY: scaleY,
                rotation: rotation,
                transformOrigin: "center center"
            })

            // 3. Fluid Trail Logic
            // The trail follows the 'pos' of the main follower, creating a fluid tail

            // First dot's target is the main follower's current position
            let leaderX = pos.x;
            let leaderY = pos.y;

            trailPos.current.forEach((tPos, i) => {
                const dot = trails[i];
                if (!dot) return;


                const trailFriction = 0.35;

                tPos.x += (leaderX - tPos.x) * trailFriction;
                tPos.y += (leaderY - tPos.y) * trailFriction;


                const size = 12 * (1 - (i / trailPos.current.length));

                gsap.set(dot, {
                    x: tPos.x,
                    y: tPos.y,
                    width: size,
                    height: size,
                })

                // Current dot becomes leader for next dot
                leaderX = tPos.x;
                leaderY = tPos.y;
            });

            lastMouse.x = mouseX
            lastMouse.y = mouseY
            requestAnimationFrame(loop)
        }

        const animationFrame = requestAnimationFrame(loop)

        // --------------------------------------------------------
        // EVENT LISTENERS
        // --------------------------------------------------------

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            xTo(mouseX)
            yTo(mouseY)
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Logic to detect interactive elements
            const link = target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('input') ||
                target.closest('.cursor-hover') ||
                (window.getComputedStyle(target).cursor === 'pointer' && target.tagName !== 'HTML' && target.tagName !== 'BODY')

            if (link) {
                hoverTarget.current = link as HTMLElement
            } else {
                hoverTarget.current = null
            }
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseover', onMouseOver)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', onMouseOver)
            cancelAnimationFrame(animationFrame)
            document.body.style.cursor = 'auto'
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Fluid Trail */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    ref={
                        el => {
                            trailRefs.current[i] = el
                        }
                    }
                    className="fixed top-0 left-0 rounded-full bg-white mix-blend-difference pointer-events-none will-change-transform opacity-0"
                />
            ))}

            {/* The Jelly Blob (Follower) */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 border-[3px] border-white bg-white/20 pointer-events-none box-border will-change-transform mix-blend-difference opacity-0"
            />

            {/* The Dot (Cursor) */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none mix-blend-difference opacity-0"
            />
        </div>
    )
}

export default CustomCursor
