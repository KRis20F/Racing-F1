import { api } from '../api.config';
import type { MonthlyData, WeeklyStats, StatsData } from '../../services/dashboardService';

export const dashboardEndpoints = {
  getMonthlyData: async (): Promise<MonthlyData> => {
    const response = await api.get<MonthlyData>('/api/dashboard/monthly');
    return response.data;
  },

  getWeeklyStats: async (): Promise<WeeklyStats> => {
    const response = await api.get<WeeklyStats>('/api/dashboard/weekly');
    return response.data;
  },

  getStatsData: async (): Promise<StatsData> => {
    const response = await api.get<StatsData>('/api/dashboard/stats');
    return response.data;
  },

  getDashboardSummary: async () => {
    const response = await api.get('/api/dashboard/summary');
    return response.data;
  }
}; 