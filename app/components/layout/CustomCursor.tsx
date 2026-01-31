"use client"

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [cursorText, setCursorText] = useState("")

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        gsap.set(cursor, { xPercent: -50, yPercent: -50 })

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" })
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" })

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX)
            yTo(e.clientY)
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            const isBig = target.closest('[data-cursor="big"]')
          
            const isLink = target.tagName === 'A' || target.closest('a')
            const isButton = target.tagName === 'BUTTON' || target.closest('button') || target.closest('.cursor-hover') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT'

            const isHeading = target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.closest('.h-word')

            const isPointer = window.getComputedStyle(target).cursor === 'pointer'

          
            if (isLink || isButton || isPointer) {
                setIsHovered(true)
                setCursorText("View")
            } else if (isBig || isHeading) {
                setIsHovered(true)
                setCursorText("")
            } else {
                setIsHovered(false)
                setCursorText("")
            }
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseover', onMouseOver)

        document.body.style.cursor = 'none'

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', onMouseOver)
            document.body.style.cursor = 'auto'
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 pointer-events-none z-9999 rounded-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center ${isHovered ? 'w-24 h-24 bg-white scale-100' : 'w-6 h-6 border border-brand-text/40 scale-100'
                }`}
            style={{
                mixBlendMode: isHovered ? 'difference' : 'normal',
            }}
        >
            <span className={`text-brand-text font-mono text-[10px] uppercase font-bold tracking-widest transition-opacity duration-300 ${isHovered && cursorText ? 'opacity-100' : 'opacity-0'
                }`}>
                {cursorText}
            </span>
        </div>
    )
}

export default CustomCursor
