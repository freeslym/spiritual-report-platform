'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LOCATIONS, getCityCoords, Country, Region, City } from '@/lib/locations';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '12:00',
  });
  
  // 级联选择状态
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  // 当前可选的地区和城市
  const [availableRegions, setAvailableRegions] = useState<Region[]>([]);
  const [availableCities, setAvailableCities] = useState<City[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 国家选择变化时，更新可用地区
  useEffect(() => {
    if (selectedCountry) {
      const country = LOCATIONS.find(c => c.name === selectedCountry);
      setAvailableRegions(country?.regions || []);
      setSelectedRegion('');
      setSelectedCity('');
      setAvailableCities([]);
    } else {
      setAvailableRegions([]);
      setSelectedRegion('');
      setSelectedCity('');
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  // 地区选择变化时，更新可用城市
  useEffect(() => {
    if (selectedCountry && selectedRegion) {
      const country = LOCATIONS.find(c => c.name === selectedCountry);
      const region = country?.regions.find(r => r.name === selectedRegion);
      setAvailableCities(region?.cities || []);
      setSelectedCity('');
    } else {
      setAvailableCities([]);
      setSelectedCity('');
    }
  }, [selectedCountry, selectedRegion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证位置是否已选择
    if (!selectedCountry || !selectedRegion || !selectedCity) {
      alert('请先选择出生国家/地区/城市');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/birth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          date: formData.birthDate,
          time: formData.birthTime,
          location: selectedCity,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
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
    <div className="min-h-screen bg-slate-950/80 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        
        {/* Stars */}
        <div className="absolute inset-0" id="stars-container" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className={`flex-1 flex flex-col items-center justify-center px-4 py-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✧</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-light mb-4 text-center tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%] font-serif">
              Trinity
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200/80 mb-2 text-center font-light tracking-widest uppercase">
            Astrology · Human Design · Gene Keys
          </p>
          
          <p className="text-purple-300/50 max-w-lg text-center text-sm leading-relaxed mt-4">
            Three ancient wisdom traditions. One unified digital experience.
            <br className="hidden md:block" />
            Discover your authentic self through the convergence of stars, design, and transformation.
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {['Natal Chart Analysis', 'BodyGraph Reading', 'Gene Keys Journey'].map((item, i) => (
              <span 
                key={i}
                className={`px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-purple-200/70 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${i * 100 + 300}ms` }}
              >
              {item}
              </span>
            ))}
          </div>

          {/* View Example Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => router.push('/example')}
            className="mt-6 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-purple-200/70 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:text-purple-200 transition-all duration-300"
          >
            View Example Report →
          </motion.button>
        </div>

        {/* Form Section */}
        <div className={`px-4 pb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em] font-light">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                           focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                           outline-none transition-all duration-300 text-white placeholder-purple-300/20
                           group-hover:bg-white/10 group-hover:border-white/20"
                  placeholder="Enter your name"
                />
              </div>

              <div className="group">
                <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em]">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                           focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                           outline-none transition-all duration-300 text-white placeholder-purple-300/20
                           group-hover:bg-white/10 group-hover:border-white/20"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em]">Birth Date</label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                             focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                             outline-none transition-all duration-300 text-white
                             group-hover:bg-white/10 group-hover:border-white/20"
                  />
                </div>
                <div className="group">
                  <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em]">Birth Time</label>
                  <input
                    type="time"
                    required
                    value={formData.birthTime}
                    onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                             focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                             outline-none transition-all duration-300 text-white
                             group-hover:bg-white/10 group-hover:border-white/20"
                  />
                </div>
              </div>

              {/* 级联选择：国家/地区/城市 */}
              <div className="space-y-3">
                <div className="group">
                  <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em]">Country / 国家</label>
                  <select
                    required
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                             focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                             outline-none transition-all duration-300 text-white
                             group-hover:bg-white/10 group-hover:border-white/20"
                  >
                    <option value="">-- Select --</option>
                    {LOCATIONS.map(country => (
                      <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>

                {availableRegions.length > 0 && (
                  <div className="group">
                    <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em]">Region / 地区</label>
                    <select
                      required
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                               focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                               outline-none transition-all duration-300 text-white
                               group-hover:bg-white/10 group-hover:border-white/20"
                    >
                      <option value="">-- Select --</option>
                      {availableRegions.map(region => (
                        <option key={region.name} value={region.name}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {availableCities.length > 0 && (
                  <div className="group">
                    <label className="block text-purple-200/60 text-xs mb-2 uppercase tracking-[0.2em]">City / 城市</label>
                    <select
                      required
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl 
                               focus:border-purple-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none
                               outline-none transition-all duration-300 text-white
                               group-hover:bg-white/10 group-hover:border-white/20"
                    >
                      <option value="">-- Select --</option>
                      {availableCities.map(city => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !selectedCountry || !selectedRegion || !selectedCity}
                className="w-full py-5 mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 animate-gradient rounded-2xl 
                         font-medium text-lg shadow-2xl shadow-purple-900/50
                         hover:shadow-purple-500/30 hover:scale-[1.02] 
                         transform transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Calculating your cosmic blueprint...</span>
                    </>
                  ) : (
                    <>
                      <span>Reveal My Trinity Map</span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Free Preview Badge */}
            <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-purple-200/60">Free:</span>
                <span className="text-purple-200">Natal Chart + 3 Personalized Insights</span>
              </div>
              <div className="text-center mt-2 text-purple-300/40 text-xs">
                Full reports from <span className="text-purple-300">$19.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
}
