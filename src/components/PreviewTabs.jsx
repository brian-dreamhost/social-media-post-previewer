export function PreviewTabs({ tabs, activeTab, onTabChange }) {
  const handleKeyDown = (e) => {
    const currentIndex = tabs.indexOf(activeTab);
    let newIndex;
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }
    e.preventDefault();
    onTabChange(tabs[newIndex]);
  };

  return (
    <div className="flex gap-1 p-1 bg-oblivion border border-metal/20 rounded-xl overflow-x-auto" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab}
          id={`tab-${tab.toLowerCase()}`}
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls={`tabpanel-${tab.toLowerCase()}`}
          tabIndex={activeTab === tab ? 0 : -1}
          onClick={() => onTabChange(tab)}
          onKeyDown={handleKeyDown}
          className={`flex-1 min-w-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
            activeTab === tab
              ? 'bg-azure text-white'
              : 'text-galactic hover:text-white hover:bg-white/5'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
