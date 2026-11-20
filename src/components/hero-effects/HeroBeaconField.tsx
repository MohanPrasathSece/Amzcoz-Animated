import { useEffect, useRef } from "react";

export function HeroBeaconField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.45;

      const ringCount = 5;
      for (let i = 0; i < ringCount; i++) {
        const progress = ((t * 0.008 + i / ringCount) % 1);
        const radius = progress * (w * 0.42);
        const alpha = Math.sin(progress * Math.PI) * 0.28;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Secondary subtle inner glow
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Center soft radial beacon
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
      grad.addColorStop(0, "rgba(59, 130, 246, 0.20)");
      grad.addColorStop(0.5, "rgba(14, 165, 233, 0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      if (!reducedMotion) {
        t += 1;
        animId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full opacity-45 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/50" />
    </div>
  );
}
