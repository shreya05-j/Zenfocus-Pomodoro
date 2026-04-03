import React from 'react';
import { Sun, Moon, BarChart2, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  openSettings: () => void;
  openAnalytics: () => void;
  isFocusMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  openSettings,
  openAnalytics,
  isFocusMode,
}) => {
  return (
    <header className={`w-full max-w-2xl mx-auto px-6 py-4 flex items-center justify-between transition-opacity duration-300 ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-200 dark:shadow-none">
          <Sparkles size={18} />
        </div>
        <div>
          <h1 className="font-semibold text-lg text-slate-800 dark:text-zinc-100 tracking-tight">ZenFocus</h1>
          <p className="text-xs text-slate-400 dark:text-zinc-500">Stay present, stay productive</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={openAnalytics}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-all active:scale-95"
          title="Daily Analytics"
        >
          <BarChart2 size={20} />
        </button>

        <button
          onClick={openSettings}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-all active:scale-95"
          title="Timer Settings"
        >
          <Settings size={20} />
        </button>

        <div className="w-px h-5 bg-slate-200 dark:bg-zinc-700 mx-1" />

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-all active:scale-95"
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
