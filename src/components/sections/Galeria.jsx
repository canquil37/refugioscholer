import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  { src: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/b9edb5f0cc8df9d5dd51824595e5610d.jpg', alt: 'Interior de cabaña con cocina equipada en Frutillar' },
  { src: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/c415c31242e7ba8675772a61a8494049.jpg', alt: 'Dormitorio acogedor en Cabañas El Huerto' },
  { src: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/c02bfb64e6c6c4f3f58a81c12cfb1f6b.jpg', alt: 'Vista exterior de las cabañas familiares en Frutillar' },
  { src: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/e6ac66e1bf88a2fe209f833b2e7f9ae5.jpg', alt: 'Baño moderno y limpio del departamento turístico' },
  { src: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/541d5814a4de146e3cec99926ad55c0a.jpg', alt: 'Sala de estar con Smart TV en alojamiento de Frutillar' },
  { src: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/baf912ab4bf18c8a786ac5e89df2af05.jpg', alt: 'Detalle de la decoración de las cabañas cerca del Lago Llanquihue' }
];

const Galeria = ({ handleScrollTo, openLightbox }) => {
  return (
    // Updated background to #f3f3f3
    <section id="galeria" className="py-20 bg-[#f3f3f3]">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Galería</h2>
          <p className="text-lg text-stone-600 mt-2">Un vistazo a tu próximo destino en Frutillar</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
           <Button 
              onClick={() => handleScrollTo('ubicacion')}
              variant="outline"
              className="border-stone-300 hover:bg-stone-300"
            >
              Ver ubicación
              <MapPin className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Galeria;