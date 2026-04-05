"use client";

import React, { CSSProperties } from 'react';

export interface ShadowOverlayProps {
    sizing?: 'fill' | 'stretch' | 'cover';
    color?: string;
    animation?: { scale: number; speed: number; };
    noise?: { opacity: number; scale: number; };
    style?: CSSProperties;
    className?: string;
}

const CSS_KEYFRAMES = `
@keyframes nebula-spin {
    0%   { transform: rotate(0deg)   scale(1)   translate(0px, 0px);   }
    33%  { transform: rotate(120deg) scale(1.1) translate(20px, -20px);}
    66%  { transform: rotate(240deg) scale(0.9) translate(-20px, 20px);}
    100% { transform: rotate(360deg) scale(1)   translate(0px, 0px);   }
}
@keyframes nebula-spin-reverse {
    0%   { transform: rotate(360deg) scale(1)   translate(0px, 0px);   }
    33%  { transform: rotate(240deg) scale(1.2) translate(-30px, -10px);}
    66%  { transform: rotate(120deg) scale(0.8) translate(30px, 10px); }
    100% { transform: rotate(0deg)   scale(1)   translate(0px, 0px);   }
}
`;

export function BackgroundPaperShaders({
    sizing = 'fill',
    color = 'rgba(255, 255, 255, 0.05)',
    animation = { scale: 50, speed: 40 },
    noise = { opacity: 0.6, scale: 1 },
    style,
    className
}: ShadowOverlayProps) {
    const speed = animation?.speed ?? 40;
    const spinDuration = Math.max(20, 100 - speed);

    const maskUrl = 'url(\'https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png\')';
    const noiseUrl = 'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")';

    return (
        <div
            className={className}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: '#050505',
                pointerEvents: 'none',
                zIndex: -10,
                ...style
            }}
        >
            <style dangerouslySetInnerHTML={{ __html: CSS_KEYFRAMES }} />

            {/* Nebula layer 1 */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%',
                width: '70%', height: '70%',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(40,40,40,0.5) 0%, rgba(0,0,0,0) 60%)',
                animation: `nebula-spin ${spinDuration}s ease-in-out infinite`,
                filter: 'blur(80px)',
                transformOrigin: '50% 50%'
            }} />

            {/* Nebula layer 2 */}
            <div style={{
                position: 'absolute', bottom: '-20%', right: '-20%',
                width: '80%', height: '80%',
                backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(50,50,50,0.35) 0%, rgba(0,0,0,0) 60%)',
                animation: `nebula-spin-reverse ${spinDuration * 1.5}s ease-in-out infinite`,
                filter: 'blur(100px)',
                transformOrigin: '40% 60%'
            }} />

            {/* Brand accent aura (#FF7A00) */}
            <div style={{
                position: 'absolute', top: '20%', right: '10%',
                width: '40%', height: '40%',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,122,0,0.05) 0%, rgba(0,0,0,0) 60%)',
                animation: `nebula-spin ${spinDuration * 1.2}s ease-in-out infinite`,
                filter: 'blur(60px)',
                transformOrigin: '60% 40%'
            }} />

            {/* Paper texture mask overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: color,
                maskImage: maskUrl,
                WebkitMaskImage: maskUrl,
                maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
                WebkitMaskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                width: '100%', height: '100%',
                opacity: 0.8
            }} />

            {/* Film grain noise */}
            {noise && noise.opacity > 0 && (
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: noiseUrl,
                    backgroundSize: noise.scale * 200,
                    backgroundRepeat: 'repeat',
                    opacity: noise.opacity / 2,
                    zIndex: 10
                }} />
            )}
        </div>
    );
}
