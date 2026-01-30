import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Thermometer } from 'lucide-react';

const AmbientStatus = ({ isMobileInline = false }) => {
  const [envData, setEnvData] = useState({ temp: '--', status: 'Cargando...', icon: <Sun size={12} /> });

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

  // VISTA 1: INLINE PARA HEADER MÓVIL (ZONA ROJA)
  if (isMobileInline) {
    return (
      <div className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md ml-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1">
          <Thermometer size={10} className="text-white/30" />
          <span className="font-mono text-[9px] text-emerald-400 font-bold">{envData.temp}</span>
        </div>
      </div>
    );
  }

  // VISTA 2: FIXED PARA PC (ESQUINA SUPERIOR IZQUIERDA)
  return (
    <motion.div 
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      // md:flex lo vuelve visible solo en PC, top-98 lo separa del nuevo header slim
      className="fixed top-[98px] left-6 z-[60] hidden md:flex"
    >
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[7.5px] tracking-widest text-white/40 uppercase">System</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={envData.status}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-1.5">
              {envData.icon}
              <span className="font-bold text-[8.5px] text-white/90 uppercase tracking-tighter">
                {envData.status}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 px-1 py-0.5 rounded-md border border-emerald-500/20">
              <Thermometer size={10} className="text-emerald-400/60" />
              <span className="font-mono text-[8.5px] text-emerald-400 font-bold">{envData.temp}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AmbientStatus;