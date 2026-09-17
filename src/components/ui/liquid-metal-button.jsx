import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const shaderRef = useRef(null);
  const shaderMount = useRef(null);
  const buttonRef = useRef(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return { width: 46, height: 46, innerWidth: 42, innerHeight: 42, shaderWidth: 46, shaderHeight: 46 };
    }
    return { width: 152, height: 46, innerWidth: 148, innerHeight: 42, shaderWidth: 152, shaderHeight: 46 };
  }, [viewMode]);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important; height: 100% !important;
          display: block !important; position: absolute !important;
          top: 0 !important; left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) shaderMount.current.destroy();
          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            { u_repetition: 4, u_softness: 0.5, u_shiftRed: 0.3, u_shiftBlue: 0.3, u_distortion: 0, u_contour: 0, u_angle: 45, u_scale: 8, u_shape: 1, u_offsetX: 0.1, u_offsetY: -0.1 },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("[LiquidMetalButton] shader error:", error);
      }
    };
    loadShader();
    return () => { if (shaderMount.current?.destroy) { shaderMount.current.destroy(); shaderMount.current = null; } };
  }, []);

  const handleMouseEnter = () => { setIsHovered(true); shaderMount.current?.setSpeed?.(1); };
  const handleMouseLeave = () => { setIsHovered(false); setIsPressed(false); shaderMount.current?.setSpeed?.(0.6); };

  const handleClick = (e) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6), 300);
    }
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
      setRipples(prev => [...prev, ripple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== ripple.id)), 600);
    }
    onClick?.();
  };

  const { width, height, innerWidth, innerHeight, shaderWidth, shaderHeight } = dimensions;
  const spring = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
  const pressT = isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
        <div style={{ position: "relative", width: `${width}px`, height: `${height}px`, transformStyle: "preserve-3d", transition: spring }}>

          {/* Label */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transformStyle: "preserve-3d", transform: "translateZ(20px)", zIndex: 30, pointerEvents: "none", transition: spring }}>
            {viewMode === "icon" && <Sparkles size={16} style={{ color: "#888", filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))" }} />}
            {viewMode === "text" && <span style={{ fontSize: "13px", color: "#888", fontWeight: 500, textShadow: "0px 1px 2px rgba(0,0,0,0.5)", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{label}</span>}
          </div>

          {/* Inner dark pill */}
          <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `translateZ(10px) ${pressT}`, zIndex: 20, transition: spring }}>
            <div style={{ width: `${innerWidth}px`, height: `${innerHeight}px`, margin: "2px", borderRadius: "100px", background: "linear-gradient(180deg,#202020 0%,#000 100%)", boxShadow: isPressed ? "inset 0 2px 4px rgba(0,0,0,0.4)" : "none", transition: `${spring}, box-shadow 0.15s` }} />
          </div>

          {/* Shader */}
          <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `translateZ(0px) ${pressT}`, zIndex: 10, transition: spring }}>
            <div style={{ width: `${width}px`, height: `${height}px`, borderRadius: "100px", boxShadow: isPressed ? "0 0 0 1px rgba(0,0,0,0.5)" : isHovered ? "0 0 0 1px rgba(0,0,0,0.4), 0 12px 6px rgba(0,0,0,0.05), 0 8px 5px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.15)" : "0 0 0 1px rgba(0,0,0,0.3), 0 9px 9px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.15)", transition: `${spring}, box-shadow 0.15s`, background: "transparent" }}>
              <div ref={shaderRef} className="shader-container-exploded" style={{ borderRadius: "100px", overflow: "hidden", position: "relative", width: `${shaderWidth}px`, height: `${shaderHeight}px` }} />
            </div>
          </div>

          {/* Click target */}
          <button ref={buttonRef} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)}
            style={{ position: "absolute", inset: 0, background: "transparent", border: "none", cursor: "pointer", outline: "none", zIndex: 40, transformStyle: "preserve-3d", transform: "translateZ(25px)", overflow: "hidden", borderRadius: "100px", width: `${width}px`, height: `${height}px` }}
            aria-label={label}
          >
            {ripples.map(r => (
              <span key={r.id} style={{ position: "absolute", left: `${r.x}px`, top: `${r.y}px`, width: "20px", height: "20px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", animation: "ripple-animation 0.6s ease-out" }} />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
