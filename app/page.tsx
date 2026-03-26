'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '12:00',
    birthCity: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 调用地理编码API获取经纬度
      const geoResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formData.birthCity)}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || ''}`
      );
      const geoData = await geoResponse.json();
      const location = geoData.results?.[0]?.geometry?.location;

      if (!location) {
        alert('Could not find location. Please try a different city name.');
        setLoading(false);
        return;
      }

      // 调用出生信息API
      const response = await fetch('/api/birth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          latitude: location.lat,
          longitude: location.lng,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // 保存到localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('natalChart', JSON.stringify(data.natalChart));
        localStorage.setItem('freeSummary', JSON.stringify(data.freeSummary));
        router.push('/result');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Trinity
              </span>
            </h1>
            <p className="text-xl text-purple-200/80 max-w-2xl mx-auto">
              Astrology · Human Design · Gene Keys
            </p>
            <p className="text-purple-300/60 mt-4 max-w-xl mx-auto text-sm">
              Three ancient wisdom traditions, one unified digital experience. 
              Discover your authentic self through the convergence of stars, design, and transformation.
            </p>
          </div>

          {/* Input Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-purple-200/80 text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl 
                           focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 
                           outline-none transition-all text-white placeholder-purple-300/30"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-purple-200/80 text-sm mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl 
                           focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 
                           outline-none transition-all text-white placeholder-purple-300/30"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200/80 text-sm mb-2">Birth Date</label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl 
                             focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 
                             outline-none transition-all text-white"
                  />
                </div>
                <div>
                  <label className="block text-purple-200/80 text-sm mb-2">Birth Time</label>
                  <input
                    type="time"
                    required
                    value={formData.birthTime}
                    onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl 
                             focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 
                             outline-none transition-all text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-200/80 text-sm mb-2">Birth City</label>
                <input
                  type="text"
                  required
                  value={formData.birthCity}
                  onChange={(e) => setFormData({...formData, birthCity: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-xl 
                           focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 
                           outline-none transition-all text-white placeholder-purple-300/30"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl 
                         font-medium text-lg shadow-lg shadow-purple-500/25
                         hover:from-purple-500 hover:to-pink-500 
                         transform hover:scale-[1.02] transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  'Reveal My Trinity Map'
                )}
              </button>
            </form>

            {/* Free Preview */}
            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-purple-500/10">
              <p className="text-center text-purple-300/60 text-sm">
                <span className="text-purple-400">Free:</span> Get your Natal Chart + 3 personalized insights instantly. 
                Unlock full reports starting at <span className="text-purple-400">$19.99</span>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { 
                title: 'Astrology', 
                desc: 'Ancient star wisdom decoded for the modern seeker',
                icon: '☿'
              },
              { 
                title: 'Human Design', 
                desc: 'Your body\'s operating manual revealed',
                icon: '◎'
              },
              { 
                title: 'Gene Keys', 
                desc: 'The path from shadow to gift to悉地',
                icon: '✧'
              },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 bg-white/5 rounded-2xl border border-purple-500/10
                                   hover:border-purple-500/30 transition-colors">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-medium text-purple-200 mb-2">{feature.title}</h3>
                <p className="text-purple-300/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
