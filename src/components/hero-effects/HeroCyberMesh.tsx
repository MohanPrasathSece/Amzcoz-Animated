import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  isSparkle: boolean;
  spikeLength?: number;
}

export function HeroCyberMesh({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Generate constellation nodes
    const nodeCount = 48;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 1.2,
      });
    }

    // Generate rich ambient and sparkling stars
    const starCount = 150;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const isSparkle = i % 7 === 0; // ~22 diamond 4-point sparkle stars
      stars.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        radius: isSparkle ? Math.random() * 1.5 + 1.2 : Math.random() * 1.3 + 0.6,
        baseAlpha: Math.random() * 0.5 + 0.45,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        isSparkle,
        spikeLength: isSparkle ? Math.random() * 4 + 4 : 0,
      });
    }

    // Draw 4-point diamond star sparkle
    const drawSparkle = (cx: number, cy: number, length: number, alpha: number) => {
      ctx.save();
      ctx.strokeStyle = `rgba(224, 242, 254, ${alpha * 0.85})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Horizontal spike
      ctx.moveTo(cx - length, cy);
      ctx.lineTo(cx + length, cy);
      // Vertical spike
      ctx.moveTo(cx, cy - length);
      ctx.lineTo(cx, cy + length);
      ctx.stroke();

      // Soft circular star core
      ctx.beginPath();
      ctx.arc(cx, cy, length * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = "rgba(125, 211, 252, 0.9)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      tick++;

      // 1. Draw ambient twinkling stars & sparkles
      stars.forEach((star) => {
        const pulse = Math.sin(tick * star.twinkleSpeed + star.phase);
        const alpha = Math.max(0.18, Math.min(1, star.baseAlpha + pulse * 0.35));

        if (star.isSparkle && star.spikeLength) {
          const currentSpike = star.spikeLength * (1 + pulse * 0.3);
          drawSparkle(star.x, star.y, currentSpike, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * (1 + pulse * 0.15), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
          if (alpha > 0.6) {
            ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
            ctx.shadowBlur = 6;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Gentle cosmic upward drift
        if (!reducedMotion) {
          star.y -= 0.04;
          if (star.y < 0) {
            star.y = h;
            star.x = Math.random() * w;
          }
        }
      });

      // 2. Draw constellation connection lines
      const maxDist = 135;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw moving constellation nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(186, 230, 253, 0.9)";
        ctx.shadowColor = "rgba(14, 165, 233, 0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
        }
      });

      if (!reducedMotion) {
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
      <canvas ref={canvasRef} className="w-full h-full opacity-85 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/40" />
    </div>
  );
}
