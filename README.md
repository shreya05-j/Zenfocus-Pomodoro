# ZenFocus 🍅

A modern, minimal Pomodoro Timer web application designed to boost productivity with focus sessions, customizable breaks, and task tracking.

![ZenFocus Preview](./public/preview.png)

##  Features

### Core Functionality
-  **Pomodoro Timer** - 25 min focus sessions
- ☕ **Short Break** - 5 min relaxation
- 🌴 **Long Break** - 15 min rest
- ▶️ **Start/Pause/Reset** - Full timer controls
-  **Auto-switch** - Automatic mode transitions

### Productivity Tools
- ✅ **Task Management** - Add and track daily tasks
-  **Daily Analytics** - Track focus time & completed sessions
- 💬 **Motivational Quotes** - Stay inspired throughout the day
-  **Browser Notifications** - Never miss a session end
- 🔊 **Sound Alerts** - Pleasant audio notifications

### Customization
- ️ **Custom Durations** - Set your own timer lengths
- 🌙 **Dark Mode** - Easy on the eyes
-  **Local Storage** - Preferences saved automatically

### UX Enhancements
- ⌨️ **Keyboard Shortcuts** - Spacebar to start/pause
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern UI** - Clean, Apple-inspired design
-  **Smooth Animations** - Powered by Framer Motion

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Audio** | Web Audio API |
| **Storage** | localStorage |
| **Hosting** | Netlify / Vercel |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/shreya05-j/ZenFocus.git
cd ZenFocus

# Install dependencies
npm install

# Start development server
npm run dev


Project Structure
ZenFocus/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Timer.tsx
│   │   ├── Tasks.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── AnalyticsModal.tsx
│   │   └── Quotes.tsx
│   ├── hooks/
│   ├── utils/
│   │   ├── sound.ts
│   │   ├── notification.ts
│   │   ├── quotes.ts
│   │   ── analytics.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js

