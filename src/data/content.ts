export const STATS = [
  { value: '24/7', label: 'Market Monitoring' },
  { value: '1s',   label: 'Execution Resolution' },
  { value: '3',    label: 'Subscription Tiers' },
  { value: '100%', label: 'Algorithmic Execution' },
];

export const TIERS = [
  {
    name: 'Pulse',
    icon: '🔹',
    price: 'Entry Tier',
    target: 'Individual retail traders scaling up',
    featured: false,
    features: [
      'Live signal access',
      'Performance dashboard',
      'Second-resolution timing',
      'Email alerts',
      'Community access',
    ],
  },
  {
    name: 'Core',
    icon: '🔸',
    price: 'Professional Tier',
    target: 'Active traders managing $10K–$100K',
    featured: true,
    features: [
      'Full automation suite',
      'Portfolio integration',
      'Priority alerts',
      'Risk management module',
      'API access',
      'Monthly strategy reviews',
    ],
  },
  {
    name: 'Prime',
    icon: '🔺',
    price: 'Institutional Tier',
    target: 'Professional traders & fund operators',
    featured: false,
    features: [
      'Custom strategy configuration',
      'Direct strategy access',
      'Dedicated support line',
      'White-glove onboarding',
      'Full infrastructure access',
      'Real-time P&L reporting',
    ],
  },
];

export const TIER_COMPARISON = [
  { feature: 'Live Signal Access',          pulse: '✓', core: '✓', prime: '✓' },
  { feature: 'Second-Resolution Timing',    pulse: '✓', core: '✓', prime: '✓' },
  { feature: 'Performance Dashboard',       pulse: '✓', core: '✓', prime: '✓' },
  { feature: 'Email Alerts',                pulse: '✓', core: '✓', prime: '✓' },
  { feature: 'Community Access',            pulse: '✓', core: '✓', prime: '✓' },
  { feature: 'Full Automation Suite',       pulse: '—', core: '✓', prime: '✓' },
  { feature: 'API Access',                  pulse: '—', core: '✓', prime: '✓' },
  { feature: 'Risk Management Module',      pulse: '—', core: '✓', prime: '✓' },
  { feature: 'Monthly Strategy Reviews',    pulse: '—', core: '✓', prime: '✓' },
  { feature: 'Custom Strategy Config',      pulse: '—', core: '—', prime: '✓' },
  { feature: 'Full Infrastructure Access',  pulse: '—', core: '—', prime: '✓' },
  { feature: 'Real-Time P&L Reporting',     pulse: '—', core: '—', prime: '✓' },
  { feature: 'White-Glove Onboarding',      pulse: '—', core: '—', prime: '✓' },
  { feature: 'Dedicated Support Line',      pulse: '—', core: '—', prime: '✓' },
];

export const HOW_IT_WORKS = [
  {
    title: 'Subscribe',
    description: 'Select your tier based on capital size and trading goals. No lock-in — upgrade or downgrade at any time. Tiers are engineered to match your actual deployment capacity, not aspirational targets.',
  },
  {
    title: 'Onboard',
    description: 'Connect your exchange account via read/write API keys or receive a direct signal feed into your execution infrastructure. Setup takes minutes, not days. Prime clients receive white-glove onboarding from the engineering team.',
  },
  {
    title: 'Execute',
    description: 'The system monitors markets at the one-second interval, 24 hours a day, 7 days a week. Positions are entered, sized against portfolio risk parameters, and managed automatically without human intervention.',
  },
  {
    title: 'Scale',
    description: 'Review live performance data through your dashboard. Adjust your tier as capital grows. Compounding disciplined, rule-based returns is the institutional approach to sustainable alpha generation.',
  },
];

export const RISK_DISCLOSURES = [
  'Past performance is not indicative of future results. All trading involves substantial risk of loss.',
  'Algorithmic systems can experience technical failures, connectivity issues, or periods of degraded performance.',
  'Second-resolution trading strategies may incur higher transaction costs relative to longer-horizon approaches.',
  'Capital deployed through Trade By Second should represent risk capital you can afford to lose.',
  'Trade By Second does not provide personalized investment advice. This is an execution and signal service only.',
  'Regulatory compliance for your jurisdiction is your responsibility. Consult a licensed financial advisor.',
];

export const DASHBOARD_METRICS = [
  {
    title: 'Signal Latency',
    value: '< 80ms',
    status: 'LIVE',
    description: 'End-to-end signal generation to order submission latency across all active strategies.',
  },
  {
    title: 'System Uptime',
    value: '99.97%',
    status: 'STABLE',
    description: 'Rolling 90-day infrastructure availability across all execution nodes.',
  },
  {
    title: 'Active Strategies',
    value: '12',
    status: 'LIVE',
    description: 'Number of live strategies currently deployed with open position management.',
  },
  {
    title: 'Markets Covered',
    value: '47',
    status: 'STABLE',
    description: 'Tradable instruments across crypto spot, perpetual, and equity derivatives.',
  },
];

export const DOCS_SECTIONS = [
  {
    icon: '🔌',
    title: 'API Integration',
    badge: 'Available',
    description: 'Connect your exchange accounts using read/write API keys. Supports Binance, Coinbase Advanced, Kraken, and Solana DEX endpoints. All keys are encrypted at rest using AES-256.',
    topics: [
      'Supported exchange connectors',
      'API key permission requirements',
      'Webhook signal delivery format',
      'Order routing configuration',
    ],
  },
  {
    icon: '📊',
    title: 'Signal Specification',
    badge: 'Available',
    description: 'Technical specification of the signal payload format delivered at the one-second resolution. Each signal includes entry price, direction, sizing factor, and risk parameters.',
    topics: [
      'Signal schema (JSON)',
      'Timing and delivery guarantees',
      'Confidence scores and filters',
      'Signal versioning',
    ],
  },
  {
    icon: '⚙️',
    title: 'Risk Parameter Configuration',
    badge: 'Core +',
    description: 'Customize your maximum drawdown limits, per-trade risk exposure, and portfolio concentration caps. Parameters are validated server-side before strategies go live.',
    topics: [
      'Max drawdown thresholds',
      'Per-position sizing rules',
      'Correlation exposure limits',
      'Emergency kill-switch protocol',
    ],
  },
  {
    icon: '🏗️',
    title: 'Infrastructure & Architecture',
    badge: 'Prime Only',
    description: 'Full access to execution infrastructure documentation including co-location options, latency optimization guides, and custom strategy deployment pipelines.',
    topics: [
      'Cloud execution topology',
      'Co-location and low-latency options',
      'Custom strategy deployment (Rust/Python)',
      'Monitoring and alerting setup (Grafana)',
    ],
  },
];
