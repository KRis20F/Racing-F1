import { dashboardEndpoints } from '../api/endpoints/dashboard.endpoints';

// Mock data para el dashboard mientras se desarrolla el backend
const mockMonthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    earnings: [30000, 35000, 45000, 40000, 50000, 55000, 45000, 60000, 65000, 70000, 75000, 80000],
    races: [150, 160, 170, 165, 180, 190, 185, 200, 210, 220, 230, 240]
  };
  
  const mockWeeklyStats = [5, 7, 4, 6, 8, 7, 9, 8, 6];
  
  const mockStatsData = {
    racers: "2,300",
    races: "3,020",
    earnings: "53,000 RCF",
    trophies: "156"
  };
  
  // Servicios simulados
  export const dashboardService = {
    getMonthlyData: async () => {
      // Simulamos un delay para que parezca una llamada real
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockMonthlyData;
    },
  
    getWeeklyStats: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockWeeklyStats;
    },
  
    getStatsData: async () => {
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockStatsData;
    },
    getDashboardSummary: dashboardEndpoints.getDashboardSummary
  };
  
  // Types
  export type MonthlyData = {
    labels: string[];
    earnings: number[];
    races: number[];
  };
  
  export type WeeklyStats = number[];
  
  export type StatsData = {
    racers: string;
    races: string;
    earnings: string;
    trophies: string;
  };