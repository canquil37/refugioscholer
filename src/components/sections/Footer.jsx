import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-stone-300 py-10 relative">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <img 
            src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
            alt="Logo Refugio Scholer"
            className="h-14 w-auto"
          />
          <span className="text-xl font-bold text-white">Refugio Scholer</span>
        </div>
        <p className="text-stone-400 mb-6">Frutillar Bajo, barrio seguro y tranquilo.</p>
        <p className="text-stone-500 text-sm mb-6">© {new Date().getFullYear()} Refugio Scholer. Todos los derechos reservados.</p>
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-stone-400">
          <a href="https://expertsonduty.cl/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <span>Impulsado por</span>
            <img 
              src="https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/6d1b8235c2246e597cc075a83d9030c4.png"
              alt="Logo Experts on duty chile"
              className="h-6 w-auto"
            />
          </a>
          <a href="https://www.instagram.com/expertsondutychile/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline mt-2">
            <Instagram className="h-4 w-4" />
            <span>@expertsondutychile</span>
          </a>
        </div>
      </div>

      {/* Admin Button positioned in bottom-left of footer container 
          Reduced size by ~20% (px-4 -> px-3, py-2 -> py-1.5, text-xs -> text-[10px]) 
          Changed text to "Login adm."
      */}
      <a
        href="/admin"
        aria-label="Login administrador Refugio Scholer"
        className="absolute bottom-4 left-4 inline-flex items-center justify-center rounded-full bg-stone-900/90 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black hover:scale-105 hover:shadow-xl"
      >
        Login adm.
      </a>
    </footer>
  );
};

export default Footer;