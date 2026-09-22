import React from 'react';
import type { FC } from 'react';
import { DOCS_SECTIONS } from '@/data/content';

const DocsPage: FC = () => (
  <main className="pt-28 pb-24 px-6">
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-14">
        <p className="text-brand-accent text-xs tracking-widest uppercase mb-2">Documentation</p>
        <h1 className="text-4xl font-bold glow mb-4">Technical Docs</h1>
        <p className="text-gray-400">
          Integration guides, API references, and execution model specifications for Trade By Second subscribers.
        </p>
      </div>

      {/* Docs sections */}
      <div className="space-y-8">
        {DOCS_SECTIONS.map((section) => (
          <div key={section.title} className="card p-7">
            <div className="flex items-start gap-4">
              <span className="text-2xl shrink-0">{section.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">{section.title}</h2>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    section.badge === 'Available' ? 'bg-brand-accent/20 text-brand-accent' :
                    section.badge === 'Prime Only' ? 'bg-brand-gold/20 text-brand-gold' :
                    'bg-white/10 text-gray-400'
                  }`}>
                    {section.badge}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{section.description}</p>
                <ul className="space-y-1">
                  {section.topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-brand-accent text-xs">›</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact block */}
      <div className="mt-14 text-center">
        <p className="text-gray-400 mb-4">Need integration support or have architecture questions?</p>
        <a
          href="mailto:contact@de-asi-interface.io"
          className="inline-block border border-brand-accent text-brand-accent px-8 py-3 rounded-lg hover:bg-brand-accent hover:text-black transition"
        >
          Contact Engineering
        </a>
      </div>
    </div>
  </main>
);

export default DocsPage;
