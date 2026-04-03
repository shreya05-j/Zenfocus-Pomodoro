import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Timer, { TimerMode } from './components/Timer';
import SettingsModal, { SettingsType } from './components/SettingsModal';
import AnalyticsModal from './components/AnalyticsModal';
import Tasks, { Task } from './components/Tasks';
import Quotes from './components/Quotes';
import { playSound } from './utils/sound';
import { sendNotification, requestNotificationPermission } from './utils/notification';
import { saveAnalyticsSession, getTodayStats } from './utils/analytics';

export default function App() {
  // Appearance
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('zenfocus_theme') === 'dark';
  });

  // Settings
  const [settings, setSettings] = useState<SettingsType>(() => {
    const saved = localStorage.getItem('zenfocus_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      enableNotifications: false,
    };
  });

  // Mode & Timer states
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [totalSeconds, setTotalSeconds] = useState(settings.pomodoro * 60);
  const [initialSeconds, setInitialSeconds] = useState(settings.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('zenfocus_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [];
  });
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Daily Stats
  const [completedToday, setCompletedToday] = useState(getTodayStats().count);

  // Audio & Timer Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update root html class for dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('zenfocus_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('zenfocus_theme', 'light');
    }
  }, [darkMode]);

  // Handle Notifications Permission
  useEffect(() => {
    if (settings.enableNotifications) {
      requestNotificationPermission();
    }
  }, [settings.enableNotifications]);

  // Reset or initialize timers when mode or settings change
  useEffect(() => {
    let minutes = settings.pomodoro;
    if (mode === 'shortBreak') minutes = settings.shortBreak;
    if (mode === 'longBreak') minutes = settings.longBreak;

    const seconds = minutes * 60;
    setTotalSeconds(seconds);
    setInitialSeconds(seconds);
    setIsRunning(false);
  }, [mode, settings]);

  // Timer Countdown logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            // Timer Finished!
            clearInterval(timerRef.current!);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, mode]);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('zenfocus_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTimerComplete = () => {
    setIsRunning(false);

    if (mode === 'pomodoro') {
      playSound('complete');
      sendNotification('ZenFocus', 'Pomodoro completed! Time for a break.');

      // Save focus minutes to analytics
      saveAnalyticsSession(settings.pomodoro);
      setCompletedToday((prev) => prev + 1);

      // Add pomodoro count to current task
      if (selectedTaskId) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTaskId ? { ...task, pomodoros: task.pomodoros + 1 } : task
          )
        );
      }

      // Auto Switch
      if (settings.autoStartBreaks) {
        setMode('shortBreak');
        setIsRunning(true);
      } else {
        setMode('shortBreak');
      }
    } else {
      playSound('focus');
      sendNotification('ZenFocus', 'Break finished! Let\'s get back to work.');

      // Auto Switch
      if (settings.autoStartPomodoros) {
        setMode('pomodoro');
        setIsRunning(true);
      } else {
        setMode('pomodoro');
      }
    }
  };

  const handleReset = () => {
    playSound('click');
    let minutes = settings.pomodoro;
    if (mode === 'shortBreak') minutes = settings.shortBreak;
    if (mode === 'longBreak') minutes = settings.longBreak;

    const seconds = minutes * 60;
    setTotalSeconds(seconds);
    setInitialSeconds(seconds);
    setIsRunning(false);
  };

  const saveSettings = (newSettings: SettingsType) => {
    setSettings(newSettings);
    localStorage.setItem('zenfocus_settings', JSON.stringify(newSettings));
  };

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300 flex flex-col antialiased">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openSettings={() => setIsSettingsOpen(true)}
        openAnalytics={() => setIsAnalyticsOpen(true)}
        isFocusMode={isFocusMode}
      />

      <main className="flex-1 flex flex-col items-center justify-center py-6 w-full max-w-4xl mx-auto px-4">
        <Timer
          mode={mode}
          setMode={setMode}
          minutes={minutes}
          seconds={seconds}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          handleReset={handleReset}
          totalSeconds={totalSeconds}
          initialSeconds={initialSeconds}
          isFocusMode={isFocusMode}
          setIsFocusMode={setIsFocusMode}
          completedSessionsToday={completedToday}
        />

        <Quotes isFocusMode={isFocusMode} />

        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          selectedTaskId={selectedTaskId}
          setSelectedTaskId={setSelectedTaskId}
          isFocusMode={isFocusMode}
        />
      </main>

      <footer className={`py-4 text-center border-t border-slate-100 dark:border-zinc-900 transition-opacity duration-300 ${isFocusMode ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-[10px] text-slate-400 dark:text-zinc-600 font-medium">ZenFocus • Built with React & Tailwind CSS</p>
      </footer>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={saveSettings}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}
