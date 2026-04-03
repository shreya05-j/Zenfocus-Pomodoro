import React from 'react';
import { X, Bell, Zap } from 'lucide-react';

export interface SettingsType {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  enableNotifications: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsType;
  onSave: (newSettings: SettingsType) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState<SettingsType>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden transition-all duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-zinc-200">
            <Zap size={18} className="text-orange-500" />
            <span>Preferences</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Durations (Minutes)</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Focus</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={localSettings.pomodoro}
                  onChange={(e) => setLocalSettings({...localSettings, pomodoro: parseInt(e.target.value) || 25})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-center font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-zinc-200"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Short Break</label>
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={localSettings.shortBreak}
                  onChange={(e) => setLocalSettings({...localSettings, shortBreak: parseInt(e.target.value) || 5})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-center font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-zinc-200"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Long Break</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={localSettings.longBreak}
                  onChange={(e) => setLocalSettings({...localSettings, longBreak: parseInt(e.target.value) || 15})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-center font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-zinc-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Automation</h3>
            
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">Auto-start Breaks</p>
                <p className="text-xs text-slate-400">Start the break timer immediately after focus ends</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoStartBreaks}
                onChange={(e) => setLocalSettings({...localSettings, autoStartBreaks: e.target.checked})}
                className="w-4 h-4 accent-orange-500"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-100 dark:border-zinc-800 pt-3">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">Auto-start Pomodoros</p>
                <p className="text-xs text-slate-400">Start the focus timer immediately after break ends</p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoStartPomodoros}
                onChange={(e) => setLocalSettings({...localSettings, autoStartPomodoros: e.target.checked})}
                className="w-4 h-4 accent-orange-500"
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-100 dark:border-zinc-800 pt-4">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Alerts</h3>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">Browser Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.enableNotifications}
                onChange={(e) => setLocalSettings({...localSettings, enableNotifications: e.target.checked})}
                className="w-4 h-4 accent-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md shadow-orange-500/10"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
