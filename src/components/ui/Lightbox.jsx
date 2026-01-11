import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { 
    y: "0",
    opacity: 1,
    transition: { delay: 0.2, type: 'spring', stiffness: 100 }
  },
};

const Lightbox = ({ src, alt, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          variants={modal}
          className="relative max-w-4xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={src} alt={alt} className="w-full h-full object-contain rounded-lg shadow-2xl" />
        </motion.div>
        <motion.button
          className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          exit={{ opacity: 0 }}
        >
          <X size={32} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;