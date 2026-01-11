import React, { useState } from 'react';
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (id) => {
    handleScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        // Updated: Dark background #222222, reduced mobile padding (py-2), maintained desktop padding (md:py-3)
        className="bg-[#222222]/95 backdrop-blur-lg shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-2 md:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScrollTo('hero')}>
            <img 
              src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
              alt="Logo Refugio Scholer"
              // Adjusted logo size for mobile to fit reduced height
              className="h-[60px] md:h-[74px] w-auto transition-all"
            />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleScrollTo(link.id)} 
                // Updated: White text for desktop links
                className="font-medium text-white hover:text-green-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <Button 
            onClick={handleWhatsAppClick}
            className="hidden md:flex bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Phone className="mr-2 h-4 w-4" />
            Reservar
          </Button>
          {/* Updated: White text/icon for mobile menu button */}
          <Button onClick={toggleMobileMenu} className="md:hidden text-white hover:bg-white/10" variant="ghost" size="icon">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // Updated: Dark background #222222, top adjusted for new height (~76px)
            className="fixed top-[76px] md:top-[98px] left-0 right-0 bg-[#222222] shadow-lg z-40 md:hidden border-t border-stone-700"
          >
            <nav className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleMobileLinkClick(link.id)}
                  // Updated: White text for mobile links
                  className="font-semibold text-lg text-white hover:text-green-400 transition-colors w-full py-2"
                >
                  {link.name}
                </button>
              ))}
               <Button 
                  onClick={handleWhatsAppClick}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all w-4/5"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Reservar Ahora
                </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;