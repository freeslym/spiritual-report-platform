'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

function ReportCard({ title, tag, content, delay = 0 }: { title: string; tag: string; content: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="relative group cursor-pointer"
    >
      {/* Background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
      
      {/* Glass card */}
      <div className="relative flex flex-col h-full p-8 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-500">
        {/* Tag */}
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-purple-300 border border-purple-500/30 rounded-full bg-purple-500/5">
            {tag}
          </span>
          <div className="text-white/20 group-hover:text-purple-300/50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
        </div>

        {/* Title - Serif font */}
        <h3 className="text-2xl font-serif text-slate-100 mb-4 leading-snug tracking-wide">
          {title}
        </h3>

        {/* Content */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
          {content}
        </p>

        {/* CTA */}
        <div className="mt-auto flex items-center text-xs font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
          <span>Explore Deep Blueprint</span>
          <svg className="ml-2 w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [natalChart, setNatalChart] = useState<any>(null);
  const [freeSummary, setFreeSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const chart = localStorage.getItem('natalChart');
    const summary = localStorage.getItem('freeSummary');
    
    if (chart && summary) {
      setNatalChart(JSON.parse(chart));
      setFreeSummary(JSON.parse(summary));
    } else {
      router.push('/');
    }
  }, [router]);

  const handlePurchase = async (productType: string) => {
    // TODO: Skip payment for testing - directly mark as paid
    localStorage.setItem('paymentStatus', 'paid');
    router.push('/report/success');
  };

  if (!natalChart) {
    return (
      <div className="min-h-screen bg-slate-950/80 text-white flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const planets = natalChart.planets;
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                       'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  return (
    <div className="min-h-screen bg-slate-950/80 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/15 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-light mb-4 tracking-tight"
          >
            <span className="font-serif bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Your Trinity Map
            </span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-purple-300/60 text-lg font-light tracking-widest uppercase"
          >
            Astrology · Human Design · Gene Keys
          </motion.p>
        </motion.div>

        {/* Natal Chart Circle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="relative aspect-square">
            {/* Outer ring */}
            <div className="absolute inset-8 border border-white/10 rounded-full" />
            <div className="absolute inset-16 border border-white/5 rounded-full" />
            
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/30" />
                <p className="text-yellow-300 text-xs mt-2 tracking-widest">☉ SUN</p>
              </div>
            </div>

            {/* Planets positioned around */}
            {Object.entries(planets).slice(0, 7).map(([name, data]: [string, any], i: number) => {
              const angle = (i * 45 - 90) * (Math.PI / 180);
              const radius = 35;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const sign = zodiacSigns[data.sign] || 'Aries';
              
              return (
                <div 
                  key={name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                    <span className="text-[8px] text-purple-300/70 mt-1 whitespace-nowrap capitalize">
                      {sign} {data.signDegree?.toFixed(0)}°
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Free Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="p-8 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl">
            <h2 className="text-sm uppercase tracking-[0.2em] text-purple-300/70 mb-6">Your Free Preview</h2>
            
            <div className="space-y-4">
              {freeSummary.map((item: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-purple-400">✦</span>
                  <p className="text-slate-300 font-light leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Full Report Cards */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <ReportCard 
              tag="Ancient Wisdom"
              title="Natal Chart"
              content="Your complete birth chart reveals the cosmic blueprint of your soul. Discover your Sun, Moon, and Rising signs, along with planetary placements that shape your destiny."
              delay={0.1}
            />
            <ReportCard 
              tag="Body Knowledge"
              title="Human Design"
              content="Learn your type, strategy, and authority. Understand how you make decisions and interact with the world around you."
              delay={0.2}
            />
            <ReportCard 
              tag="Transformation"
              title="Gene Keys"
              content="Unlock the shadow, gift, and siddha dimensions of your 64 gene keys. Journey from limitation to liberation."
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="relative p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur opacity-50" />
            
            <div className="relative text-center">
              <h3 className="font-serif text-2xl text-white mb-2">Unlock Full Trinity Report</h3>
              <p className="text-slate-400 text-sm mb-6 font-light">Three comprehensive reports, unified insights</p>
              
              <div className="text-4xl font-light text-white mb-6">
                <span className="text-xl align-top">$</span>39<span className="text-lg text-slate-500">.99</span>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-300 text-sm font-light">
                  <span className="text-purple-400">✓</span> Complete Natal Chart Analysis
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-light">
                  <span className="text-purple-400">✓</span> Human Design BodyGraph Reading
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-light">
                  <span className="text-purple-400">✓</span> Gene Keys Activation Journey
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-light">
                  <span className="text-purple-400">✓</span> PDF Download
                </div>
              </div>
              
              <button
                onClick={() => handlePurchase('bundle')}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transform transition-all duration-300"
              >
                {loading ? 'Processing...' : 'Unlock My Report'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500 text-sm">
          <button 
            onClick={() => router.push('/')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Generate New Map
          </button>
        </div>
      </div>
    </div>
  );
}