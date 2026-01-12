
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, LogOut, PlusCircle, Sparkles } from 'lucide-react';
import Preloader from './components/Preloader';
import LockScreen from './components/LockScreen';
import FriendsSection from './components/FriendsSection';
import GalleryItem from './components/GalleryItem';
import AddMediaModal from './components/AddMediaModal';
import { AppState, Memory } from './types';
import { INITIAL_MEMORIES, COLLEGE_BG } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PRELOADER);
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'friends'>('gallery');

  useEffect(() => {
    // Initial loading sequence
    const timer = setTimeout(() => {
      setAppState(AppState.LOCK_SCREEN);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    setAppState(AppState.DASHBOARD);
  };

  const addMemory = (memory: Memory) => {
    setMemories([memory, ...memories]);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <AnimatePresence mode="wait">
        {appState === AppState.PRELOADER && <Preloader key="preloader" />}

        {appState === AppState.LOCK_SCREEN && (
          <LockScreen key="lock" onUnlock={handleUnlock} />
        )}

        {appState === AppState.DASHBOARD && (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative min-h-screen overflow-x-hidden"
          >
            {/* Live Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-0 opacity-40 blur-[100px] bg-cover bg-center"
                style={{ backgroundImage: `url(${COLLEGE_BG})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
              {/* Animated Blobs */}
              <motion.div 
                animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" 
              />
              <motion.div 
                animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
                transition={{ duration: 18, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]" 
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 pb-32">
              {/* Header */}
              <header className="px-6 pt-12 max-w-6xl mx-auto flex justify-between items-end">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-purple-400 font-bold mb-1 tracking-widest uppercase text-xs">
                    <Sparkles size={14} /> Memories Unlocked
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white">
                    PAGALPANTI<span className="text-purple-500">.</span>
                  </h1>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-black p-5 rounded-[28px] shadow-xl hover:bg-purple-500 hover:text-white transition-all"
                >
                  <PlusCircle size={28} />
                </motion.button>
              </header>

              {/* Tabs */}
              <div className="max-w-6xl mx-auto px-6 mt-12 mb-8">
                <div className="ios-blur inline-flex p-1.5 rounded-[24px] gap-1">
                  <button 
                    onClick={() => setActiveTab('gallery')}
                    className={`px-8 py-3 rounded-[20px] font-bold text-sm transition-all ${activeTab === 'gallery' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                  >
                    Memory Lane
                  </button>
                  <button 
                    onClick={() => setActiveTab('friends')}
                    className={`px-8 py-3 rounded-[20px] font-bold text-sm transition-all ${activeTab === 'friends' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                  >
                    The Squad
                  </button>
                </div>
              </div>

              {/* Content Switching */}
              <AnimatePresence mode="wait">
                {activeTab === 'gallery' ? (
                  <motion.div 
                    key="gallery"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {memories.map((item) => (
                      <GalleryItem key={item.id} item={item} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="friends"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <FriendsSection />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Navigation Dock (iOS 26 Style) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
              <div className="ios-blur px-8 py-4 rounded-[32px] border border-white/20 flex items-center gap-10 shadow-2xl">
                <NavButton icon={<Camera size={24} />} label="Gallery" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
                <NavButton icon={<Users size={24} />} label="Squad" active={activeTab === 'friends'} onClick={() => setActiveTab('friends')} />
                <div className="w-px h-6 bg-white/10" />
                <NavButton icon={<LogOut size={24} />} label="Exit" onClick={() => setAppState(AppState.LOCK_SCREEN)} />
              </div>
            </div>

            <AddMediaModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onAdd={addMemory} 
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col items-center group transition-all duration-300 ${active ? 'text-purple-400' : 'text-white/40 hover:text-white'}`}
  >
    <div className={`transition-all duration-300 ${active ? 'scale-110 mb-1' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    {active && (
      <motion.div 
        layoutId="dock-dot"
        className="absolute -bottom-1 w-1 h-1 bg-purple-400 rounded-full" 
      />
    )}
  </button>
);

export default App;
