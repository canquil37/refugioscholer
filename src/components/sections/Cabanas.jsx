import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Wifi, Utensils, Tv, Wind, ParkingCircle, BedDouble, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '../ui/Reveal'; 

const amenities = [
  { icon: Utensils, name: 'Cocina equipada', color: 'text-orange-400' },
  { icon: Wifi, name: 'Wi-Fi 5G', color: 'text-blue-400' },
  { icon: Tv, name: 'Smart TV', color: 'text-purple-400' },
  { icon: Wind, name: 'Calefacción', color: 'text-cyan-400' },
  { icon: ParkingCircle, name: 'Parking Privado', color: 'text-emerald-400' },
  { icon: BedDouble, name: 'Kit Premium', color: 'text-rose-400' },
];

// Componente de Icono Maximize definido localmente para evitar errores de importación
const Maximize = ({className}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
  </svg>
);

const Cabanas = ({ handleWhatsAppClick }) => {
  return (
    <section id="cabanas" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Efectos de Iluminación de Fondo (Arquitectura Visual Pro) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Nuestros <span className="text-emerald-400 italic">Alojamientos</span>
            </h2>
            <p className="text-xl text-slate-400 mt-4 max-w-2xl mx-auto font-light italic">
              "Ingeniería en hospitalidad para tu descanso en Frutillar."
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* TARJETA 1: CABAÑA */}
          <Reveal width="100%">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-500 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Cabaña Familiar</h3>
                  <span className="text-emerald-400 font-mono text-xs tracking-[0.3em] uppercase">Capacidad: 2 a 6 Pax</span>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-2xl">
                  <BedDouble className="text-emerald-400 h-8 w-8" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 group/item">
                    <div className="p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                      <amenity.icon className={`h-4 w-4 ${amenity.color}`} />
                    </div>
                    <span className="text-sm text-slate-300 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-7 rounded-2xl text-lg group/btn transition-all duration-300"
              >
                CONSULTAR DISPONIBILIDAD
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
          </Reveal>

          {/* TARJETA 2: DEPTO */}
          <Reveal width="100%">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-500 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Departamento</h3>
                  <span className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase">Estadía Ejecutiva</span>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-2xl">
                  <Maximize className="text-blue-400 h-8 w-8" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 group/item">
                    <div className="p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                      <amenity.icon className={`h-4 w-4 ${amenity.color}`} />
                    </div>
                    <span className="text-sm text-slate-300 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleWhatsAppClick}
                variant="outline"
                className="w-full border-2 border-white/20 hover:border-blue-400 text-white hover:bg-blue-400/10 font-black py-7 rounded-2xl text-lg transition-all duration-300"
              >
                VER DETALLES DEL DEPTO
              </Button>
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Cabanas;