import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type EmojiParticle = {
  id: number;
  emoji: string;
  x: number;
  y: number;
};

const IOS_EMOJIS = [
  "✨","💖","🌈","🎉","🦋","🌸","💫","🍀","☁️","🌟","😊","🥳","🫶","🌼","🌙","😌","🤍","💙","💚","🧘"
];

function getViewportRoot(): HTMLElement {
  const existing = document.getElementById("easter-eggs-root");
  if (existing) return existing as HTMLElement;
  const root = document.createElement("div");
  root.id = "easter-eggs-root";
  root.style.position = "fixed";
  root.style.inset = "0";
  root.style.pointerEvents = "none";
  root.style.zIndex = "60"; // above fab, below modals if needed
  document.body.appendChild(root);
  return root;
}

const useKonami = (onTrigger: () => void) => {
  useEffect(() => {
    const sequence = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"
    ];
    const buffer: string[] = [];
    const handler = (e: KeyboardEvent) => {
      buffer.push(e.key);
      if (buffer.length > sequence.length) buffer.shift();
      if (sequence.every((k, i) => buffer[i] === k)) {
        onTrigger();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onTrigger]);
};

export default function EasterEggs() {
  const [particles, setParticles] = useState<EmojiParticle[]>([]);
  const idRef = useRef(0);

  const spawnBurst = (centerX: number, centerY: number, count = 16) => {
    const created: EmojiParticle[] = Array.from({ length: count }).map(() => ({
      id: idRef.current++,
      emoji: IOS_EMOJIS[Math.floor(Math.random() * IOS_EMOJIS.length)],
      x: centerX + (Math.random() * 40 - 20),
      y: centerY + (Math.random() * 20 - 10),
    }));
    setParticles(prev => [...prev, ...created]);
    // Cleanup after animation ends
    setTimeout(() => {
      const ids = created.map(p => p.id);
      setParticles(prev => prev.filter(p => !ids.includes(p.id)));
    }, 1600);
  };

  useKonami(() => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    spawnBurst(vw / 2, vh / 2, 24);
  });

  useEffect(() => {
    const root = getViewportRoot();
    const triggerClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const inTrigger = target?.closest('[data-emoji-trigger]');
      if (inTrigger) {
        spawnBurst(e.clientX, e.clientY, 18);
      }
    };
    document.addEventListener("click", triggerClick);
    return () => document.removeEventListener("click", triggerClick);
  }, []);

  const portalRoot = typeof document !== "undefined" ? getViewportRoot() : null;

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="emoji select-none"
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            fontSize: Math.round(18 + Math.random() * 12),
          }}
          initial={{ opacity: 0, y: 10, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, y: -40 - Math.random() * 40, scale: 1, rotate: Math.random() * 30 - 15 }}
          exit={{ opacity: 0, y: -80, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, duration: 1.2 }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </AnimatePresence>,
    portalRoot
  );
}


