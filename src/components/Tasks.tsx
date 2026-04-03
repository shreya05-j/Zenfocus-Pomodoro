import React from 'react';
import { Plus, Check, Trash2, ListTodo, Circle } from 'lucide-react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  pomodoros: number;
}

interface TasksProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  isFocusMode: boolean;
}

const Tasks: React.FC<TasksProps> = ({
  tasks,
  setTasks,
  selectedTaskId,
  setSelectedTaskId,
  isFocusMode,
}) => {
  const [newTaskText, setNewTaskText] = React.useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false,
      pomodoros: 0,
    };
    
    setTasks([...tasks, newTask]);
    if (!selectedTaskId) {
      setSelectedTaskId(newTask.id);
    }
    setNewTaskText('');
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
    }
  };

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className={`w-full max-w-md mx-auto mt-6 px-4 transition-opacity duration-300 ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
        <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-zinc-200">
          <ListTodo size={18} className="text-orange-500" />
          <h2 className="font-semibold text-sm">Focus List</h2>
        </div>

        {selectedTask && (
          <div className="mb-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3">
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase">Focusing On:</span>
            <p className="text-sm font-medium text-slate-800 dark:text-zinc-200 truncate flex-1">{selectedTask.text}</p>
          </div>
        )}

        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-zinc-200"
          />
          <button
            type="submit"
            className="px-3 bg-slate-100 dark:bg-zinc-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-slate-600 dark:text-zinc-300 hover:text-white dark:hover:text-white rounded-xl transition-colors"
          >
            <Plus size={18} />
          </button>
        </form>

        <div className="space-y-2 max-h-52 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-xs text-center text-slate-400 dark:text-zinc-500 py-4">No tasks yet. Create one above!</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-50 dark:border-zinc-800/40 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer ${selectedTaskId === task.id ? 'bg-slate-50 dark:bg-zinc-800 border-l-2 border-l-orange-500' : ''}`}
                onClick={() => setSelectedTaskId(task.id)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(task.id);
                  }}
                  className={`p-1 rounded-full ${task.completed ? 'text-green-500 hover:text-green-600' : 'text-slate-300 hover:text-slate-400'}`}
                >
                  {task.completed ? <Check size={16} /> : <Circle size={16} />}
                </button>

                <span className={`text-sm text-slate-700 dark:text-zinc-300 flex-1 truncate ${task.completed ? 'line-through text-slate-400 dark:text-zinc-500' : ''}`}>
                  {task.text}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
