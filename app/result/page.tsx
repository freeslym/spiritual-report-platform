'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    setLoading(true);
    const userId = localStorage.getItem('userId');
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productType }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!natalChart) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const planets = natalChart.planets;
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                       'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
              Your Trinity Map
            </span>
          </h1>
          <p className="text-purple-300/70">Three ancient wisdom traditions, one unified you</p>
        </div>

        {/* Natal Chart Visualization */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative aspect-square bg-slate-900/50 rounded-full border border-purple-500/20 p-8">
            {/* Sun */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
              <span className="text-xs mt-1 text-yellow-300">☉</span>
            </div>
            
            {/* Moon */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-6 h-6 bg-slate-200 rounded-full shadow-lg shadow-slate-200/30" />
              <span className="text-xs mt-1 text-slate-300">☽</span>
            </div>

            {/* Ascendant */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-5 h-5 bg-purple-400 rounded-full border-2 border-purple-300" />
              <span className="text-xs mt-1 text-purple-300">↑</span>
            </div>

            {/* Inner ring - zodiac */}
            <div className="absolute inset-8 rounded-full border border-purple-500/10" />
            
            {/* Center info */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">☉</div>
                <div className="text-sm text-purple-300">
                  {zodiacSigns[planets.sun.sign]}
                </div>
                <div className="text-xs text-purple-400/60">
                  {planets.sun.signDegree.toFixed(1)}°
                </div>
              </div>
            </div>
          </div>

          {/* Planet Details */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { planet: '☉', name: 'Sun', data: planets.sun, color: 'yellow' },
              { planet: '☽', name: 'Moon', data: planets.moon, color: 'slate' },
              { planet: '↑', name: 'Asc', data: { sign: Math.floor(natalChart.ascendant / 30), signDegree: natalChart.ascendant % 30 }, color: 'purple' },
            ].map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-4 border border-purple-500/10 text-center">
                <div className={`text-${item.color}-400 text-xl mb-1`}>{item.planet}</div>
                <div className="text-purple-200 text-sm">{item.name}</div>
                <div className="text-purple-300/70 text-xs mt-1">
                  {zodiacSigns[item.data.sign]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Summary */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-light text-center mb-6 text-purple-200">Your Free Insights</h2>
          <div className="space-y-4">
            {freeSummary.map((insight, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-purple-500/10">
                <p className="text-purple-100 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing / Paywall */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-8 text-purple-200">
            Unlock Your Full Trinity Report
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Bundle */}
            <div className="bg-gradient-to-b from-purple-900/40 to-slate-900/40 rounded-2xl p-6 border border-purple-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-xs px-3 py-1 rounded-full">
                Best Value
              </div>
              <h3 className="text-lg font-medium text-purple-200 mb-2">Complete Trinity</h3>
              <div className="text-3xl font-light mb-4">$39.99</div>
              <ul className="text-sm text-purple-300/70 space-y-2 mb-6">
                <li>✓ Full Astrology Report</li>
                <li>✓ Complete Human Design</li>
                <li>✓ Gene Keys Journey</li>
                <li>✓ Module Interlinking</li>
              </ul>
              <button
                onClick={() => handlePurchase('bundle')}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium
                         hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get All Three'}
              </button>
            </div>

            {/* Astrology Only */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-medium text-purple-200 mb-2">Astrology Only</h3>
              <div className="text-3xl font-light mb-4">$19.99</div>
              <ul className="text-sm text-purple-300/70 space-y-2 mb-6">
                <li>✓ Natal Chart Deep Dive</li>
                <li>✓ Planet & House Analysis</li>
                <li>✓ Major Aspects</li>
              </ul>
              <button
                onClick={() => handlePurchase('astro')}
                disabled={loading}
                className="w-full py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-all disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Astrology'}
              </button>
            </div>

            {/* Other */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-medium text-purple-200 mb-2">HD + Gene Keys</h3>
              <div className="text-3xl font-light mb-4">$29.99</div>
              <ul className="text-sm text-purple-300/70 space-y-2 mb-6">
                <li>✓ Human Design Analysis</li>
                <li>✓ Gene Keys Mapping</li>
                <li>✓ Cross-System Insights</li>
              </ul>
              <button
                onClick={() => handlePurchase('bundle')}
                disabled={loading}
                className="w-full py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-all disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Both'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-purple-400/40 text-sm">
          <p>Secure payments powered by Stripe · Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}
