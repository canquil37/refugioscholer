import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AmbientStatus from '../ambientStatus'; // Asegúrate de que la ruta sea correcta

const navLinks = [
  { name: 'Inicio', id: 'hero' },
  { name: 'Cabañas', id: 'cabanas' },
  { name: 'Tarifas', id: 'tarifas' },
  { name: 'Reservas', id: 'reservas' },
  { name: 'Galería', id: 'galeria' },
  { name: 'Ubicación', id: 'ubicacion' },
];

const Header = ({ handleScrollTo, handleWhatsAppClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMobileLinkClick = (id) => {
    handleScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? 'bg-[#1a1a1a]/85 backdrop-blur-xl border-b border-emerald-500/20 py-1.5' 
            : 'bg-transparent py-3 md:py-2.5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
          
          {/* LOGO + AMBIENT STATUS (ZONA ROJA) */}
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => handleScrollTo('hero')}>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
              <img 
                src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
                alt="Logo"
                className="h-[55px] md:h-[60px] w-auto relative z-10"
              />
            </div>
            
            {/* INYECCIÓN DE TELEMETRÍA: Solo visible en móvil, al lado del logo */}
            <div className="md:hidden">
              <AmbientStatus isMobileInline={true} />
            </div>
          </div>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleScrollTo(link.id)} 
                className="relative text-[11px] font-black text-white/70 hover:text-emerald-400 transition-all uppercase tracking-[0.2em] group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#34d399]" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Button 
              onClick={handleWhatsAppClick}
              className="relative overflow-hidden bg-transparent border border-emerald-500/50 text-emerald-400 hover:text-slate-950 transition-colors h-8 text-[10px] font-black px-6 rounded-full group"
            >
              <span className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                <Phone size={12} />
                RESERVAR
              </span>
            </Button>
          </div>

          {/* TRIGGER MENU MÓVIL */}
          <Button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-white hover:bg-white/10 relative z-[200]" 
            variant="ghost" 
            size="icon"
          >
            {isMobileMenuOpen ? <X size={32} strokeWidth={2.5} className="text-emerald-400" /> : <Menu size={28} />}
          </Button>
        </div>

        {/* LÍNEA DE PROGRESO */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_10px_#10b981]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
      </motion.header>

      {/* MOBILE MENU: QUANTUM NEON OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0a]/98 backdrop-blur-3xl z-[150] flex flex-col md:hidden overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(16,185,129,0)_50%,rgba(16,185,129,0.25)_50%),linear-gradient(90deg,rgba(16,185,129,0.05),rgba(16,185,129,0),rgba(16,185,129,0.05))] bg-[length:100%_2px,2px_100%]" />

            <div className="h-24 flex items-center justify-between px-8 border-b border-emerald-500/10 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-[0.5em] text-emerald-400/50 uppercase">
                  Navigation System v2.0
                </span>
                <span className="text-[8px] font-mono text-emerald-500/30 tracking-widest">STATUS: SECURE_LINK_ACTIVE</span>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="p-3 text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <X size={32} strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 relative z-10">
              <div className="flex flex-col gap-9">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                    onClick={() => handleMobileLinkClick(link.id)}
                    className="group relative flex items-center text-5xl font-black text-emerald-400/80 hover:text-emerald-300 transition-all text-left uppercase tracking-tighter"
                  >
                    <span className="text-[10px] font-mono text-emerald-500/40 group-hover:text-emerald-400 group-hover:animate-pulse pr-16 transition-all duration-300">
                      // 0{index + 1}
                    </span>
                    <span className="relative group-hover:italic group-hover:translate-x-4 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]">
                      {link.name}
                    </span>
                    <motion.span 
                      className="absolute -left-6 w-1 h-0 bg-emerald-400 group-hover:h-full transition-all duration-300" 
                    />
                  </motion.button>
                ))}
              </div>
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-10 border-t border-emerald-500/10 relative z-10 bg-gradient-to-t from-emerald-500/5 to-transparent"
            >
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 h-16 rounded-2xl font-black text-xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                <Phone className="h-6 w-6 fill-slate-950" />
                RESERVAR AHORA
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;