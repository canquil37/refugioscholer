import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Thermometer } from 'lucide-react';

const AmbientStatus = () => {
  const [envData, setEnvData] = useState({ temp: '--', status: 'Cargando...', icon: <Sun size={14} /> });

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvData({
        temp: '14°C',
        status: 'LIVE FRUTILLAR',
        icon: <Sun className="text-emerald-400" size={12} />
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      /* CALIBRACIÓN FINAL DE POSICIÓN:
         - Mobile: top-[82px] (Antes 70px, bajamos ~12px más para dar aire al Header móvil)
         - Desktop: md:top-[98px] (Antes 85px, bajamos para que quede perfecto bajo el logo/nav)
      */
      className="fixed top-[82px] left-4 md:top-[98px] md:left-6 z-[60] flex"
    >
      <div className="flex items-center gap-2 md:gap-3 px-2.5 md:px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg">
        
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-2 md:pr-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-white/40 uppercase">
            System
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={envData.status}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <div className="flex items-center gap-1.5">
              {envData.icon}
              <span className="font-bold text-[9px] md:text-[10px] text-white/90 uppercase tracking-tighter">
                <span className="inline md:hidden">LIVE</span>
                <span className="hidden md:inline">{envData.status}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
              <Thermometer size={10} className="text-emerald-400/60" />
              <span className="font-mono text-[9px] md:text-[10px] text-emerald-400 font-bold">{envData.temp}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AmbientStatus;