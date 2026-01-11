import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Ubicacion = ({ handleFeatureClick }) => {
  return (
    <section id="ubicacion" className="py-20 bg-stone-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Ubicación</h2>
          <p className="text-lg text-stone-600 mt-2">A 3 cuadras del Lago Llanquihue, en un barrio seguro y tranquilo. Cerca del Teatro del Lago, cafeterías y muelle.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-stone-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11943.483980385502!2d-73.04153924955745!3d-41.1340179919598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96178df483b1f4d7%3A0x6d468c645f52840e!2sCABA%C3%91AS%20EL%20HUERTO!5e0!3m2!1ses!2scl!4v1731234567890!5m2!1ses!2scl" 
              width="100%" 
              height="100%" 
              style={{ border:0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Cabañas El Huerto en Frutillar Bajo"
            ></iframe>
          </div>
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-green-700" />
              <p className="font-semibold text-lg text-stone-800">Avenida Alemania 962, Frutillar Bajo, Chile</p>
            </div>
            <Button onClick={() => handleFeatureClick('Google Maps')} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Navigation className="mr-2 h-4 w-4" />
              Cómo llegar (Google Maps)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;