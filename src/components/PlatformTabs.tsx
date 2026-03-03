import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TABS = [
  { id: 'ig', label: 'IG', color: 'text-amber-500', dot: 'bg-amber-500' },
  { id: 'tt', label: 'TIKTOK', color: 'text-teal-400', dot: 'bg-teal-400' },
  { id: 'yt', label: 'YOUTUBE', color: 'text-red-500', dot: 'bg-red-500' },
];

const CONTENT = {
  ig: {
    title: 'Instagram Best Practices',
    items: [
      { label: 'Creator Mode', text: 'Essential for trending audio and analytics.' },
      { label: 'Retention', text: 'Reels under 15s get 2x more rewatches.' },
      { label: 'SEO', text: 'Use niche keywords in your Name field.' },
    ],
  },
  tt: {
    title: 'TikTok Viral Logic',
    items: [
      { label: 'Zero Delay', text: 'Start talking at 0.0 seconds. No intro.' },
      { label: 'Looping', text: 'End your script mid-sentence to force a loop.' },
      { label: 'Native UI', text: 'Use TikTok\'s green screen or text styles.' },
    ],
  },
  yt: {
    title: 'YouTube Authority',
    items: [
      { label: 'CTR', text: 'Thumbnails must have < 4 words of text.' },
      { label: 'The Bridge', text: 'Direct users to a specific playlist in the end screen.' },
      { label: 'Chapters', text: 'Use timestamped markers for search indexing.' },
    ],
  },
};

export const PlatformTabs = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof CONTENT>('ig');

  return (
    <div className="space-y-4">
      <div className="flex p-1 bg-stone-900 rounded-2xl border border-stone-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
              activeTab === tab.id 
                ? "bg-amber-500 text-stone-950" 
                : "text-stone-500 hover:text-stone-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-stone-900/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl space-y-3"
        >
          <div className={cn("flex items-center gap-2 font-bold text-sm", TABS.find(t => t.id === activeTab)?.color)}>
            <span className={cn("w-2 h-2 rounded-full", TABS.find(t => t.id === activeTab)?.dot)}></span>
            {CONTENT[activeTab].title}
          </div>
          <ul className="text-xs text-stone-400 space-y-3 leading-relaxed">
            {CONTENT[activeTab].items.map((item, i) => (
              <li key={i}>
                • <strong className="text-stone-200 text-[13px]">{item.label}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
