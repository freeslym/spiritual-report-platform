'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // 验证支付状态
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    setLoading(true);
    // 实际应该调用API验证Stripe session
    // 这里模拟2秒后显示报告已就绪
    setTimeout(() => {
      setReportReady(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {loading ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <h1 className="text-2xl font-light mb-4">Processing Your Payment</h1>
            <p className="text-purple-300/70">Preparing your personalized Trinity Report...</p>
          </>
        ) : reportReady ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-3xl font-light mb-4">
              <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Your Report is Ready!
              </span>
            </h1>
            <p className="text-purple-300/70 mb-8">
              Thank you for your purchase. Your personalized Trinity Report has been generated.
            </p>
            <Link
              href="/report"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-lg
                       hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              View My Report
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">!</span>
            </div>
            <h1 className="text-2xl font-light mb-4 text-red-300">Payment Verification Failed</h1>
            <p className="text-purple-300/70 mb-8">
              We couldn't verify your payment. Please contact support if this persists.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-all"
            >
              Return Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
