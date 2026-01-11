import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo reservo por WhatsApp?",
    answer: "Es muy fácil. Haz clic en cualquier botón de 'Reservar por WhatsApp' y te comunicarás directamente con nosotros para coordinar fechas y disponibilidad para tu arriendo por día en Frutillar."
  },
  {
    question: "¿Cuáles son los horarios de check-in y check-out?",
    answer: "El check-in es a partir de las 15:00 hrs y el check-out es hasta las 12:00 hrs. Si necesitas flexibilidad, consúltanos y veremos cómo podemos ayudarte."
  },
  {
    question: "¿Hay estacionamiento y Wi-Fi?",
    answer: "¡Sí! Ofrecemos estacionamiento privado y Wi-Fi de alta velocidad en todas nuestras cabañas y departamentos turísticos en Frutillar."
  },
  {
    question: "¿Se permiten mascotas?",
    answer: "Actualmente no permitimos mascotas en nuestras instalaciones para garantizar la comodidad de todos nuestros huéspedes."
  },
  {
    question: "¿Arriendan por día todo el año?",
    answer: "Sí, nuestras cabañas familiares en Frutillar están disponibles para arriendo por día durante todo el año, tanto en temporada alta como baja."
  },
];

const Faq = ({ handleWhatsAppClick }) => {
  return (
    <section id="faq" className="py-20 bg-stone-200">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Preguntas Frecuentes</h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full bg-stone-100 rounded-2xl p-4 shadow-md">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-stone-600 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center text-stone-600">
            <p>¿Otra duda? <button onClick={handleWhatsAppClick} className="text-green-700 font-bold hover:underline">Escríbenos al WhatsApp</button></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;