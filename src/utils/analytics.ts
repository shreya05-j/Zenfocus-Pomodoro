export interface DailyData {
  date: string; // YYYY-MM-DD
  count: number;
  minutes: number;
}

export const getAnalyticsData = (): DailyData[] => {
  const data = localStorage.getItem('zenfocus_analytics');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveAnalyticsSession = (minutes: number) => {
  const analytics = getAnalyticsData();
  const today = new Date().toISOString().split('T')[0];
  
  const todayIndex = analytics.findIndex(item => item.date === today);
  
  if (todayIndex >= 0) {
    analytics[todayIndex].count += 1;
    analytics[todayIndex].minutes += minutes;
  } else {
    analytics.push({
      date: today,
      count: 1,
      minutes: minutes
    });
  }
  
  // Keep last 14 days
  if (analytics.length > 14) {
    analytics.shift();
  }
  
  localStorage.setItem('zenfocus_analytics', JSON.stringify(analytics));
};

export const getTodayStats = (): { count: number; minutes: number } => {
  const analytics = getAnalyticsData();
  const today = new Date().toISOString().split('T')[0];
  const found = analytics.find(item => item.date === today);
  return found ? { count: found.count, minutes: found.minutes } : { count: 0, minutes: 0 };
};
