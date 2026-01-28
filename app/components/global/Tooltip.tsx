"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TooltipProps {
    text: string,
    children: ReactNode
}

export default function Tooltip({ text, children }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const tooltipref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!tooltipref.current) return;

        if (visible) {
            gsap.to(tooltipref.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out",
            });
        } else {
            gsap.to(tooltipref.current, {
                autoAlpha: 0,
                y: -20,
                duration: 0.2,
                ease: "power2.in",
            });
        }


    }, [visible])
    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}


            <div ref={tooltipref} style={tooltipStyle}>
                {text}
            </div>

        </div>
    );
}


const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "-200%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#000",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    zIndex: 1000,
    opacity: 0,
    pointerEvents: "none",
    // visibility: "hidden",
    transformOrigin: "top center",
}