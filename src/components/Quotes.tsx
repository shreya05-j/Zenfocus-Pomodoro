import React from 'react';
import { RefreshCw, Quote as QuoteIcon } from 'lucide-react';
import { getRandomQuote, Quote } from '../utils/quotes';

interface QuotesProps {
  isFocusMode: boolean;
}

const Quotes: React.FC<QuotesProps> = ({ isFocusMode }) => {
  const [quote, setQuote] = React.useState<Quote | null>(null);

  React.useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleRefresh = () => {
    setQuote(getRandomQuote());
  };

  if (!quote) return null;

  return (
    <div className={`w-full max-w-md mx-auto px-4 mt-6 transition-opacity duration-300 ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-white/40 dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 relative text-center">
        <div className="text-slate-300 dark:text-zinc-700 absolute -top-2 left-4 bg-transparent p-1">
          <QuoteIcon size={20} />
        </div>
        <p className="italic text-slate-600 dark:text-zinc-400 text-xs font-medium mb-1">"{quote.text}"</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-semibold">— {quote.author}</span>
          <button
            onClick={handleRefresh}
            className="text-slate-400 hover:text-slate-600 dark:text-zinc-600 dark:hover:text-zinc-400 hover:rotate-180 transition-all duration-300"
            title="Next Quote"
          >
            <RefreshCw size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
