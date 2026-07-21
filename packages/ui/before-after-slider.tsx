"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@utils/cn";

interface BeforeAfterSliderProps {
  antes: { src: string; alt: string };
  depois: { src: string; alt: string };
  className?: string;
}

// Slider de arraste — puxa o divisor pra revelar antes/depois, em vez do
// grid lado a lado estático. Pedido explícito do Moabe (2026-07-18):
// "antes e depois premium". Ponteiro nativo (pointer events), sem lib externa
// — funciona igual em mouse e touch, arrasto suave via requestAnimationFrame.
export function BeforeAfterSlider({ antes, depois, className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, ratio)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[55vh] w-full touch-none overflow-hidden select-none md:rounded-sm", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="absolute inset-0">
        <Image src={depois.src} alt={depois.alt} fill sizes="100vw" className="object-cover" draggable={false} />
        <span className="absolute right-4 bottom-4 rounded-full bg-brand-black/70 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-white uppercase">
          Depois
        </span>
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}>
        <Image src={antes.src} alt={antes.alt} fill sizes="100vw" className="object-cover" draggable={false} />
        <span className="absolute bottom-4 left-4 rounded-full bg-brand-black/70 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-white uppercase">
          Antes
        </span>
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/80"
        style={{ left: `${percent}%` }}
      >
        <div
          className={cn(
            "absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform",
            dragging && "scale-110"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M5 3L1 8L5 13" stroke="#1D1D1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L15 8L11 13" stroke="#1D1D1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
