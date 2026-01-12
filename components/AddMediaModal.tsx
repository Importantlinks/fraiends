
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Image as ImageIcon, Video } from 'lucide-react';
import { Memory, MediaType } from '../types';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (memory: Memory) => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [type, setType] = useState<MediaType>('image');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      type,
      url,
      description: description || 'No description provided.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
    
    setUrl('');
    setDescription('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="ios-blur w-full max-w-xl rounded-[48px] overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-white italic">ADD MEMORY</h2>
                <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setType('image')}
                  className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${type === 'image' ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/40'}`}
                >
                  <ImageIcon size={20} /> Photo
                </button>
                <button 
                  onClick={() => setType('video')}
                  className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${type === 'video' ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/40'}`}
                >
                  <Video size={20} /> Video
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/40 text-xs font-bold tracking-widest mb-2 uppercase">Media Link (URL)</label>
                  <input 
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-bold tracking-widest mb-2 uppercase">Memorable Caption</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="That time when..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-white text-black font-black py-5 rounded-3xl flex items-center justify-center gap-3 hover:bg-purple-500 hover:text-white transition-all"
                >
                  SAVE TO VAULT <Plus size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddMediaModal;
