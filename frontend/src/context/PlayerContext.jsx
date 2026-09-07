import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  // Setup audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle changing songs
  useEffect(() => {
    if (currentSong && currentSong.audio_url) {
      audioRef.current.src = currentSong.audio_url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Error playing audio:", e);
          setIsPlaying(false);
        });
      } else {
        // If we programmatically set a song (like on first load), try playing but catch the interaction error
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.log("Autoplay blocked by browser, user interaction required.");
          setIsPlaying(false); // Make sure play button shows Play icon
        });
      }
    }
  }, [currentSong]);

  const playSong = (song, newPlaylist = null) => {
    setCurrentSong(song);
    if (newPlaylist) {
      setPlaylist(newPlaylist);
    }
  };

  const togglePlay = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!playlist.length || !currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (!playlist.length || !currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  };

  const seek = (percentage) => {
    const audio = audioRef.current;
    if (audio.duration) {
      const newTime = (percentage / 100) * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playlist,
        isPlaying,
        progress,
        currentTime: formatTime(currentTime),
        duration: formatTime(duration),
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        seek
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
