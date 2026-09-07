import { useState } from 'react';
import { Play, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Songs = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Aartis', 'Bhajans', 'Mantras', 'Stotras'];

  return (
    <div className="w-full flex flex-col pt-8 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Bhajans & Aartis</h1>
          <p className="text-brand-light/70">Discover the most divine Ganpati collection</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-light/50" />
            <input 
              type="text" 
              placeholder="Search songs..." 
              className="w-full bg-brand-surface border border-brand-primary/20 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <button className="p-2 glass-panel rounded-full text-brand-light hover:text-brand-primary">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter 
                ? 'bg-brand-primary text-white shadow-[0_0_10px_rgba(255,123,0,0.3)]' 
                : 'bg-brand-surface text-brand-light/70 hover:bg-brand-surface/80 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Song List */}
      <div className="bg-brand-surface/30 rounded-2xl border border-brand-primary/10 overflow-hidden">
        <div className="hidden md:grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 border-b border-brand-primary/10 text-sm font-medium text-brand-light/50">
          <div className="w-12 text-center">#</div>
          <div>Title</div>
          <div>Album/Artist</div>
          <div className="w-16 text-right pr-4">Time</div>
        </div>
        
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((track, i) => (
            <motion.div 
              key={track}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 p-3 md:p-4 items-center hover:bg-brand-surface/80 transition-colors cursor-pointer border-b border-brand-primary/5 last:border-0"
            >
              <div className="w-12 flex justify-center text-brand-light/40 group-hover:text-brand-primary font-medium">
                <span className="group-hover:hidden">{i + 1}</span>
                <Play className="w-4 h-4 hidden group-hover:block fill-current" />
              </div>
              
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-brand-surface overflow-hidden flex-shrink-0">
                  <img src={`https://images.unsplash.com/photo-1595180630761-460d37e615e9?auto=format&fit=crop&q=80&w=100&h=100&sig=${track+10}`} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <h4 className="text-white font-medium text-sm md:text-base truncate group-hover:text-brand-primary transition-colors">Sukhkarta Dukhharta</h4>
                  <p className="text-brand-light/60 text-xs md:hidden truncate">Lata Mangeshkar</p>
                </div>
              </div>
              
              <div className="hidden md:block truncate text-brand-light/70 text-sm">
                Devotional Classics
              </div>
              
              <div className="w-16 text-right pr-4 text-brand-light/50 text-sm">
                4:{10 + i * 5}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Songs;
