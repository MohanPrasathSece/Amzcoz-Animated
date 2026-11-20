import { GlassFold } from "@/components/ui/glass-fold";

interface HeroGlassFoldProps {
  className?: string;
  speed?: number;
  opacity?: string;
}

export function HeroGlassFold({
  className = "",
  speed = 0.25,
  opacity = "opacity-30 sm:opacity-35",
}: HeroGlassFoldProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Animated WebGL Glass Fold Shader with gentle line folds */}
      <div className={`w-full h-full ${opacity} mix-blend-screen transition-opacity duration-1000`}>
        <GlassFold
          color1="#183ec9"
          color2="#040614"
          color3="#68b4ff"
          speed={speed}
          scale={0.88}
          noise={0.06}
          className="w-full h-full"
        />
      </div>

      {/* Gentle gradient overlay to keep hero text high-contrast and readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/50" />
    </div>
  );
}
