'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ExamplePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'astrology' | 'human-design' | 'gene-keys'>('astrology');

  useEffect(() => {
    setMounted(true);
  }, []);

  const exampleData = {
    astrology: {
      title: 'Natal Chart Analysis',
      icon: '✦',
      content: [
        {
          heading: 'Sun in Libra - 7th House',
          text: 'Your identity shines brightest in partnerships. You find your authentic self through the mirror of relationships. Balance and harmony are not just ideals—they are your essential nature.',
        },
        {
          heading: 'Moon in Pisces - 12th House',
          text: 'Your emotional world is vast, intuitive, and deeply connected to the collective unconscious. You feel everything, often absorbing the emotional currents of those around you. Spiritual nourishment is essential for your wellbeing.',
        },
        {
          heading: 'Mercury in Scorpio - 8th House',
          text: 'Your mind penetrates beneath the surface. You are drawn to uncovering secrets, understanding the hidden motivations of others, and exploring life\'s mysteries. Your thinking is profound and transformative.',
        },
        {
          heading: 'Venus in Virgo - 6th House',
          text: 'You express love through service and attention to detail. Practical acts of care speak louder than grand gestures. Your relationships flourish when they are grounded in daily rituals and mutual growth.',
        },
      ],
      chart: {
        sun: '♎ 7° Libra',
        moon: '♓ 23° Pisces',
        rising: '♊ 15° Gemini',
        mercury: '♏ 12° Scorpio',
        venus: '♍ 8° Virgo',
        mars: '♈ 3° Aries',
      },
    },
    'human-design': {
      title: 'Human Design BodyGraph',
      icon: '⬡',
      content: [
        {
          heading: 'Energy Type: Generator',
          text: 'You are a Generator—the powerhouse of the Human Design system. Your aura is open and enveloping, naturally attracting life to you. You are designed to respond to life rather than initiate. When you honor your Sacral response, you generate sustainable energy for your life and those around you.',
        },
        {
          heading: 'Inner Authority: Sacral Authority',
          text: 'Your Sacral Center is your reliable inner voice—it speaks as a gut response: "uh-huh" (yes) or "un-un" (no). This response is clear, immediate, and unambiguous. Learning to wait for and trust this response is key to living your design correctly.',
        },
        {
          heading: 'Profile: 1/3 Investigator/Martyr',
          text: 'As a 1/3, you have a deep need to understand the foundations of things before engaging (the Investigator line). You research, study, and gather knowledge. At the same time, your 3rd line brings experiential learning through trial and error. You find wisdom through both understanding and doing.',
        },
        {
          heading: 'Defined Centers: Head, Ajna, Throat, Sacral, Root',
          text: 'Your defined centers create a consistent electromagnetic field. Head, Ajna, and Throat give you a reliable way to conceptualize and express. The Sacral is your engine of sustainable energy. The Root provides consistent adrenal pressure. This configuration creates a stable and consistent presence.',
        },
      ],
      chart: {
        type: 'Generator',
        profile: '1/3',
        authority: 'Sacral',
        strategy: 'To Respond',
        centers: '5 Defined, 3 Open',
      },
    },
    'gene-keys': {
      title: 'Gene Keys Journey',
      icon: '◈',
      content: [
        {
          heading: 'Shadow: Disharmony',
          text: 'At the Shadow frequency, you may experience life as a struggle, conflict, and separation. You might find yourself in repetitive patterns of friction with others and yourself. This is the collective frequency of the human condition—the starting point of transformation.',
        },
        {
          heading: 'Gift: Harmony',
          text: 'As you embrace the Gift, you discover harmony not as the absence of conflict but as a higher state of resonance. You become a bridge between frequencies, able to hold space for difference without being destabilized. Your presence naturally attunes environments and relationships to greater coherence.',
        },
        {
          heading: 'Siddhi: Synergy',
          text: 'The Siddhi is the highest possibility: divine synergy, where separation dissolves into unified consciousness. In this state, you recognize that you are not separate from life—life lives through you. Your actions become expressions of a greater harmony, aligned with the evolutionary current.',
        },
        {
          heading: 'Activation Path: 55th Gene Key',
          text: 'The 55th Gene Key is the archetype of liberation through emotion. Your journey from Shadow to Siddhi is through emotional awareness—not bypassing emotion but fully feeling it, allowing it to move, and discovering the intelligence within. This is the path of emotional freedom.',
        },
      ],
      chart: {
        key: '55th Gene Key',
        shadow: 'Disharmony',
        gift: 'Harmony',
        siddhi: 'Synergy',
        archetype: 'The Liberator',
      },
    },
  };

  const currentData = exampleData[activeTab];

  return (
    <div className="min-h-screen bg-slate-950/80 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-4 py-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-purple-200/60 hover:text-purple-200 transition-colors group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back to Home</span>
          </button>
        </div>

        {/* Title */}
        <div className={`px-4 py-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-center">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent font-serif">
              Example Report
            </span>
          </h1>
          <p className="text-purple-200/60 text-center text-sm max-w-xl mx-auto">
            This is a sample Trinity Report showing how your personalized insights will appear.
            <br />
            <span className="text-purple-300/40 mt-2 block">
              (Note: This is demo content. Your actual report will be generated based on your unique birth data.)
            </span>
          </p>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(exampleData) as Array<keyof typeof exampleData>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                    : 'bg-white/5 text-purple-200/60 hover:bg-white/10 hover:text-purple-200 border border-white/10'
                }`}
              >
                {exampleData[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 px-4 pb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Chart Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{currentData.icon}</span>
                <h2 className="text-xl font-medium">{currentData.title}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {Object.entries(currentData.chart).map(([key, value]) => (
                  <div key={key} className="p-3 bg-white/5 rounded-xl">
                    <div className="text-purple-200/40 text-xs uppercase tracking-wider mb-1">{key}</div>
                    <div className="text-purple-200 font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Insights */}
            <div className="space-y-6">
              {currentData.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-colors"
                >
                  <h3 className="text-lg font-medium mb-3 text-purple-200">{item.heading}</h3>
                  <p className="text-purple-300/70 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 text-center"
            >
              <button
                onClick={() => router.push('/')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-medium text-lg shadow-2xl shadow-purple-900/50 hover:shadow-purple-500/30 hover:scale-105 transform transition-all duration-300"
              >
                Get Your Personal Report →
              </button>
              <p className="mt-4 text-purple-300/40 text-xs">
                Complete Trinity Report • $39.99 • 100% Satisfaction Guaranteed
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
