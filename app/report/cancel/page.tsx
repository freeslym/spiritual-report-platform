'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
          <span className="text-3xl">←</span>
        </div>
        <h1 className="text-2xl font-light mb-4">Payment Cancelled</h1>
        <p className="text-purple-300/70 mb-8">
          No worries! Your journey to self-discovery isn't over. You can always return when you're ready.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-all"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
