import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const videos = [
    {
        id: 1,
        title: 'Recorrido por nuestras cabañas',
        description: 'Conoce los espacios acogedores que tenemos para ti',
        thumbnail: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/b9edb5f0cc8df9d5dd51824595e5610d.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 2,
        title: 'Vista al Lago Llanquihue',
        description: 'A solo 3 cuadras de nuestras instalaciones',
        thumbnail: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/34cb0b4e9fd5d91351022c75f00439d9.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 3,
        title: 'Frutillar y sus encantos',
        description: 'Descubre la magia de Frutillar Bajo',
        thumbnail: 'https://horizons-cdn.hostinger.com/721336c3-418c-43de-8d0a-bd68ea993e8d/c02bfb64e6c6c4f3f58a81c12cfb1f6b.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
];

const Videos = ({ handleScrollTo }) => {
    const [activeVideo, setActiveVideo] = React.useState(null);

    const openVideo = (video) => {
        setActiveVideo(video);
    };

    const closeVideo = () => {
        setActiveVideo(null);
    };

    return (
        <>
            <section id="videos" className="py-20 bg-gradient-to-b from-[#f3f3f3] to-stone-200">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Videos</h2>
                        <p className="text-lg text-stone-600 mt-2">Explora Refugio Scholer en movimiento</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                onClick={() => openVideo(video)}
                            >
                                {/* Thumbnail Container */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-16 h-16 md:w-20 md:h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-[#25D366] transition-all duration-300"
                                        >
                                            <Play className="w-7 h-7 md:w-8 md:h-8 text-stone-800 group-hover:text-white ml-1 transition-colors duration-300" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-stone-800 group-hover:text-[#25D366] transition-colors duration-300">
                                        {video.title}
                                    </h3>
                                    <p className="text-stone-600 text-sm mt-1">
                                        {video.description}
                                    </p>
                                </div>

                                {/* Decorative Border */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#25D366] via-emerald-400 to-[#25D366] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <Button
                            onClick={() => handleScrollTo('ubicacion')}
                            variant="outline"
                            className="border-stone-300 hover:bg-stone-300 px-6 py-3"
                        >
                            Ver ubicación
                            <MapPin className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Video Modal */}
            {activeVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={closeVideo}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`${activeVideo.videoUrl}?autoplay=1`}
                            title={activeVideo.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        {/* Close Button */}
                        <button
                            onClick={closeVideo}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Videos;
