import { billingEndpoints } from '../api/endpoints/billing.endpoints';
import type {
  TransactionsResponse,
  BalanceHistoryResponse
} from '../api/endpoints/billing.endpoints';

export const billingService = {
  getTransactions: async (): Promise<TransactionsResponse> => {
    return await billingEndpoints.getTransactions();
  },

  getBalanceHistory: async (): Promise<BalanceHistoryResponse> => {
    return await billingEndpoints.getBalanceHistory();
  }
}; 