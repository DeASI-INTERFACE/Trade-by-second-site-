import React from 'react';
import type { FC } from 'react';
import { TIERS, STATS, HOW_IT_WORKS } from '@/data/content';
import Link from 'next/link';

const HeroSection: FC = () => (
  <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-24 pt-32">
    <p className="text-brand-accent text-xs tracking-widest uppercase mb-4 fade-up">
      De-ASI-INTERFACE Ecosystem
    </p>
    <h1 className="text-5xl md:text-7xl font-bold glow mb-6 fade-up fade-up-delay-1">
      Trade By Second
    </h1>
    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10 fade-up fade-up-delay-2">
      Precision-timed trading intelligence. A single second is the difference between alpha and noise.
    </p>
    <div className="flex gap-4 flex-wrap justify-center fade-up fade-up-delay-3">
      <Link
        href="/tiers"
        className="bg-brand-accent text-black font-bold px-8 py-3 rounded-lg hover:brightness-110 transition"
      >
        View Subscription Tiers
      </Link>
      <Link
        href="/how-it-works"
        className="border border-brand-accent text-brand-accent px-8 py-3 rounded-lg hover:bg-brand-accent hover:text-black transition"
      >
        How It Works
      </Link>
    </div>
  </section>
);

const StatsSection: FC = () => (
  <section className="py-16 px-6">
    <div className="gradient-divider mb-16" />
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {STATS.map((stat) => (
        <div key={stat.label} className="fade-up">
          <p className="text-3xl md:text-4xl font-bold text-brand-accent glow">{stat.value}</p>
          <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
    <div className="gradient-divider mt-16" />
  </section>
);

const TiersPreview: FC = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">Subscription Tiers</h2>
      <p className="text-center text-gray-400 mb-14">Start where you are. Scale as you grow.</p>
      <div className="grid md:grid-cols-3 gap-8">
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
            <p className="text-2xl mb-1">{tier.icon}</p>
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <p className={`font-bold text-xl mb-4 ${tier.featured ? 'text-brand-gold glow-gold' : 'text-brand-accent'}`}>
              {tier.price}
            </p>
            <p className="text-gray-400 text-sm mb-6">{tier.target}</p>
            <ul className="space-y-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className={`mt-0.5 ${tier.featured ? 'text-brand-gold' : 'text-brand-accent'}`}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/tiers"
              className={`mt-8 block text-center font-bold py-3 rounded-lg transition ${
                tier.featured
                  ? 'bg-brand-gold text-black hover:brightness-110'
                  : 'bg-brand-accent text-black hover:brightness-110'
              }`}
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowPreview: FC = () => (
  <section className="py-24 px-6 bg-brand-muted/20">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-14">How It Works</h2>
      <ol className="space-y-10">
        {HOW_IT_WORKS.map((step, i) => (
          <li key={step.title} className="flex gap-6 items-start">
            <span className="text-brand-accent font-bold text-3xl w-12 shrink-0 tabular-nums">
              0{i + 1}
            </span>
            <div>
              <h3 className="text-xl font-bold mb-1">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="text-center mt-14">
        <Link
          href="/how-it-works"
          className="border border-brand-accent text-brand-accent px-8 py-3 rounded-lg hover:bg-brand-accent hover:text-black transition"
        >
          Full Breakdown →
        </Link>
      </div>
    </div>
  </section>
);

const CTASection: FC = () => (
  <section className="py-24 px-6 text-center">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">Ready to trade at the speed of a second?</h2>
      <p className="text-gray-400 mb-10">
        Join institutional and professional traders deploying precision execution across global markets.
      </p>
      <a
        href="mailto:contact@de-asi-interface.io"
        className="inline-block bg-brand-accent text-black font-bold px-10 py-4 rounded-lg text-lg hover:brightness-110 transition"
      >
        Get Started Today
      </a>
    </div>
  </section>
);

const Footer: FC = () => (
  <footer className="py-12 px-6 border-t border-white/10 text-center text-gray-500 text-sm">
    <div className="gradient-divider mb-8" />
    <p className="mb-2">
      Powered by the{' '}
      <a href="https://github.com/De-ASI-INTERFACE" className="text-brand-accent hover:underline">
        De-ASI-INTERFACE
      </a>{' '}
      ecosystem · Built in Akron, Ohio · Engineered for global markets.
    </p>
    <p>Trade By Second is an active trading intelligence service. Trading involves risk; deploy capital responsibly.</p>
    <p className="mt-4 text-gray-600 text-xs">
      © {new Date().getFullYear()} De-ASI-INTERFACE · All rights reserved.
    </p>
  </footer>
);

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <TiersPreview />
      <HowPreview />
      <CTASection />
      <Footer />
    </main>
  );
}
