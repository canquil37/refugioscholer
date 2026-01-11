import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contacto = ({ handleWhatsAppClick }) => {
  return (
    <section id="contacto" className="py-20 bg-green-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contacto</h2>
          <p className="text-xl mb-8 text-green-100">¿Listo para tu escapada a Frutillar? Contáctanos y asegura tu estadía en Refugio Scholer.</p>
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 text-xl px-12 py-8 shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Phone className="mr-3 h-6 w-6" />
            Reservar por WhatsApp
          </Button>
           <div className="mt-8 space-y-2">
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-5 w-5 text-green-100" />
                <a href="tel:+56940979337" className="text-lg font-semibold hover:underline">
                  +56 9 4097 9337
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-5 w-5 text-green-100" />
                <a href="mailto:astridscholer41@gmail.com" className="text-lg hover:underline">astridscholer41@gmail.com</a>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacto;