import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

/**
 * 3D tilt wrapper for cards. Uses perspective + rotateX/rotateY on the child.
 * Respects prefers-reduced-motion by rendering a plain div.
 */
export function Tilt({ children, className, max = 8, scale = 1.02 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const s = useSpring(1, { stiffness: 200, damping: 20 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseEnter={() => s.set(scale)}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
        s.set(1);
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        scale: s,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
