import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Image, GalleryHorizontal, Phone, Video } from 'lucide-react';

const Hero = ({ handleScrollTo, handleWhatsAppClick }) => {
  return (
    <section id="hero" className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover object-[center_40%] z-0"
        alt="Vista panorámica en alta resolución del Volcán Osorno y el Lago Llanquihue en Frutillar"
        src="https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/34cb0b4e9fd5d91351022c75f00439d9.jpg"
      />
      {/* Darkened background by approx 20% with soft dark blue overlay (Slate-900 at 60%) */}
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
      <div className="relative z-10 p-4 md:p-6 flex flex-col items-center w-full">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
          alt="Logo Refugio Scholer"
          className="h-64 md:h-[24rem] w-auto mx-auto mb-6 drop-shadow-xl"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          // Reduced font size by ~30% (from 4xl/6xl to 2xl/4xl) to improve mobile view and fit
          className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-6 md:mb-8 max-w-4xl"
          style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)' }}
        >
          Refugio Scholer — Departamentos, cabaña y habitaciones en Frutillar Bajo
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-transparent border-none rounded-2xl p-0 max-w-3xl flex flex-col items-center gap-4 w-full"
        >
          {/* Slightly reduced margin/padding to lift buttons higher on mobile */}
          <p
            className="text-white/95 leading-relaxed text-lg md:text-xl px-2 mb-2"
          >
            Disfruta tu estadía en Refugio Scholer, a 3 cuadras del Lago Llanquihue. Contamos con departamentos, cabaña y habitaciones simples, cómodas y familiares, con precios accesibles durante todo el año. Ubicación segura y tranquila. Reserva directo por WhatsApp.
          </p>
          <div
            className="flex flex-col md:flex-row justify-center items-center gap-4 w-full mt-0 md:mt-2"
          >
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-base md:text-lg px-6 py-4 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 w-full max-w-xs md:max-w-none flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Reservar por WhatsApp</span>
            </Button>
            <Button
              onClick={() => handleScrollTo('galeria')}
              variant="outline"
              className="bg-white/90 border-2 border-white text-stone-800 font-bold hover:bg-white text-base md:text-lg px-6 py-4 rounded-full shadow-lg hover:shadow-white/30 hover:shadow-md transition-all duration-300 w-full max-w-xs md:max-w-none flex items-center justify-center gap-2"
            >
              <GalleryHorizontal className="h-5 w-5" />
              Ver fotos
            </Button>
            <Button
              onClick={() => handleScrollTo('videos')}
              variant="outline"
              className="bg-white/90 border-2 border-white text-stone-800 font-bold hover:bg-white text-base md:text-lg px-6 py-4 rounded-full shadow-lg hover:shadow-white/30 hover:shadow-md transition-all duration-300 w-full max-w-xs md:max-w-none flex items-center justify-center gap-2"
            >
              <Video className="h-5 w-5" />
              Ver videos
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;