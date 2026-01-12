
import React from 'react';
import { motion } from 'framer-motion';
import { FRIENDS_LIST } from '../constants';

const FriendsSection: React.FC = () => {
  return (
    <div className="py-12 px-6 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-4xl font-black text-white mb-12"
      >
        The <span className="text-purple-500">Gully Gang</span>
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FRIENDS_LIST.map((friend, idx) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="ios-blur p-4 rounded-[32px] flex items-center gap-6 group hover:border-purple-500/50 transition-all cursor-pointer"
          >
            <div className="relative">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-20 h-20 rounded-[24px] object-cover ring-2 ring-white/10 group-hover:ring-purple-500 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-black rounded-full" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{friend.name}</h3>
              <p className="text-white/50 text-sm font-medium">{friend.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FriendsSection;
