import React from 'react';
import { Play, Pause, RotateCcw, EyeOff, Eye, AlertCircle } from 'lucide-react';
import { playSound } from '../utils/sound';

export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

interface TimerProps {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  handleReset: () => void;
  totalSeconds: number;
  initialSeconds: number;
  isFocusMode: boolean;
  setIsFocusMode: (focus: boolean) => void;
  completedSessionsToday: number;
}

const Timer: React.FC<TimerProps> = ({
  mode,
  setMode,
  minutes,
  seconds,
  isRunning,
  setIsRunning,
  handleReset,
  totalSeconds,
  initialSeconds,
  isFocusMode,
  setIsFocusMode,
  completedSessionsToday,
}) => {
  // Calculate stroke dasharray for circular progress
  const strokeDasharray = 2 * Math.PI * 120; // Radius = 120
  const progress = initialSeconds > 0 ? totalSeconds / initialSeconds : 0;
  const strokeDashoffset = strokeDasharray * (1 - progress);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        playSound('click');
        setIsRunning(!isRunning);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRunning, setIsRunning]);

  return (
    <div className="w-full max-w-md mx-auto mt-8 flex flex-col items-center">
      {/* Mode Selectors */}
      <div className={`flex bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-2xl mb-8 gap-1 transition-all duration-300 ${isFocusMode ? 'opacity-20 hover:opacity-100' : ''}`}>
        <button
          onClick={() => { setMode('pomodoro'); playSound('click'); }}
          className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${mode === 'pomodoro' ? 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'}`}
        >
          Pomodoro
        </button>

        <button
          onClick={() => { setMode('shortBreak'); playSound('click'); }}
          className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${mode === 'shortBreak' ? 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'}`}
        >
          Short Break
        </button>

        <button
          onClick={() => { setMode('longBreak'); playSound('click'); }}
          className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${mode === 'longBreak' ? 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'}`}
        >
          Long Break
        </button>
      </div>

      {/* Timer Display Circle */}
      <div className="relative flex items-center justify-center w-72 h-72 my-2">
        {/* Progress Circle background */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="120"
            className="stroke-slate-100 dark:stroke-zinc-800 fill-none"
            strokeWidth="10"
          />
          {/* Active progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="120"
            className={`fill-none transition-all duration-300 ${mode === 'pomodoro' ? 'stroke-orange-500' : 'stroke-teal-500'}`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Inner timer text */}
        <div className="flex flex-col items-center justify-center z-10">
          <span className="text-6xl font-black text-slate-800 dark:text-zinc-100 tracking-tighter">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 mt-2 uppercase tracking-widest">
            {mode === 'pomodoro' ? 'Focus Session' : 'Break Time'}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleReset}
          className={`p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-all ${isFocusMode ? 'opacity-20 hover:opacity-100' : ''}`}
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={() => { playSound('click'); setIsRunning(!isRunning); }}
          className={`px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm shadow-xl transition-all active:scale-95 text-white ${isRunning ? 'bg-slate-800 hover:bg-slate-900 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'}`}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-all ${isFocusMode ? 'opacity-100 text-orange-500' : 'opacity-40 hover:opacity-100'}`}
          title={isFocusMode ? 'Exit Focus Mode' : 'Focus Mode (Hides UI)'}
        >
          {isFocusMode ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

      <div className={`mt-6 flex items-center gap-1 text-slate-400 dark:text-zinc-500 transition-opacity duration-300 ${isFocusMode ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-xs font-medium">Daily Target: {completedSessionsToday}/4 pomodoros</span>
      </div>

      {/* Keyboard shortcut hint */}
      <div className={`flex items-center gap-1.5 mt-2 px-3 py-1 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800 rounded-lg transition-opacity duration-300 ${isFocusMode ? 'opacity-0' : 'opacity-100'}`}>
        <AlertCircle size={12} className="text-slate-400" />
        <span className="text-[10px] text-slate-400 font-semibold tracking-wide">Press SPACEBAR to Play/Pause</span>
      </div>
    </div>
  );
};

export default Timer;
