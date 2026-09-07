import { ArrowLeft, Play, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Lyrics = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col pt-8 px-4 sm:px-6 lg:px-8 pb-32">
      <Link to="/songs" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Songs
      </Link>
      
      <div className="glass-panel p-6 md:p-10 rounded-3xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
            <div className="w-48 h-48 rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(255,123,0,0.2)]">
              <img src="https://images.unsplash.com/photo-1595180630761-460d37e615e9?auto=format&fit=crop&q=80&w=400&h=400" alt="Album Cover" className="w-full h-full object-cover" />
            </div>
            <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium py-3 rounded-full flex justify-center items-center gap-2 hover:shadow-[0_0_15px_rgba(255,123,0,0.4)] transition-all">
              <Play className="w-5 h-5 fill-current" /> Play Song
            </button>
            <div className="flex gap-4 w-full mt-2">
              <button className="flex-1 glass-panel py-2 rounded-full flex justify-center items-center text-brand-light hover:text-brand-primary transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="flex-1 glass-panel py-2 rounded-full flex justify-center items-center text-brand-light hover:text-brand-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="mb-8 border-b border-brand-primary/20 pb-6">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-gold mb-2">Shree Ganesh Aarti</h1>
              <p className="text-xl text-brand-light/80 font-medium">Jai Ganesh Jai Ganesh, Jai Ganesh Deva</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-medium border border-brand-primary/30">Hindi</span>
                <span className="px-3 py-1 rounded-full bg-brand-surface text-brand-light/70 text-xs font-medium border border-brand-light/10">Aarti</span>
              </div>
            </div>
            
            <div className="space-y-6 text-lg md:text-xl text-brand-light leading-relaxed font-serif text-center md:text-left">
              <p>
                जय गणेश, जय गणेश, जय गणेश देवा।<br/>
                माता जाकी पार्वती, पिता महादेवा॥
              </p>
              <p>
                एकदन्त, दयावन्त, चार भुजा धारी।<br/>
                माथे पर तिलक सोहे, मूसे की सवारी॥
              </p>
              <p>
                पान चढ़े, फूल चढ़े, और चढ़े मेवा।<br/>
                लड्डुअन का भोग लगे, सन्त करें सेवा॥
              </p>
              <p>
                जय गणेश, जय गणेश, जय गणेश देवा।<br/>
                माता जाकी पार्वती, पिता महादेवा॥
              </p>
              <p>
                अंधन को आंख देत, कोढ़िन को काया।<br/>
                बांझन को पुत्र देत, निर्धन को माया॥
              </p>
              <p>
                'सूर' श्याम शरण आए, सफल कीजे सेवा।<br/>
                माता जाकी पार्वती, पिता महादेवा॥
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lyrics;
