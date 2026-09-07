import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bhajans & Aartis', path: '/songs' },
    { name: 'Playlists', path: '/playlists' },
    { name: 'Mantras', path: '/mantras' },
    { name: 'Daily Darshan', path: '/darshan' }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-brand-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-primary flex items-center justify-center text-brand-dark font-bold text-xl shadow-[0_0_15px_rgba(255,123,0,0.5)]">
              ॐ
            </div>
            <Link to="/" className="font-serif text-2xl font-bold tracking-wide">
              Ganpati<span className="text-brand-primary">Verse</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-brand-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Icons */}
          <div className="hidden md:flex items-center gap-4 text-brand-light/80">
            <button className="hover:text-brand-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-brand-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-light hover:text-brand-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-brand-primary/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-brand-primary hover:bg-brand-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
