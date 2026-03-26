'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setReportReady(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950/80 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/15 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {loading ? (
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-6"></div>
              <h2 className="text-2xl font-serif text-white mb-2">Processing Payment...</h2>
              <p className="text-slate-400 font-light">Please wait while we verify your order.</p>
            </div>
          ) : reportReady ? (
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-white mb-2">Payment Successful!</h2>
              <p className="text-slate-400 font-light mb-6">Your spiritual report is ready. Check your email for the download link.</p>
              <Link href="/" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 font-medium py-3 px-6 rounded-xl hover:scale-[1.02] transition transform">
                Generate Another Report
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950/80 text-white flex items-center justify-center">
        <div className="text-purple-300/50 font-light">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}