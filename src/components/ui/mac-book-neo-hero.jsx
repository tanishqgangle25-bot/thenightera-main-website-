import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const cx = (...c) => c.filter(Boolean).join(" ");

export function FrameSequenceHero({
  scrollHeight = "400vh",
  brand,
  navLinks = [],
  ctaLabel,
  ctaHref = "#",
  title,
  subtitle,
  steps,
  className,
}) {
  const spacerRef = useRef(null);

  const [navScrolled, setNavScrolled] = useState(false);
  const [subHidden, setSubHidden] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [stepLocal, setStepLocal] = useState(0);

  const onScroll = () => {
    const spacer = spacerRef.current;
    if (!spacer) return;
    const total = spacer.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, total)));
    
    setProgress(p);
    setNavScrolled(window.scrollY > 4);
    setSubHidden(window.scrollY > 8);
    
    let idx = -1;
    let local = 0;
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      if (p >= s.from && p < s.to) {
        idx = i;
        local = (p - s.from) / (s.to - s.from);
        break;
      }
    }
    setActiveIdx(idx);
    setStepLocal(Math.max(0, Math.min(1, local)));
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  return (
    <div className={cx("fsh-root", className)}>
      <nav className={cx("fsh-nav", navScrolled && "fsh-nav-scrolled")}>
        <div className="fsh-brand">{brand}</div>
        {navLinks.length > 0 && (
          <div className="fsh-nav-links">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
        )}
        {ctaLabel && (
          <a href={ctaHref} className="fsh-cta">{ctaLabel}</a>
        )}
      </nav>

      {/* Pinned stage — always full viewport */}
      <div className="fsh-stage" style={{ background: '#FAF7F2' }}>
        
        {/* Dynamic 3D Cards Background */}
        <div className="fsh-canvas-wrap" style={{ perspective: '1200px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {[0, 1, 2, 3, 4].map((i) => {
             // 1. Fan out during scroll
             const normalizedProgress = Math.min(progress / 0.85, 1);
             // 2. Scatter and vanish in the last 15%
             const vanishProgress = Math.max(0, (progress - 0.85) / 0.15);
             
             // Base fan-out (deck of cards)
             const spreadX = (i - 2) * 140 * normalizedProgress;
             const spreadY = (i - 2) * 30 * Math.abs(i - 2) * normalizedProgress;
             const rotateZ = (i - 2) * 12 * normalizedProgress;
             
             // Scatter effect at the end
             const scatterX = (i % 2 === 0 ? 1 : -1) * (i + 1) * 400 * vanishProgress;
             const scatterY = (i - 2) * 600 * vanishProgress;
             const scatterZ = vanishProgress * -800;
             const scatterRotate = (i % 2 === 0 ? 1 : -1) * 180 * vanishProgress;
             
             const finalX = spreadX + scatterX;
             const finalY = spreadY + scatterY;
             const finalZ = (i * 20) + scatterZ;
             const finalRotateZ = rotateZ + scatterRotate;
             
             const opacity = (0.95 - Math.abs(i - 2) * 0.15) * (1 - vanishProgress);
             
             return (
               <div key={i} style={{
                 position: 'absolute',
                 width: '280px',
                 height: '420px',
                 borderRadius: '24px',
                 background: `linear-gradient(135deg, #ff9f3a ${i*5}%, #ff6f9c 100%)`,
                 boxShadow: '0 30px 60px rgba(255,100,50,0.15)',
                 border: '1px solid rgba(255,255,255,0.3)',
                 opacity: opacity,
                 transform: `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateZ(${finalRotateZ}deg)`,
                 transformOrigin: 'center center',
                 transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                 willChange: 'transform, opacity'
               }} />
             )
           })}
        </div>

        <div className="fsh-copy" style={{ zIndex: 5 }}>
          <h1 className="fsh-title" style={{ color: '#1d1d1f' }}>{title}</h1>
          {subtitle && (
            <p className={cx("fsh-sub", subHidden && "fsh-sub-hidden")} style={{ color: '#666' }}>{subtitle}</p>
          )}
        </div>

        <div className="fsh-cards" style={{ zIndex: 20 }}>
          {steps.map((s, i) => {
            const isActive = activeIdx === i;
            const isPrev = activeIdx >= 0 && i < activeIdx;
            // Also vanish if scroll is past the last step entirely
            const isPastAll = progress >= steps[steps.length - 1].to;
            
            return (
              <article
                key={i}
                style={{ "--c": s.color }}
                className={cx(
                  "fsh-card",
                  isActive && "fsh-card-active",
                  (isPrev || isPastAll) && "fsh-card-prev"
                )}
              >
                <div className="fsh-card-inner">
                  <span aria-hidden className="fsh-card-glow" />
                  <div className="fsh-card-head">
                    <span className="fsh-card-num">
                      <strong>{s.num}</strong> / {s.total}
                    </span>
                    <span aria-hidden className="fsh-card-icon">
                      {s.icon ?? "✦"}
                    </span>
                  </div>
                  <h3 className="fsh-card-title">{s.title}</h3>
                  <p className="fsh-card-desc">{s.description}</p>
                  <div className="fsh-card-foot">
                    <div className="fsh-ticks">
                      {steps.map((_, j) => {
                        const done = j < activeIdx || isPastAll;
                        const cur = j === activeIdx && !isPastAll;
                        return (
                          <i key={j} className="fsh-tick">
                            <span
                              style={{
                                transform: `scaleX(${done ? 1 : cur ? stepLocal : 0})`,
                                transition: done ? "none" : "transform 160ms linear",
                              }}
                            />
                          </i>
                        );
                      })}
                    </div>
                    <span className="fsh-card-label">{s.label}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="fsh-progress">
          <span className="fsh-progress-fill" style={{ width: `${progress * 100}%`, background: '#ff9f3a' }} />
        </div>
      </div>

      {/* Empty scroll spacer: gives the page its scroll distance */}
      <div ref={spacerRef} className="fsh-spacer" style={{ height: scrollHeight }} />
    </div>
  );
}
