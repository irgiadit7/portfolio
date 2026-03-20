"use client";

import React, {
  useEffect, useRef, useCallback,
  useState, useMemo, useLayoutEffect,
} from "react";


interface TraitNode { text: string; desc?: string; x: number; y: number; }

interface ConstellationMapProps {
  traits?: { text: string; desc?: string }[];
  className?: string;
}

const DEFAULT_TRAITS = [
  { text: "Software Engineer",  desc: "Specializing in database & scalable systems"  },
  { text: "Product Management", desc: "Turning ideas into products people love"       },
  { text: "Founder SolvinMe",   desc: "Building the professional networking platform of the future" },
  { text: "Startup Partner",    desc: "Let's grow something great together"           },
  { text: "Technology",         desc: "Passionate about what tech can change"         },
  { text: "Critical Thinker",   desc: "Question everything, then build better"        },
  { text: "Cross Platform",     desc: "Web, mobile, and everything in between"        },
  { text: "Robotics Lover",     desc: "Hardware meets software, always curious"       },
];

const NODE_POSITIONS: [number, number][] = [
  [0.14, 0.18], [0.38, 0.10], [0.70, 0.18], [0.88, 0.42],
  [0.75, 0.75], [0.48, 0.82], [0.20, 0.72], [0.08, 0.46],
];

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
  [1,5],[2,6],[0,4],[3,7],
];

const NODE_COLORS = [
  "#a78bfa","#60a5fa","#34d399","#f472b6",
  "#fbbf24","#c084fc","#38bdf8","#fb7185",
];

function getConnectedSet(idx: number): Set<number> {
  const s = new Set<number>([idx]);
  EDGES.forEach(([a, b]) => {
    if (a === idx) s.add(b);
    if (b === idx) s.add(a);
  });
  return s;
}

/* ── Auto-sparkle hook ── */
const SPARKLE_MIN_MS  = 2400;
const SPARKLE_MAX_MS  = 4200;
const SPARKLE_GLOW_MS = 2000;
const NODE_COUNT      = NODE_POSITIONS.length;

function useAutoSparkle(): number {
  const [sparkle, setSparkle] = useState(-1);
  const glowTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastIdx    = useRef(-1);

  useLayoutEffect(() => {
    function scheduleNext() {
      const delay = SPARKLE_MIN_MS + Math.random() * (SPARKLE_MAX_MS - SPARKLE_MIN_MS);
      cycleTimer.current = setTimeout(() => {
        let next = Math.floor(Math.random() * NODE_COUNT);
        if (next === lastIdx.current) next = (next + 1) % NODE_COUNT;
        lastIdx.current = next;
        setSparkle(next);
        glowTimer.current = setTimeout(() => {
          setSparkle(-1);
          scheduleNext();
        }, SPARKLE_GLOW_MS);
      }, delay);
    }
    scheduleNext();
    return () => {
      if (glowTimer.current)  clearTimeout(glowTimer.current);
      if (cycleTimer.current) clearTimeout(cycleTimer.current);
    };
  }, []);

  return sparkle;
}

export const ConstellationMap: React.FC<ConstellationMapProps> = ({
  traits, className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const sizeRef   = useRef({ w: 0, h: 0 });
  const [domSize, setDomSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);

  const sparkle = useAutoSparkle();

  const nodes: TraitNode[] = useMemo(() => {
    const raw = (traits && traits.length > 0 ? traits : DEFAULT_TRAITS).slice(0, 8);
    return raw.map((t, i) => ({
      text: t.text, desc: t.desc,
      x: NODE_POSITIONS[i]?.[0] ?? 0.5,
      y: NODE_POSITIONS[i]?.[1] ?? 0.5,
    }));
  }, [traits]);

  const draw = useCallback((active: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, w * dpr, h * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    const seed = 42;
    for (let i = 0; i < 55; i++) {
      const px = ((seed * (i * 7  + 3) * 1234567) % 997) / 997;
      const py = ((seed * (i * 13 + 7) * 8765431) % 991) / 991;
      const r  = i % 5 === 0 ? 1.2 : i % 3 === 0 ? 0.9 : 0.5;
      const op = i % 4 === 0 ? 0.55 : i % 3 === 0 ? 0.30 : 0.18;
      ctx.beginPath();
      ctx.arc(px * w, py * h, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${op})`;
      ctx.fill();
    }

    const lit = active >= 0 ? getConnectedSet(active) : new Set<number>();

    EDGES.forEach(([a, b]) => {
      if (a >= nodes.length || b >= nodes.length) return;
      const ax = nodes[a].x * w, ay = nodes[a].y * h;
      const bx = nodes[b].x * w, by = nodes[b].y * h;
      const isLit = lit.has(a) && lit.has(b);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
      if (isLit) {
        const g = ctx.createLinearGradient(ax, ay, bx, by);
        g.addColorStop(0,   NODE_COLORS[a] + "cc");
        g.addColorStop(0.5, "#ffffff44");
        g.addColorStop(1,   NODE_COLORS[b] + "cc");
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.9;
      } else {
        ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.lineWidth = 0.8; ctx.globalAlpha = 1;
      }
      ctx.stroke(); ctx.globalAlpha = 1;
    });

    nodes.forEach((node, i) => {
      const x = node.x * w, y = node.y * h;
      const isHi = i === active, isLit = lit.has(i);
      const col  = NODE_COLORS[i % NODE_COLORS.length];
      if (isLit) {
        ctx.beginPath(); ctx.arc(x, y, isHi ? 14 : 10, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(x, y, 0, x, y, isHi ? 14 : 10);
        g.addColorStop(0, col + "44"); g.addColorStop(0.6, col + "22"); g.addColorStop(1, col + "00");
        ctx.fillStyle = g; ctx.fill();
      }
      const dotR = isHi ? 5.5 : isLit ? 4 : 2.5;
      ctx.beginPath(); ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = isLit ? col : "rgba(255,255,255,0.35)"; ctx.fill();
      if (isLit) {
        ctx.beginPath(); ctx.arc(x, y, dotR * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; ctx.fill();
      }
    });
    ctx.restore();
  }, [nodes]);

  const resize = useCallback(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    sizeRef.current = { w, h };
    setDomSize({ w, h });
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    draw(sparkle);
  }, [draw, sparkle]);

  useEffect(() => { draw(sparkle); }, [sparkle, draw]);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [resize]);

  const tooltipStyle = (): React.CSSProperties => {
    if (sparkle < 0 || !domSize.w || !domSize.h) return { display: "none", opacity: 0 };
    const { w, h } = domSize;
    const nx = nodes[sparkle].x * w;
    const ny = nodes[sparkle].y * h;
    const flipX  = nx > w * 0.60;
    const nearTop = ny < h * 0.24;
    return {
      position:      "absolute",
      left:          flipX   ? "auto"      : nx + 14,
      right:         flipX   ? w - nx + 14 : "auto",
      top:           nearTop ? ny + 26     : "auto",
      bottom:        nearTop ? "auto"      : h - ny + 20,
      pointerEvents: "none",
      transition:    "opacity 0.35s",
      opacity:       1,
      zIndex:        20,
    };
  };

  return (
    <div ref={wrapRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(92,51,204,0.13) 0%, transparent 55%)," +
          "radial-gradient(ellipse at 80% 70%, rgba(56,189,248,0.08) 0%, transparent 50%)",
      }} />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute top-3 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/50 border border-white/10 bg-white/5 backdrop-blur-sm pointer-events-none select-none">
        <span style={{ fontSize: 10 }}>✦</span>
        Watch the constellation
      </div>

      <p className="absolute inset-0 flex items-center justify-center text-[2.2rem] font-black text-white/[0.03] select-none pointer-events-none tracking-widest">
        WHO AM I?
      </p>

      {mounted && sparkle >= 0 && (
        <div style={tooltipStyle()}>
          <div
            className="px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border border-white/15 shadow-xl"
            style={{
              background: "rgba(10,13,31,0.94)",
              color:      NODE_COLORS[sparkle % NODE_COLORS.length],
              minWidth:   120, maxWidth: 180, lineHeight: 1.5,
            }}
          >
            <p className="text-white font-bold mb-0.5" style={{ fontSize: 12 }}>
              {nodes[sparkle]?.text}
            </p>
            {nodes[sparkle]?.desc && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: 11 }}>
                {nodes[sparkle].desc}
              </p>
            )}
          </div>
        </div>
      )}

      {mounted && nodes.map((node, i) => {
        const { w, h } = domSize;
        if (!w || !h) return null;
        const px    = node.x * w;
        const py    = node.y * h;
        const isHi  = i === sparkle;
        const lit   = sparkle >= 0 ? getConnectedSet(sparkle) : new Set<number>();
        const isLit = lit.has(i);
        const col   = NODE_COLORS[i % NODE_COLORS.length];
        const flipX = px > w * 0.68;

        return (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left:          flipX ? "auto" : px + 10,
              right:         flipX ? w - px + 10 : "auto",
              top:           py + 10,
              fontSize:      10,
              fontWeight:    isHi ? 700 : 500,
              color:         isLit ? col : "rgba(255,255,255,0.20)",
              letterSpacing: "0.04em",
              whiteSpace:    "nowrap",
              textShadow:    isLit ? `0 0 8px ${col}88` : "none",
              opacity:       sparkle >= 0 && !isLit ? 0.30 : 1,
              transition:    "color 0.3s, text-shadow 0.3s, opacity 0.3s",
            }}
          >
            {node.text}
          </div>
        );
      })}
    </div>
  );
};