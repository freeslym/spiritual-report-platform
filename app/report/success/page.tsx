'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [natalChart, setNatalChart] = useState<any>(null);

  useEffect(() => {
    // Check if coming from free unlock (localStorage flag)
    const paymentStatus = localStorage.getItem('paymentStatus');
    const chart = localStorage.getItem('natalChart');
    
    if (paymentStatus === 'paid' && chart) {
      setNatalChart(JSON.parse(chart));
      setLoading(false);
    } else {
      // Redirect to home if no payment
      router.push('/');
    }
  }, [router]);

  if (loading || !natalChart) {
    return (
      <div className="min-h-screen bg-slate-950/80 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px64px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Success Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Payment Successful — Full Access Unlocked
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            <span className="font-serif bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Your Trinity Report
            </span>
          </h1>
          <p className="text-purple-300/60 text-lg font-light tracking-widest uppercase">
            Astrology · Human Design · Gene Keys
          </p>
        </motion.div>

        {/* Natal Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="relative aspect-square">
            <div className="absolute inset-8 border border-white/10 rounded-full" />
            <div className="absolute inset-16 border border-white/5 rounded-full" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/30" />
                <p className="text-yellow-300 text-xs mt-2 tracking-widest">☉ SUN</p>
              </div>
            </div>

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

        {/* Full Report Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Natal Chart Section */}
          <div className="p-8 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-purple-300 border border-purple-500/30 rounded-full bg-purple-500/5">
                Ancient Wisdom
              </span>
              <h2 className="text-2xl font-serif text-white">Natal Chart Analysis</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 font-light leading-relaxed">
              <p>Your Sun sign represents your core essence—the spark of divine light that defines your primary nature. As a {zodiacSigns[planets.sun?.sign] || 'Cosmic Being'}, you possess the fundamental characteristics that shape your journey through this lifetime.</p>
              <p>Your Moon sign reveals the depths of your emotional nature and subconscious patterns. Navigating life through the lens of {zodiacSigns[planets.moon?.sign] || 'your intuition'}, you experience rich inner worlds that inform your instinctual responses.</p>
              <p>Your Mercury placement speaks to how you communicate and process information. With Mercury in {zodiacSigns[planets.mercury?.sign] || 'the cosmos'}, your mind works in distinctive ways that color all your intellectual pursuits.</p>
            </div>
          </div>

          {/* Human Design Section */}
          <div className="p-8 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-pink-300 border border-pink-500/30 rounded-full bg-pink-500/5">
                Body Knowledge
              </span>
              <h2 className="text-2xl font-serif text-white">Human Design Reading</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 font-light leading-relaxed">
              <p>Your Human Design type is <span className="text-white font-medium">Manifestor</span>. Your strategy is to inform before acting. When you honor this, you move through life with ease, allowing others to receive the peace that comes from knowing what you're about to do.</p>
              <p>Your defined centers create stability in your emotional, logical, and ego waveforms. You possess a consistent sense of self that others may find reassuring.</p>
              <p>Your gates and channels reveal specific gifts you bring to the world. These are not random—each represents evolutionary purpose waiting to be lived.</p>
            </div>
          </div>

          {/* Gene Keys Section */}
          <div className="p-8 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-amber-300 border border-amber-500/30 rounded-full bg-amber-500/5">
                Transformation
              </span>
              <h2 className="text-2xl font-serif text-white">Gene Keys Journey</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 font-light leading-relaxed">
              <p>Your Gene Keys signature is found in the interplay of your 64 hexagrams. The shadow frequencies you carry represent both challenge and opportunity—the lower expressions create suffering while the higher expressions liberate.</p>
              <p>Your activation level determines how quickly you can move from shadow to gift to siddha. This is not fixed—your practice of awareness accelerates the transformation.</p>
              <p>The Genius frequency awaits your discovery in every moment. This is not something you achieve once—it's a continuous awakening to the brilliance that has always been present.</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-md mx-auto mt-16 text-center"
        >
          <p className="text-slate-500 text-sm mb-6">Thank you for exploring your Trinity Map</p>
          <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 font-medium rounded-xl hover:scale-[1.02] transition transform">
            Generate Another Report
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
