'use client';

import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoDemoCardProps {
  title: string;
  description: string;
  videoUrl?: string; // e.g., YouTube embed URL
}

export function VideoDemoCard({ title, description, videoUrl }: VideoDemoCardProps) {
  return (
    <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm transition-all hover:bg-white/10">
      <div className="relative aspect-video bg-black/40 flex items-center justify-center overflow-hidden">
        {videoUrl ? (
          <iframe 
            src={videoUrl} 
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        ) : (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-gray-500 gap-3 cursor-not-allowed cursor-wait"
          >
            <PlayCircle className="w-16 h-16 opacity-50" />
            <p className="text-sm font-medium uppercase tracking-widest text-blue-400/80">Video en Producción</p>
          </motion.div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
