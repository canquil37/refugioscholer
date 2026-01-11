import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Lightbox from '@/components/ui/Lightbox';

import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Cabanas from '@/components/sections/Cabanas';
import Tarifas from '@/components/sections/Tarifas';
import Reservas from '@/components/sections/Reservas';
import Galeria from '@/components/sections/Galeria';
import Ubicacion from '@/components/sections/Ubicacion';
import Faq from '@/components/sections/Faq';
import Contacto from '@/components/sections/Contacto';
import Footer from '@/components/sections/Footer';

const LandingPage = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/56940979337?text=Hola%20Refugio%20Scholer,%20quiero%20consultar%20disponibilidad%20(fecha%20de%20entrada%20y%20salida)%20para%20X%20personas.', '_blank');
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleFeatureClick = (feature) => {
    if (feature === 'Google Maps') {
        window.open('https://www.google.com/maps/dir//CABA%C3%91AS+EL%20HUERTO/data=!4m8!4m7!1m0!1m5!1m1!1s0x96178df483b1f4d7:0x6d468c645f52840e!2m2!1d-73.0327878!2d-41.1337674', '_blank');
        return;
    }
    toast({
      title: "🚧 Función en desarrollo",
      description: `La sección de ${feature} estará disponible pronto. ¡Puedes solicitarla en tu próximo mensaje! 🚀`,
      duration: 3000,
    });
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Refugio Scholer | Arriendo por día en Frutillar Bajo</title>
        <meta name="description" content="Departamentos, cabaña y habitaciones en Frutillar Bajo, a 3 cuadras del lago. Arriendo por día todo el año, Wi-Fi, estacionamiento. ¡Reserva por WhatsApp +56 9 4097 9337!" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Refugio Scholer | Arriendo por día en Frutillar Bajo" />
        <meta property="og:description" content="Departamentos, cabaña y habitaciones en Frutillar Bajo, a 3 cuadras del lago. Arriendo por día todo el año, Wi-Fi, estacionamiento. ¡Reserva por WhatsApp +56 9 4097 9337!" />
        <meta property="og:image" content="https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/d0a5dc6dd8e2452585e9bb979b8767d8.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-[#f3f3f3] text-stone-800 font-sans relative">
        <Toaster />
        <Header handleScrollTo={handleScrollTo} handleWhatsAppClick={handleWhatsAppClick} />
        <main>
          <Hero handleScrollTo={handleScrollTo} handleWhatsAppClick={handleWhatsAppClick} />
          <Cabanas handleWhatsAppClick={handleWhatsAppClick} />
          <Tarifas handleWhatsAppClick={handleWhatsAppClick} />
          <Reservas />
          <Galeria handleScrollTo={handleScrollTo} openLightbox={openLightbox} />
          <Ubicacion handleFeatureClick={handleFeatureClick} />
          <Faq handleWhatsAppClick={handleWhatsAppClick} />
          <Contacto handleWhatsAppClick={handleWhatsAppClick} />
        </main>
        <Footer />

        {selectedImage && (
          <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={closeLightbox} />
        )}
      </div>
    </>
  );
}

export default LandingPage;