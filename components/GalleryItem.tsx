
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Play, Image as ImageIcon } from 'lucide-react';
import { Memory } from '../types';

interface GalleryItemProps {
  item: Memory;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        layoutId={item.id}
        whileHover={{ y: -10 }}
        className="group relative ios-blur rounded-[32px] overflow-hidden cursor-pointer h-[400px]"
      >
        {item.type === 'image' ? (
          <img 
            src={item.url} 
            alt={item.description} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="relative w-full h-full">
             <video 
              src={item.url} 
              className="w-full h-full object-cover opacity-80"
              muted
              loop
              playsInline
              onMouseOver={(e) => e.currentTarget.play()}
              onMouseOut={(e) => e.currentTarget.pause()}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="text-white w-12 h-12 opacity-50" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Overlay info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 text-purple-400 mb-2 font-bold text-xs tracking-widest uppercase">
            {item.type === 'image' ? <ImageIcon size={14} /> : <Play size={14} />}
            {item.date}
          </div>
          <p className="text-white font-semibold text-lg leading-tight mb-6">{item.description}</p>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
            className="bg-white text-black font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-all w-full"
          >
            Open Media <Maximize2 size={16} />
          </button>
        </div>
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <motion.button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white p-2"
            >
              <X size={32} />
            </motion.button>
            
            <motion.div 
              layoutId={item.id}
              className="max-w-6xl w-full h-full flex flex-col items-center justify-center"
            >
              <div className="w-full h-[70vh] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.3)] bg-black">
                {item.type === 'image' ? (
                  <img src={item.url} className="w-full h-full object-contain" />
                ) : (
                  <video src={item.url} controls autoPlay className="w-full h-full object-contain" />
                )}
              </div>
              <div className="mt-8 text-center max-w-2xl">
                <p className="text-purple-400 font-bold mb-2">{item.date}</p>
                <h3 className="text-white text-3xl font-black mb-4">{item.description}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryItem;
