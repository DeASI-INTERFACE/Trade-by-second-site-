import React from 'react';
import type { FC } from 'react';
import { STATS, DASHBOARD_METRICS } from '@/data/content';

const DashboardPage: FC = () => (
  <main className="pt-28 pb-24 px-6">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="text-brand-accent text-xs tracking-widest uppercase mb-2">Live System</p>
        <h1 className="text-4xl font-bold">Performance Dashboard</h1>
        <p className="text-gray-400 mt-2">Real-time snapshot of platform metrics. Subscriber data is private and encrypted.</p>
      </div>

      {/* Stat bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {STATS.map((s) => (
          <div key={s.label} className="card p-6 text-center">
            <p className="text-3xl font-bold text-brand-accent glow">{s.value}</p>
            <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Metrics grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {DASHBOARD_METRICS.map((metric) => (
          <div key={metric.title} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{metric.title}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                metric.status === 'LIVE' ? 'bg-green-500/20 text-green-400' :
                metric.status === 'STABLE' ? 'bg-brand-accent/20 text-brand-accent' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {metric.status}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{metric.value}</p>
            <p className="text-gray-400 text-sm">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Access gate notice */}
      <div className="card card-gold p-8 text-center">
        <p className="text-brand-gold font-bold text-lg mb-2">📊 Full Dashboard Access</p>
        <p className="text-gray-300 text-sm mb-6">
          Subscribers receive access to live P&amp;L feeds, per-strategy performance breakdowns, drawdown curves, and Sharpe attribution reports.
        </p>
        <a
          href="mailto:contact@de-asi-interface.io"
          className="inline-block bg-brand-gold text-black font-bold px-8 py-3 rounded-lg hover:brightness-110 transition"
        >
          Subscribe for Full Access
        </a>
      </div>
    </div>
  </main>
);

export default DashboardPage;
