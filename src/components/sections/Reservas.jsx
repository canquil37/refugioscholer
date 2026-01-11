import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reservas = () => {
  // Removed open/close state since it should be always visible
  const [formData, setFormData] = useState({
    accommodation: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { accommodation, checkIn, checkOut, guests, name, phone } = formData;
    
    const message = `Hola, quisiera reservar en Refugio Scholer. Alojamiento: ${accommodation}. Fechas: ${checkIn} al ${checkOut}. Huéspedes: ${guests}. Nombre: ${name}. Teléfono: ${phone}.`;
    
    const whatsappUrl = `https://wa.me/56940979337?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="reservas" className="py-20 bg-[#f3f3f3]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Reserva tu estadía</h2>
          <p className="text-lg text-stone-600 mt-2">Elige tu alojamiento, selecciona las fechas y envíanos tu solicitud de reserva.</p>
          
          {/* Toggle button removed as requested */}
        </motion.div>

        {/* Form always visible - Removed AnimatePresence and conditional rendering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accommodation */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-2">Alojamiento</label>
                <select
                  name="accommodation"
                  required
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50"
                  onChange={handleChange}
                >
                  <option value="">Selecciona una opción...</option>
                  <option value="Cabaña Refugio Scholer (2-6 personas)">Cabaña Refugio Scholer (2-6 personas)</option>
                  <option value="Departamento 1 (2-4 personas)">Departamento 1 (2-4 personas)</option>
                  <option value="Departamento 2 (2-4 personas)">Departamento 2 (2-4 personas)</option>
                </select>
              </div>

              {/* Check-in / Check-out */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Fecha de llegada</label>
                <input
                  type="date"
                  name="checkIn"
                  required
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Fecha de salida</label>
                <input
                  type="date"
                  name="checkOut"
                  required
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50"
                  onChange={handleChange}
                />
              </div>

              {/* Guests / Name / Phone */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Número de huéspedes</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  name="guests"
                  required
                  placeholder="Ej: 4"
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-2">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+56 9 ..."
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-stone-500 mb-4 italic">
                *La reserva se confirma de manera manual. Te responderemos por WhatsApp para confirmar disponibilidad y enviarte los datos de pago.
              </p>
              <Button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg h-auto shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Enviar solicitud por WhatsApp
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Reservas;