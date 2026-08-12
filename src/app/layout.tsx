import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Trade By Second — Precision Trading Intelligence',
  description:
    'Subscription-based algorithmic trading platform. Second-resolution execution, emotion-free position management, transparent return metrics. Powered by De-ASI-INTERFACE.',
  keywords: [
    'algorithmic trading',
    'automated trading',
    'trading signals',
    'quantitative finance',
    'Solana trading',
    'De-ASI-INTERFACE',
  ],
  authors: [{ name: 'Richard Patterson', url: 'https://github.com/De-ASI-INTERFACE' }],
  openGraph: {
    title: 'Trade By Second',
    description:
      'Precision-timed trading intelligence. Built for those who understand that a single second is the difference between alpha and noise.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-black text-white antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
