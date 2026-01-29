import React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MapPin, Camera, MessageCircle } from 'lucide-react';

/**
 * ParticleRingButton (versión PRO corregida)
 * - Anillo perfectamente centrado (canvas inset-0)
 * - Radio acoplado al tamaño real del botón
 * - Pocas partículas (limpio, premium)
 * - Hover = más energía controlada (velocidad + glow)
 */
const ParticleRingButton = ({ onClick, label = 'RESERVAR POR WHATSAPP' }) => {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const particlesRef = React.useRef([]);
  const rafRef = React.useRef(null);
  const hoverRef = React.useRef(false);

  const rand = (a, b) => a + Math.random() * (b - a);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
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

    // Partículas (pocas y distribuidas)
    const COUNT = 18;
    particlesRef.current = Array.from({ length: COUNT }).map((_, i) => ({
      angle: (i / COUNT) * Math.PI * 2,
      speed: rand(0.25, 0.45),
      size: rand(1.2, 2.0),
      alpha: rand(0.5, 0.9),
    }));

    let last = performance.now();

    const loop = (t) => {
      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      // Limpiar a escala CSS (porque ya setTransform con dpr)
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

      // Anillo limpio (glow)
      ctx.save();
      ctx.globalAlpha = ringAlpha;
      ctx.strokeStyle = 'rgba(16,185,129,1)'; // emerald-500
      ctx.lineWidth = 1.1;
      ctx.shadowColor = 'rgba(16,185,129,1)';
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
        ctx.fillStyle = 'rgba(16,185,129,1)';
        ctx.shadowColor = 'rgba(16,185,129,1)';
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
      {/* Canvas alineado exactamente al botón */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />

      <button
        onClick={onClick}
        className="relative z-20 group flex items-center gap-3 rounded-2xl bg-emerald-500 px-8 py-4 font-black text-slate-950 transition-all hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.45)]"
      >
        <MessageCircle className="h-5 w-5 fill-slate-950" />
        {label}
      </button>
    </div>
  );
};

const Hero = ({ handleScrollTo, handleWhatsAppClick }) => {
  // Mouse / física para parallax suave del contenido
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  const spring = { stiffness: 80, damping: 20, mass: 0.6 };
  const sx = useSpring(mouseX, spring);
  const sy = useSpring(mouseY, spring);

  const rafMoveRef = React.useRef(null);

  React.useEffect(() => {
    const setCenter = () => {
      centerX.set(window.innerWidth / 2);
      centerY.set(window.innerHeight / 2);
    };
    setCenter();
    window.addEventListener('resize', setCenter);
    return () => window.removeEventListener('resize', setCenter);
  }, [centerX, centerY]);

  const handleMouseMove = (e) => {
    if (rafMoveRef.current) return;
    rafMoveRef.current = requestAnimationFrame(() => {
      const dx = e.clientX - centerX.get();
      const dy = e.clientY - centerY.get();
      mouseX.set(dx);
      mouseY.set(dy);
      rafMoveRef.current = null;
    });
  };

  // Distancia para atenuar fuerza (más cerca del centro, más efecto)
  const distance = useTransform([sx, sy], ([x, y]) => Math.sqrt(x * x + y * y));
  const force = useTransform(distance, [0, 650], [1, 0]);

  // Contenido: masa grande
  const contentX = useTransform([sx, force], ([x, f]) => x * f * 0.03);
  const contentY = useTransform([sy, force], ([y, f]) => y * f * 0.03);

  // Glow del hero
  const glowOpacity = useTransform(force, [0, 1], [0, 0.25]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full overflow-hidden bg-slate-950"
    >
      {/* CAPA DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/d0a5dc6dd8e2452585e9bb979b8767d8.jpg"
          className="h-full w-full object-cover opacity-40 grayscale-[20%]"
          alt="Refugio Scholer Frutillar"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950" />
      </div>

      {/* NOISE/Grain sutil cinematográfico */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Campo luminoso físico suave */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.22),transparent_65%)]" />
      </motion.div>

      {/* CONTENIDO */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center overflow-visible [contain:layout_paint]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl overflow-visible"
        >
          <div className="mb-8 flex items-center justify-center gap-2">
            <MapPin className="text-emerald-500 h-4 w-4" />
            <span className="text-[10px] font-black tracking-[0.5em] text-white/60 uppercase">
              Frutillar Bajo — Chile
            </span>
          </div>

          {/* TITULO (fix R + tipografía estable) */}
          <h1 className="mb-8 pr-10 text-[11vw] sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-white overflow-visible">
            REFUGIO
            <br />
            <span
              style={{
                filter: 'drop-shadow(0 0 #0000)',
                WebkitTextStroke: '0.01px transparent',
              }}
              className="relative bg-gradient-to-r from-white via-slate-200 to-emerald-500 bg-clip-text text-transparent italic inline-block py-2 px-[0.15em] leading-[0.95] overflow-visible"
            >
              {/* Light sweep sutil profesional */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-30 mix-blend-overlay
                           bg-gradient-to-r from-transparent via-white/40 to-transparent
                           translate-x-[-120%] animate-[sweep_10s_linear_infinite]"
              />
              SCHOLER
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed text-slate-300">
            Disfruta tu estadía en{' '}
            <span className="text-emerald-400 font-bold">Refugio Scholer</span>, a
            solo 3 cuadras del Lago Llanquihue. Comodidad familiar y precios
            accesibles durante todo el año.
          </p>

          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            {/* Botón con partículas orbitando (versión corregida) */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ParticleRingButton onClick={handleWhatsAppClick} />
            </motion.div>

            <button
              onClick={() => handleScrollTo('galeria')}
              className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <Camera className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              Ver Fotos
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-12 hidden lg:block font-mono text-[9px] text-emerald-500/40">
        <p>// STATUS: OPERATIONAL</p>
        <p>// COORD: 41.13° S | 73.02° W</p>
      </div>

      {/* Keyframes del sweep */}
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
