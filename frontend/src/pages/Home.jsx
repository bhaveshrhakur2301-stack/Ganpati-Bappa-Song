import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';
import Player from '../components/player/MusicPlayer';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const { currentSong, playSong } = usePlayer();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/songs/')
      .then(res => res.json())
      .then(data => {
        const fetchedSongs = Array.isArray(data) ? data : data.results || [];
        setSongs(fetchedSongs);
        
        // Auto-load first song into player if nothing is playing
        if (fetchedSongs.length > 0 && !currentSong) {
          playSong(fetchedSongs[0], fetchedSongs);
        }
      })
      .catch(err => console.error("Error fetching songs:", err));
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Full-screen Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1579705745131-c7fb8b0d1fa7?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Lord Ganesha" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Festive Lights Decoration at top */}
      <div className="absolute top-0 w-full flex justify-around px-4 z-20 pointer-events-none opacity-80">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="relative">
            <div className="w-px h-8 bg-brand-primary/30 mx-auto"></div>
            <div className={`w-3 h-4 rounded-full ${i % 3 === 0 ? 'bg-[#FF9933]' : i % 3 === 1 ? 'bg-[#138808]' : 'bg-[#FFD700]'} shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }}></div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl px-4 mt-8">
        
        {/* Title Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl text-brand-primary tracking-widest uppercase opacity-90 drop-shadow-lg">
            GANPATI
          </h1>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-12"
        >
          <a href="#" className="glass-button flex items-center gap-2 px-5 py-2 rounded-full text-sm text-brand-primary hover:text-white">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15V9l5.2,3L10,15z"/></svg>
            <span>YouTube</span>
          </a>
          <a href="#" className="glass-button flex items-center gap-2 px-5 py-2 rounded-full text-sm text-brand-primary hover:text-white">
            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.467-.077-.334.132-.67.466-.746 3.82-.873 7.076-.496 9.712 1.115.293.18.388.563.21.854zm1.214-2.71c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.13-9.965-1.166-.413.127-.84-.106-.967-.52-.126-.413.107-.84.52-.966 3.65-1.107 8.193-.573 11.228 1.295.365.225.48.705.255 1.072zm.1-2.83C14.717 9.006 8.528 8.775 4.965 9.856c-.496.15-1.02-.132-1.17-.628-.15-.497.13-.102.626-1.17 4.09-1.242 10.92-1.01 14.73 1.253.435.257.58.82.32 1.257-.26.438-.82.58-1.258.32z"/></svg>
            <span>Spotify</span>
          </a>
        </motion.div>

        {/* The Centered Music Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="w-full max-w-2xl"
        >
          <Player isStandalone={true} />
        </motion.div>

      </div>
    </div>
  );
};

export default Home;

