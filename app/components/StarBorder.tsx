import React from 'react';

type StarBorderProps<T extends React.ElementType> = {
    as?: T;
    className?: string;
    color?: string;
    speed?: string;
    thickness?: number;
    children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const StarBorder = React.forwardRef<HTMLElement, StarBorderProps<React.ElementType>>(
    ({ as, className = '', color = 'magenta', speed = '10s', thickness = 4, children, ...rest }, ref) => {
        const Component = as || 'button';

        return (
            <Component
                ref={ref}
                className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
                style={{
                    padding: `${thickness}px`,
                    ...(rest.style as React.CSSProperties)
                }}
                {...rest}
            >
                <div
                    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] opacity-100 z-0 animate-spin"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0%, ${color} 10%, transparent 20%)`,
                        animationDuration: speed
                    }}
                ></div>
                <div className="relative z-1 h-full w-full bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
                    {children}
                </div>
            </Component>
        );
    }
);

StarBorder.displayName = 'StarBorder';

export default StarBorder;
