import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Wifi, Utensils, Tv, Wind, ParkingCircle, BedDouble } from 'lucide-react';
import { Button } from '@/components/ui/button';

const amenities = [
  { icon: Utensils, name: 'Cocina equipada' },
  { icon: Wifi, name: 'Wi-Fi de alta velocidad' },
  { icon: Tv, name: 'Smart TV' },
  { icon: Wind, name: 'Calefacción' },
  { icon: ParkingCircle, name: 'Estacionamiento' },
  { icon: BedDouble, name: 'Sábanas y toallas' },
];

const Cabanas = ({ handleWhatsAppClick }) => {
  return (
    <section id="cabanas" className="py-20 bg-stone-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Tipos de alojamientos</h2>
          <p className="text-lg text-stone-600 mt-2">Ofrecemos arriendo por día durante todo el año.</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-stone-100 rounded-2xl shadow-lg overflow-hidden p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div className="text-center font-bold text-xl text-stone-700">Cabaña 2–6 pax</div>
              <div className="text-center font-bold text-xl text-stone-700">Depto 2–6 pax</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <amenity.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <span className="font-medium text-stone-700">{amenity.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
               <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Consultar disponibilidad
                </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cabanas;