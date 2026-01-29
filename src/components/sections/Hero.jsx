// src/components/sections/Hero.jsx
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Camera, MessageCircle } from "lucide-react";
import CinematicAtmosphere from "../ui/CinematicAtmosphere";

/**
 * ParticleRingButton (PRO)
 * - Canvas orbit ring alrededor del botón
 * - Hover: más energía controlada (velocidad + glow)
 */
const ParticleRingButton = ({ onClick, label = "RESERVAR POR WHATSAPP" }) => {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const particlesRef = React.useRef([]);
  const rafRef = React.useRef(null);
  const hoverRef = React.useRef(false);
  const disposedRef = React.useRef(false);

  const rand = (a, b) => a + Math.random() * (b - a);

  React.useEffect(() => {
    disposedRef.current = false;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Partículas (pocas, premium)
    const COUNT = 18;
    particlesRef.current = Array.from({ length: COUNT }).map((_, i) => ({
      angle: (i / COUNT) * Math.PI * 2,
      speed: rand(0.25, 0.45),
      size: rand(1.2, 2.0),
      alpha: rand(0.5, 0.9),
    }));

    let last = performance.now();

    const loop = (t) => {
      if (disposedRef.current) return;

      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Radio del anillo: un poco más grande que el botón
      const radius = Math.min(cx, cy) + 10;

      const isHover = hoverRef.current;
      const ringAlpha = isHover ? 0.28 : 0.18;
      const ringBlur = isHover ? 22 : 14;
      const particleBlur = isHover ? 18 : 10;
      const speedBoost = isHover ? 1.6 : 1.0;

      // Anillo glow
      ctx.save();
      ctx.globalAlpha = ringAlpha;
      ctx.strokeStyle = "rgba(16,185,129,1)";
      ctx.lineWidth = 1.1;
      ctx.shadowColor = "rgba(16,185,129,1)";
      ctx.shadowBlur = ringBlur;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Partículas orbitando
      for (const p of particlesRef.current) {
        p.angle += p.speed * speedBoost * dt;

        const x = cx + Math.cos(p.angle) * radius;
        const y = cy + Math.sin(p.angle) * radius;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "rgba(16,185,129,1)";
        ctx.shadowColor = "rgba(16,185,129,1)";
        ctx.shadowBlur = particleBlur;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      disposedRef.current = true;
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />
      <button
        onClick={onClick}
        aria-label="Reservar por WhatsApp"
        className="relative z-20 group flex items-center gap-3 rounded-2xl bg-emerald-500 px-8 py-4 font-black text-slate-950 transition-all hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
      >
        <MessageCircle className="h-5 w-5 fill-slate-950" />
        {label}
      </button>
    </div>
  );
};

const Hero = ({ handleScrollTo, handleWhatsAppClick }) => {
  // Spotlight/parallax para overlays (suave)
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 120, damping: 30, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 30, mass: 0.6 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  // Parallax leve del fondo (CSS transform)
  const bgX = useTransform(sx, [0, 100], ["-1.5%", "1.5%"]);
  const bgY = useTransform(sy, [0, 100], ["-1.0%", "1.0%"]);
  const fogX = useTransform(sx, [0, 100], ["-3%", "3%"]);
  const fogY = useTransform(sy, [0, 100], ["-2%", "2%"]);

  const spotlightBg = useTransform([sx, sy], ([x, y]) => {
    return `radial-gradient(320px 240px at ${x}% ${y}%, rgba(16,185,129,0.22), transparent 70%)`;
  });

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-[100svh] w-full overflow-hidden bg-slate-950"
      style={{ isolation: "isolate" }}
    >
      {/* WebGL Atmosphere */}
      <CinematicAtmosphere className="z-10 opacity-[0.55]" />

      {/* FOTO (capa base) */}
      <motion.div className="absolute inset-0 z-0" style={{ x: bgX, y: bgY }}>
        <img
          src="https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/d0a5dc6dd8e2452585e9bb979b8767d8.jpg"
          alt="Refugio Scholer Frutillar"
          className="h-full w-full object-cover opacity-45"
          loading="eager"
        />
        {/* Vignette cinematográfica */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.92)_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-transparent to-slate-950" />
      </motion.div>

      {/* NIEBLA / FOG */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.35] mix-blend-screen"
        style={{
          x: fogX,
          y: fogY,
          background:
            "radial-gradient(60% 50% at 20% 40%, rgba(16,185,129,0.16), transparent 60%), radial-gradient(50% 40% at 80% 60%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      {/* SPOTLIGHT */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: spotlightBg, opacity: 0.28 }}
      />

      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
        }}
      />

      {/* CONTENIDO */}
      <div className="relative z-30 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-12 items-center gap-6 px-6 py-14">
        {/* IZQUIERDA */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="col-span-12 lg:col-span-7 text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-black tracking-[0.45em] text-white/65 uppercase">
              Frutillar Bajo — Chile
            </span>
          </div>

          <h1 className="text-[clamp(3.2rem,7vw,6.8rem)] font-black leading-[0.88] tracking-tight text-white">
            REFUGIO{" "}
            <span className="block bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent italic">
              SCHOLER
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
            A 3 cuadras del Lago Llanquihue. Comodidad familiar, descanso real y
            precios accesibles todo el año.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ParticleRingButton onClick={handleWhatsAppClick} />
            </motion.div>

            <button
              onClick={() => handleScrollTo("galeria")}
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
            >
              <Camera className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              Ver Fotos
            </button>
          </div>
        </motion.div>

        {/* DERECHA: Glass card */}
        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="col-span-12 lg:col-span-5"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.10)]">
            <div className="mb-4 text-[11px] font-black tracking-[0.35em] text-emerald-300/80 uppercase">
              Lo esencial
            </div>

            <ul className="space-y-3 text-slate-200">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400/80" />
                <span>Ubicación tranquila, caminable al lago.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400/80" />
                <span>Ideal para estadías familiares y descanso.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400/80" />
                <span>Reserva directa por WhatsApp, sin fricción.</span>
              </li>
            </ul>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-400/60 via-white/10 to-transparent" />
            <div className="mt-4 font-mono text-[10px] text-emerald-400/70">
              // FEEL: warm-premium · // FOCUS: conversion
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;
