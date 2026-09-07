import { useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';

const MusicPlayer = ({ isStandalone }) => {
  const { 
    currentSong, isPlaying, progress, currentTime, duration, 
    togglePlay, playNext, playPrevious, seek 
  } = usePlayer();

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    seek(percentage);
  };

  if (!currentSong) return null;

  return (
    <div className={`glass-panel w-full rounded-[2rem] p-8 md:p-10 ${isStandalone ? '' : 'fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50'}`}>
      
      {/* Top Section: Icon and Title */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-full border border-brand-secondary/40 bg-black/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,179,71,0.15)]">
          {/* Sun / Mandala Icon Approximation */}
          <svg className="w-8 h-8 text-brand-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M5 5l1.5 1.5" />
            <path d="M17.5 17.5L19 19" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M5 19l1.5-1.5" />
            <path d="M17.5 6.5L19 5" />
          </svg>
        </div>
        <div className="flex-1 truncate">
          <h2 className="text-3xl md:text-4xl text-brand-primary font-serif font-medium tracking-wide truncate">
            {currentSong.title}
          </h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div 
          className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer relative"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-brand-secondary rounded-full absolute left-0 top-0 pointer-events-none"
            style={{ width: `${progress}%` }}
          >
            {/* The thumb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-secondary rounded-full shadow-[0_0_10px_rgba(255,179,71,0.5)] transform translate-x-1/2"></div>
          </div>
        </div>
        <div className="flex justify-between mt-3 text-brand-primary/60 text-sm font-sans">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Left spacer for balance */}
        <div className="w-1/4 hidden sm:block"></div>

        {/* Center: Play Controls */}
        <div className="flex-1 flex justify-center items-center gap-8">
          <button onClick={playPrevious} className="text-brand-primary/70 hover:text-brand-primary transition-colors">
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,230,211,0.2)]"
          >
            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
          </motion.button>

          <button onClick={playNext} className="text-brand-primary/70 hover:text-brand-primary transition-colors">
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Right: Volume */}
        <div className="w-1/4 flex justify-end items-center gap-3">
          <Volume2 className="w-5 h-5 text-brand-primary/70" />
          <div className="w-24 h-1.5 bg-white/10 rounded-full cursor-pointer relative hidden sm:block">
            <div className="absolute left-0 top-0 h-full w-2/3 bg-brand-secondary rounded-full">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-secondary rounded-full transform translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MusicPlayer;
