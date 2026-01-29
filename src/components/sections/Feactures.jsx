import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Shield, MapPin, Zap } from 'lucide-react';

const FeatureCard = ({ title, desc, icon: Icon }) => {
  // Configuración para el efecto de seguimiento del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative bg-slate-900 border border-white/10 rounded-3xl p-8 overflow-hidden transition-colors hover:border-emerald-500/50"
    >
      {/* EL TOQUE PROFESIONAL: Resplandor sutil que sigue al mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionValue(
            `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.15), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10">
        <div className="bg-emerald-500/10 w-fit p-3 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="text-emerald-400 h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    { title: "Ubicación Premium", desc: "A solo 3 cuadras del Lago Llanquihue y el Teatro del Lago.", icon: MapPin },
    { title: "Calidad Certificada", desc: "Instalaciones de alto estándar con mantenimiento riguroso.", icon: Shield },
    { title: "Conexión Total", desc: "Wi-Fi de alta velocidad para nómadas digitales y familias.", icon: Zap },
    { title: "Atención 24/7", desc: "Soporte personalizado para que tu estadía sea perfecta.", icon: Star },
  ];

  return (
    <section className="py-24 bg-slate-950 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;