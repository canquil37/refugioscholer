import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        {/* GLOW DE FONDO AMBIENTAL */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute -top-[100%] left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/10 blur-[100px] opacity-50" />
        </div>

        <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
          
          {/* LOGO ENGINE */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleScrollTo('hero')}>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
              <img 
                src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
                alt="Logo"
                className="h-[55px] md:h-[60px] w-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleScrollTo(link.id)} 
                className="relative text-[11px] font-black text-white/70 hover:text-white transition-all uppercase tracking-[0.2em] group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#10b981]" />
              </button>
            ))}
          </nav>

          {/* ACTION BUTTON */}
          <div className="hidden md:flex items-center">
            <Button 
              onClick={handleWhatsAppClick}
              className="relative overflow-hidden bg-transparent border border-emerald-500/50 text-emerald-400 hover:text-slate-950 transition-colors h-8 text-[10px] font-black px-6 rounded-full group"
            >
              <span className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                <Phone size={12} />
                RESERVAR
              </span>
            </Button>
          </div>

          {/* TRIGGER MÓVIL */}
          <Button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-white hover:bg-white/10 relative z-[200]" 
            variant="ghost" 
            size="icon"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>

        {/* PROGRESS LINE */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_10px_#10b981]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
      </motion.header>

    {/* MOBILE MENU: THE QUANTUM OVERLAY (CORREGIDO CON X VISIBLE) */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      /* z-[150] asegura que esté por encima de todo */
      className="fixed inset-0 bg-[#0a0a0a]/98 backdrop-blur-2xl z-[150] flex flex-col md:hidden"
    >
      {/* HEADER INTERNO DEL MENÚ */}
      <div className="h-24 flex items-center justify-between px-8 border-b border-white/5 relative z-[160]">
        <span className="text-[10px] font-mono tracking-[0.5em] text-emerald-500 uppercase">
          Navigation System v2.0
        </span>
        
        {/* BOTÓN X: Ahora con alta visibilidad */}
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-white hover:text-emerald-500 transition-colors bg-white/5 rounded-full border border-white/10"
        >
          <X size={32} strokeWidth={2.5} />
        </button>
      </div>

      {/* ENLACES (Staggered Animation) */}
      <nav className="flex-1 flex flex-col justify-center px-10 relative z-10">
        <div className="flex flex-col gap-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => handleMobileLinkClick(link.id)}
              className="group flex items-baseline gap-4 text-5xl font-black text-white/30 hover:text-white transition-all text-left uppercase tracking-tighter"
            >
              <span className="text-xs font-mono text-emerald-500">
                0{index + 1}
              </span>
              <span className="group-hover:italic transition-all">
                {link.name}
              </span>
            </motion.button>
          ))}
        </div>
      </nav>

      {/* FOOTER DEL MENÚ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-10 border-t border-white/5 relative z-10"
      >
        <Button 
          onClick={handleWhatsAppClick}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-16 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
        >
          <Phone className="mr-3 h-5 w-5" />
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