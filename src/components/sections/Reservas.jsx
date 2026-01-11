import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// URL del API - cambiar en producción
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Reservas = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const generateWhatsAppUrl = () => {
    const { accommodation, checkIn, checkOut, guests, name, phone } = formData;
    const message = `Hola, quisiera reservar en Refugio Scholer. Alojamiento: ${accommodation}. Fechas: ${checkIn} al ${checkOut}. Huéspedes: ${guests}. Nombre: ${name}. Teléfono: ${phone}.`;
    return `https://wa.me/56940979337?text=${encodeURIComponent(message)}`;
  };

  const saveReservation = async () => {
    const { accommodation, checkIn, checkOut, guests, name, phone } = formData;

    const response = await fetch(`${API_URL}/api/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alojamiento: accommodation,
        fechaLlegada: checkIn,
        fechaSalida: checkOut,
        numeroHuespedes: parseInt(guests),
        nombreCompleto: name,
        telefonoWhatsapp: phone
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al guardar reserva');
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    const { accommodation, checkIn, checkOut, guests, name, phone } = formData;
    if (!accommodation || !checkIn || !checkOut || !guests || !name || !phone) {
      toast({
        title: "⚠️ Campos incompletos",
        description: "Por favor completa todos los campos del formulario.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Intentar guardar en la base de datos
      await saveReservation();

      toast({
        title: "✅ Reserva registrada",
        description: "Tus datos fueron guardados. Redirigiendo a WhatsApp...",
        duration: 3000,
      });

      // Pequeña pausa para mostrar el toast, luego abrir WhatsApp
      setTimeout(() => {
        window.open(generateWhatsAppUrl(), '_blank');
        setIsSubmitting(false);
      }, 1000);

    } catch (error) {
      console.error('Error guardando reserva:', error);

      // Mostrar error pero NO interrumpir el flujo de WhatsApp
      toast({
        title: "⚠️ Aviso",
        description: "Hubo un problema al registrar, pero puedes continuar por WhatsApp.",
        variant: "warning",
        duration: 4000,
      });

      // Abrir WhatsApp de todas formas para no perder la reserva
      setTimeout(() => {
        window.open(generateWhatsAppUrl(), '_blank');
        setIsSubmitting(false);
      }, 1500);
    }
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
        </motion.div>

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
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={handleChange}
                  value={formData.accommodation}
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
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={handleChange}
                  value={formData.checkIn}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Fecha de salida</label>
                <input
                  type="date"
                  name="checkOut"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={handleChange}
                  value={formData.checkOut}
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
                  disabled={isSubmitting}
                  placeholder="Ej: 4"
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={handleChange}
                  value={formData.guests}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  placeholder="Tu nombre"
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-2">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled={isSubmitting}
                  placeholder="+56 9 ..."
                  className="w-full rounded-md border border-stone-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-stone-500 mb-4 italic">
                *La reserva se confirma de manera manual. Te responderemos por WhatsApp para confirmar disponibilidad y enviarte los datos de pago.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg h-auto shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Enviar solicitud por WhatsApp
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Reservas;