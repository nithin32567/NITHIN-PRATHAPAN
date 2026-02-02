"use client"

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null) // The small dot
    const followerRef = useRef<HTMLDivElement>(null) // The large jelly blob

    const [isHovered, setIsHovered] = useState(false)

    // Store the actual element to track its live position
    const hoverTarget = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current

        if (!cursor || !follower) return

        // Check for touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        // Hide default cursor
        document.body.style.cursor = 'none'

        // Initial setup
        gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 })

        // Appear aniamtion
        gsap.to([cursor, follower], { opacity: 1, duration: 0.5, delay: 0.2 })

        // --------------------------------------------------------
        // MOVEMENT LOGIC
        // --------------------------------------------------------
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" })
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" })

        // We use a regular tween for the follower in the loop to mix physics + snapping
        const pos = { x: 0, y: 0 }
        const vel = { x: 0, y: 0 }
        const lastMouse = { x: 0, y: 0 }

        let mouseX = 0
        let mouseY = 0

        // Config
        const friction = 0.15; // smoothness of follower
        const rotationSpeed = 0.15; // how much it rotates
        const stretchFactor = 0.15; // how much it stretches

        let currentWidth = 40
        let currentHeight = 40
        let currentRadius = "50%"

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

                // Live rect reading for perfect stickiness
                const rect = hoverTarget.current.getBoundingClientRect()

                targetX = rect.left + rect.width / 2
                targetY = rect.top + rect.height / 2

                // Add padding to specific elements if needed, or general padding
                const padding = 10
                targetWidth = rect.width + padding
                targetHeight = rect.height + padding

                // Get style
                const style = window.getComputedStyle(hoverTarget.current)
                targetRadius = style.borderRadius

                // Special case: if it's a circle (like a round icon button), ensure perfect circle
                if (parseInt(style.borderRadius) >= 50 || Math.abs(rect.width - rect.height) < 5) {
                    targetRadius = "50%"
                }
            }

            // 2. Physics & Interpolation

            // Lerp position (smooth follow)
            pos.x += (targetX - pos.x) * friction
            pos.y += (targetY - pos.y) * friction

            // Lerp dimensions (smooth shape change)
            currentWidth += (targetWidth - currentWidth) * friction
            currentHeight += (targetHeight - currentHeight) * friction

            // Calculate Velocity relative to MOUSE (for stretch effect)
            // If snapping, we suppress stretch to avoid jitter
            const dx = mouseX - lastMouse.x
            const dy = mouseY - lastMouse.y
            const speed = Math.sqrt(dx * dx + dy * dy)
            const angle = Math.atan2(dy, dx) * 180 / Math.PI

            // Apply Stretch
            // Only stretch if NOT snapping and velocity is significant
            let scaleX = 1
            let scaleY = 1
            let rotation = 0

            if (!isSnapping && speed > 0.5) {
                const stretch = Math.min(speed * stretchFactor * 0.01, 0.4) // Cap stretch
                scaleX = 1 + stretch
                scaleY = 1 - stretch * 0.4
                rotation = angle
            }

            // If snapping, we align rotation to 0
            if (isSnapping) {
                rotation = 0
            }

            // 3. Render
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
                setIsHovered(true)
            } else {
                hoverTarget.current = null
                setIsHovered(false)
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
        <div className="hidden lg:block fixed inset-0 pointer-events-none z-[9999]">
            {/* The Jelly Blob (Follower) */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 border-[1px] border-black/50 dark:border-white/50 bg-transparent pointer-events-none box-border will-change-transform"
                style={{
                    backdropFilter: "invert(100%)",
                }}
            />

            {/* The Dot (Cursor) */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none mix-blend-difference"
                style={{
                    backdropFilter: "invert(100%)"
                }}
            />
        </div>
    )
}

export default CustomCursor
