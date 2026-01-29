"use client";

import { createContext, useContext, useRef } from "react";
import gsap from "gsap";

type GsapTimelineContextType = React.MutableRefObject<gsap.core.Timeline> | null;

const GsapContext = createContext<GsapTimelineContextType>(null);

export function GsapProvider({ children }: { children: React.ReactNode }) {
    const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

    return (
        <GsapContext.Provider value={tl}>
            {children}
        </GsapContext.Provider>
    );
}

export const useGsapTimeline = () => {
    const context = useContext(GsapContext);
    if (!context) throw new Error("useGsapTimeline must be used inside a GsapProvider");
    return context;
};
