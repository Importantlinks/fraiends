
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronRight, Unlock } from 'lucide-react';
import { APP_PASSWORD, COLLEGE_BG } from '../constants';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === APP_PASSWORD) {
      setIsUnlocked(true);
      setTimeout(onUnlock, 1000);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Background */}
      <motion.div 
        initial={{ scale: 1.2, filter: 'blur(40px)' }}
        animate={{ 
          scale: isUnlocked ? 1 : 1.1,
          filter: isUnlocked ? 'blur(0px)' : 'blur(20px)' 
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0 opacity-60"
        style={{ backgroundImage: `url(${COLLEGE_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="z-10 w-full max-w-md px-6"
      >
        <div className="ios-blur p-8 rounded-[40px] shadow-2xl border border-white/20 text-center">
          <motion.div
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            className="mb-8 flex justify-center"
          >
            <div className={`p-5 rounded-full ${isUnlocked ? 'bg-green-500/20' : 'bg-white/10'}`}>
              {isUnlocked ? <Unlock className="text-green-400 w-10 h-10" /> : <Lock className="text-white/80 w-10 h-10" />}
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-2">Vault Locked</h2>
          <p className="text-white/50 mb-8 font-medium">Enter "Pagalpanti" access key</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg placeholder:text-white/20"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-all active:scale-95"
            >
              Access Vault <ChevronRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-white/30 text-xs font-semibold tracking-widest uppercase">
            Pagalpanti Pvt Ltd &copy; 2025
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LockScreen;
