import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Tarifas = ({ handleWhatsAppClick }) => {
  return (
    // Updated background to match #f3f3f3
    <section id="tarifas" className="py-20 bg-[#f3f3f3]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Precios accesibles</h2>
          <p className="text-lg text-stone-600 mt-2">Consulta descuentos por estadías largas y reservas anticipadas.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              // Keep card background white
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Temporada Baja</h3>
            <p className="text-4xl font-bold text-stone-800 mb-2">desde $60.000 <span className="text-lg font-normal">CLP/noche</span></p>
            <p className="text-stone-500">(5-6 personas)</p>
          </motion.div>
          <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              // Keep card background white
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
            <h3 className="text-2xl font-bold text-red-800 mb-4">Temporada Alta</h3>
            <p className="text-4xl font-bold text-stone-800 mb-2">desde $70.000 <span className="text-lg font-normal">CLP/noche</span></p>
            <p className="text-stone-500">(5-6 personas)</p>
          </motion.div>
        </div>
        <div className="mt-12 text-center">
           <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl transition-all"
            >
              Cotizar ahora por WhatsApp
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Tarifas;