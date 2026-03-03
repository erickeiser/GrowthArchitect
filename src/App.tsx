import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Instagram, Youtube, Music2, Copy, Check } from 'lucide-react';
import { RadarChart } from './components/RadarChart';
import { PlatformTabs } from './components/PlatformTabs';
import { generateGrowthPlan, type ScriptPackage } from './services/geminiService';

export default function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScriptPackage | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const plan = await generateGrowthPlan(topic);
      setResults(plan);
    } catch (error) {
      console.error(error);
      alert("Growth Engine Offline. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="app-shell antialiased">
      {/* Header */}
      <header className="p-6 sticky top-0 z-50 bg-stone-950/80 backdrop-blur-lg border-b border-stone-800">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter text-white">
            GROWTH<span className="text-amber-500">ARCHITECT</span>
          </h1>
          <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] text-amber-500 font-bold tracking-widest uppercase">
            AI Enabled
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: AI SCRIPT LAB */}
          <div className="lg:col-span-7 space-y-8">
            <section id="ai-lab" className="space-y-4">
              <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-amber-600 to-rose-600 shadow-xl shadow-amber-950/20">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" /> AI Script Architect
                </h2>
                <p className="text-amber-100 text-sm lg:text-base mb-6 leading-relaxed">
                  Input your video topic. Gemini will generate optimized scripts with visuals, dialogue, and CTAs for all platforms.
                </p>
                
                <textarea 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-black/20 border border-white/20 rounded-2xl p-4 lg:p-6 text-white placeholder-amber-200/50 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-white/50 transition-all mb-4" 
                  rows={4} 
                  placeholder="e.g. 5 steps to start coding in 2024..."
                />
                
                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-4 lg:py-5 bg-white text-stone-950 font-black rounded-2xl text-sm lg:text-base shadow-lg hover:bg-stone-100 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
                      <span>ANALYZING...</span>
                    </>
                  ) : (
                    <span>GENERATE ALL SCRIPTS</span>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {loading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-12 space-y-4"
                  >
                    <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs lg:text-sm text-stone-500 font-bold uppercase tracking-widest animate-pulse">
                      Consulting Growth Algorithm...
                    </p>
                  </motion.div>
                )}

                {results && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {[
                      { key: 'instagram', icon: <Instagram className="w-5 h-5" />, color: 'border-amber-500' },
                      { key: 'tiktok', icon: <Music2 className="w-5 h-5" />, color: 'border-teal-500' },
                      { key: 'youtube', icon: <Youtube className="w-5 h-5" />, color: 'border-red-500' }
                    ].map((p) => (
                      <div key={p.key} className={`glass-card p-6 lg:p-8 rounded-3xl space-y-4 border-l-4 ${p.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-500">{p.icon}</span>
                            <h4 className="font-black text-sm lg:text-base uppercase tracking-tighter text-white">{p.key}</h4>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(results[p.key as keyof ScriptPackage].script, p.key)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-stone-400 hover:text-white"
                            title="Copy Script"
                          >
                            {copiedKey === p.key ? <Check className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" /> : <Copy className="w-4 h-4 lg:w-5 lg:h-5" />}
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] lg:text-xs font-black text-stone-500 uppercase tracking-wider">Production Concept</p>
                            <p className="text-sm lg:text-base text-stone-200 mt-1 font-medium">{results[p.key as keyof ScriptPackage].concept}</p>
                          </div>
                          <div>
                            <p className="text-[10px] lg:text-xs font-black text-stone-500 uppercase tracking-wider">Master Script</p>
                            <div className="script-block">{results[p.key as keyof ScriptPackage].script}</div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-[10px] lg:text-xs font-black text-amber-500 uppercase mb-1 tracking-wider">Algorithmic Edge</p>
                            <p className="text-[11px] lg:text-sm text-stone-400 italic leading-relaxed">{results[p.key as keyof ScriptPackage].strategy}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>

          {/* Right Column: ANALYTICS & INSIGHTS */}
          <div className="lg:col-span-5 space-y-8">
            <section className="glass-card p-6 lg:p-8 rounded-3xl sticky lg:top-24">
              <div className="mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Growth Matrix</h3>
                <p className="text-[11px] lg:text-xs text-stone-500 uppercase tracking-widest">Platform Potential Breakdown</p>
              </div>
              <RadarChart />
              
              <div className="mt-12">
                <div className="mb-6">
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Deep Dive</h3>
                  <p className="text-[11px] lg:text-xs text-stone-500 uppercase tracking-widest">Platform Specific Logic</p>
                </div>
                <PlatformTabs />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky Footer CTA */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-stone-950/90 backdrop-blur-md border-t border-stone-800">
        <button className="w-full py-4 glass-card rounded-2xl text-[10px] font-black tracking-widest text-stone-500 uppercase">
          Cross-Platform Growth Report v2.1
        </button>
      </footer>
    </div>
  );
}
