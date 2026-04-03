import React from 'react';
import { X, Award, Flame, Calendar, Clock } from 'lucide-react';
import { getAnalyticsData } from '../utils/analytics';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const data = getAnalyticsData();
  
  const totalSessions = data.reduce((acc, curr) => acc + curr.count, 0);
  const totalMinutes = data.reduce((acc, curr) => acc + curr.minutes, 0);
  
  // Find highest minutes in a day for scaling bars
  const maxMinutes = Math.max(...data.map(d => d.minutes), 60);

  // Format date for chart label
  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden transition-all duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-zinc-200">
            <Award size={18} className="text-orange-500" />
            <span>Activity Overview</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 mb-1">
                <Flame size={16} className="text-orange-500" />
                <span className="text-xs font-medium">Completed Focus Sessions</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-zinc-100">{totalSessions}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 mb-1">
                <Clock size={16} className="text-orange-500" />
                <span className="text-xs font-medium">Total Focus Time</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                {totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : `${totalMinutes}m`}
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Focus Minutes (Last 14 days)</h3>
            
            {data.length === 0 ? (
              <div className="h-32 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                <Calendar size={24} className="text-slate-300 mb-2" />
                <p className="text-xs text-slate-400 font-medium">No sessions recorded yet</p>
              </div>
            ) : (
              <div className="pt-6 px-2 flex items-end justify-between gap-2 h-40 border-b border-slate-100 dark:border-zinc-800">
                {data.map((item, i) => {
                  const heightPercentage = Math.max((item.minutes / maxMinutes) * 100, 3);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-slate-800 dark:bg-zinc-700 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-10">
                        {item.minutes} mins ({item.count} sessions)
                      </div>
                      
                      {/* Bar */}
                      <div 
                        className="w-full bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-colors" 
                        style={{ height: `${heightPercentage}%` }}
                      />
                      
                      {/* Label */}
                      <span className="text-[8px] text-slate-400 font-medium truncate w-full text-center mt-1 select-none">
                        {formatDateLabel(item.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
