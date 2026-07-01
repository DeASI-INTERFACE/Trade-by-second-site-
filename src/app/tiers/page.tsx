import React from 'react';
import type { FC } from 'react';
import { TIERS, TIER_COMPARISON } from '@/data/content';
import Link from 'next/link';

const TiersPage: FC = () => (
  <main className="pt-28 pb-24 px-6">
    {/* Header */}
    <div className="max-w-3xl mx-auto text-center mb-20">
      <p className="text-brand-accent text-xs tracking-widest uppercase mb-4">Pricing</p>
      <h1 className="text-5xl font-bold glow mb-6">Subscription Tiers</h1>
      <p className="text-xl text-gray-300">
        Capital-appropriate access to second-resolution execution. No lock-in, upgrade or downgrade at any time.
      </p>
    </div>

    {/* Tier cards */}
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`card p-8 flex flex-col ${tier.featured ? 'card-gold' : ''}`}
        >
          {tier.featured && (
            <span className="self-end text-xs bg-brand-gold text-black font-bold px-2 py-0.5 rounded mb-3">
              MOST POPULAR
            </span>
          )}
          <p className="text-3xl mb-2">{tier.icon}</p>
          <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
          <p className={`font-bold text-xl mb-2 ${tier.featured ? 'text-brand-gold glow-gold' : 'text-brand-accent'}`}>
            {tier.price}
          </p>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">{tier.target}</p>
          <ul className="space-y-3 flex-1 mb-8">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className={`mt-0.5 font-bold ${tier.featured ? 'text-brand-gold' : 'text-brand-accent'}`}>✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <a
            href="mailto:contact@de-asi-interface.io"
            className={`block text-center font-bold py-3 rounded-lg transition ${
              tier.featured
                ? 'bg-brand-gold text-black hover:brightness-110'
                : 'bg-brand-accent text-black hover:brightness-110'
            }`}
          >
            Get Started
          </a>
        </div>
      ))}
    </div>

    {/* Feature comparison table */}
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Feature Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 pr-6 text-gray-400 font-normal">Feature</th>
              <th className="text-center py-3 px-4 text-brand-accent">Pulse</th>
              <th className="text-center py-3 px-4 text-brand-gold">Core</th>
              <th className="text-center py-3 px-4 text-brand-accent">Prime</th>
            </tr>
          </thead>
          <tbody>
            {TIER_COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3 pr-6 text-gray-300">{row.feature}</td>
                <td className="text-center py-3 px-4">{row.pulse}</td>
                <td className="text-center py-3 px-4 text-brand-gold">{row.core}</td>
                <td className="text-center py-3 px-4">{row.prime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* CTA */}
    <div className="text-center mt-20">
      <p className="text-gray-400 mb-6">Not sure which tier fits your capital structure?</p>
      <a
        href="mailto:contact@de-asi-interface.io"
        className="inline-block border border-brand-accent text-brand-accent px-8 py-3 rounded-lg hover:bg-brand-accent hover:text-black transition"
      >
        Contact Us for a Consultation
      </a>
    </div>
  </main>
);

export default TiersPage;
