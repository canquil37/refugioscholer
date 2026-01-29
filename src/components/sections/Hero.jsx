import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GalleryHorizontal, Phone, Video } from 'lucide-react';

const Hero = ({ handleScrollTo, handleWhatsAppClick }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-slate-900">
      
      {/* IMAGEN DE FONDO CON REVELADO SUAVE */}
      <motion.img
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover object-[center_40%] z-0"
        alt="Vista panorámica Volcán Osorno"
        src="https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/34cb0b4e9fd5d91351022c75f00439d9.jpg"
      />

      {/* OVERLAY DINÁMICO (Gradiente para mejorar lectura) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80 z-0"></div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 p-4 md:p-6 flex flex-col items-center w-full max-w-5xl">
        
        {/* LOGO CON EFECTO FLOTANTE */}
        <motion.img
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
          alt="Logo Refugio Scholer"
          className="h-48 md:h-80 w-auto mx-auto mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        />

        {/* TÍTULO CON REVELADO DE LETRAS */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight px-4"
          style={{ textShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)' }}
        >
          Refugio Scholer <br/>
          <span className="text-xl md:text-2xl font-light text-blue-300 tracking-[0.2em] uppercase">
            Frutillar Bajo — Chile
          </span>
        </motion.h1>

        {/* TARJETA GLASSMORPHISM PARA EL TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl max-w-4xl flex flex-col items-center gap-6"
        >
          <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium">
            Disfruta tu estadía a 3 cuadras del Lago Llanquihue. Comodidad familiar y precios accesibles durante todo el año en una ubicación segura.
          </p>

          {/* GRUPO DE BOTONES */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Reservar por WhatsApp</span>
            </Button>

            <div className="flex gap-3 w-full md:w-auto">
              <Button
                onClick={() => handleScrollTo('galeria')}
                variant="outline"
                className="flex-1 bg-white/10 border-white/40 text-white hover:bg-white hover:text-black font-bold py-6 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <GalleryHorizontal className="h-5 w-5" />
                Fotos
              </Button>
              <Button
                onClick={() => handleScrollTo('videos')}
                variant="outline"
                className="flex-1 bg-white/10 border-white/40 text-white hover:bg-white hover:text-black font-bold py-6 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Video className="h-5 w-5" />
                Videos
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DECORACIÓN EXTRA: LUZ RADIAL QUE SIGUE AL MOUSE (Opcional, estética pura) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>
    </section>
  );
};

export default Hero;