import React from 'react';
import type { FC } from 'react';
import { HOW_IT_WORKS, RISK_DISCLOSURES } from '@/data/content';
import Link from 'next/link';

const HowItWorksPage: FC = () => (
  <main className="pt-28 pb-24 px-6">
    {/* Header */}
    <div className="max-w-3xl mx-auto text-center mb-20">
      <p className="text-brand-accent text-xs tracking-widest uppercase mb-4">Execution Model</p>
      <h1 className="text-5xl font-bold glow mb-6">How It Works</h1>
      <p className="text-xl text-gray-300">
        A four-phase lifecycle from subscription to compounding returns — engineered for discipline and capital efficiency.
      </p>
    </div>

    {/* Steps */}
    <div className="max-w-3xl mx-auto mb-24">
      <ol className="relative border-l border-brand-accent/30 space-y-12 pl-8">
        {HOW_IT_WORKS.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-[2.75rem] flex items-center justify-center w-9 h-9 rounded-full bg-brand-muted border border-brand-accent/50 text-brand-accent font-bold text-sm">
              {i + 1}
            </span>
            <h2 className="text-2xl font-bold mb-3 text-white">{step.title}</h2>
            <p className="text-gray-400 leading-relaxed text-base">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>

    {/* Architecture section */}
    <div className="max-w-4xl mx-auto mb-24">
      <h2 className="text-3xl font-bold text-center mb-10">System Architecture</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: '⚡', title: '1-Second Resolution', body: 'Market data ingestion and signal processing at the one-second interval — catching micro-moves before they become macro events.' },
          { icon: '🛡️', title: 'Risk-First Execution', body: 'Every position is sized against portfolio risk thresholds. Drawdown controls and stop discipline are non-negotiable parameters.' },
          { icon: '📡', title: '24/7 Uptime', body: 'Cloud-native infrastructure with automatic failover. No human hand required for position entry, management, or exit.' },
        ].map((item) => (
          <div key={item.title} className="card p-6">
            <p className="text-3xl mb-3">{item.icon}</p>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Risk disclosures */}
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Risk Disclosures</h2>
      <ul className="space-y-3">
        {RISK_DISCLOSURES.map((d) => (
          <li key={d} className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-brand-accent mt-0.5 shrink-0">⚠</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* CTA */}
    <div className="text-center mt-20">
      <Link
        href="/tiers"
        className="inline-block bg-brand-accent text-black font-bold px-10 py-4 rounded-lg text-lg hover:brightness-110 transition"
      >
        Choose Your Tier →
      </Link>
    </div>
  </main>
);

export default HowItWorksPage;
