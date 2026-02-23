import { useState } from 'react';

export function LinkCardForm({ linkCard, setLinkCard }) {
  const [isOpen, setIsOpen] = useState(false);

  const update = (field) => (e) =>
    setLinkCard((prev) => ({ ...prev, [field]: e.target.value }));

  const hasAnyData = linkCard.url || linkCard.ogTitle || linkCard.ogDescription || linkCard.ogImage;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-azure rounded-lg -m-1 p-1 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white">Link Card</h2>
          {hasAnyData && !isOpen && (
            <span className="text-xs text-turtle bg-turtle/10 border border-turtle/20 rounded-full px-2 py-0.5">Active</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-galactic transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div>
            <label htmlFor="link-url" className="block text-xs font-medium text-galactic mb-1">URL</label>
            <input
              id="link-url"
              type="url"
              value={linkCard.url}
              onChange={update('url')}
              placeholder="https://example.com/page"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
          <div>
            <label htmlFor="link-og-title" className="block text-xs font-medium text-galactic mb-1">OG Title</label>
            <input
              id="link-og-title"
              type="text"
              value={linkCard.ogTitle}
              onChange={update('ogTitle')}
              placeholder="Page title for social cards"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
          <div>
            <label htmlFor="link-og-description" className="block text-xs font-medium text-galactic mb-1">OG Description</label>
            <input
              id="link-og-description"
              type="text"
              value={linkCard.ogDescription}
              onChange={update('ogDescription')}
              placeholder="Brief description for the link card"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
          <div>
            <label htmlFor="link-og-image" className="block text-xs font-medium text-galactic mb-1">OG Image URL</label>
            <input
              id="link-og-image"
              type="url"
              value={linkCard.ogImage}
              onChange={update('ogImage')}
              placeholder="https://example.com/og-image.jpg"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
          <p className="text-xs text-galactic">
            Tip: Enter OG metadata manually since we can&apos;t fetch it from URLs due to browser security restrictions (CORS).
          </p>
        </div>
      )}
    </div>
  );
}
