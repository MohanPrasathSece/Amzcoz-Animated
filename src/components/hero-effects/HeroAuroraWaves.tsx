import { useEffect, useRef } from "react";

export function HeroAuroraWaves({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

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

      const waves = [
        { amp: 45, freq: 0.0018, speed: 0.012, color: "rgba(30, 90, 240, 0.22)", yOffset: h * 0.45 },
        { amp: 60, freq: 0.0014, speed: -0.009, color: "rgba(6, 182, 212, 0.18)", yOffset: h * 0.52 },
        { amp: 40, freq: 0.0022, speed: 0.015, color: "rgba(99, 102, 241, 0.16)", yOffset: h * 0.60 },
        { amp: 50, freq: 0.0016, speed: -0.011, color: "rgba(14, 165, 233, 0.20)", yOffset: h * 0.68 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 8) {
          const y =
            wave.yOffset +
            Math.sin(x * wave.freq + time * wave.speed) * wave.amp +
            Math.cos(x * wave.freq * 0.5 + time * wave.speed * 0.7) * (wave.amp * 0.5);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      if (!reducedMotion) {
        time += 1;
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
