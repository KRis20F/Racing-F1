import type { BillingState, BillingInfo } from '../../types/api/billing.types';
import { api } from '../api.config';

export const billingEndpoints = {
  getBillingData: async (): Promise<BillingState> => {
    try {
      const [transactions, invoices] = await Promise.all([
        api.get('/api/billing/transactions'),
        api.get('/api/billing/invoices')
      ]);
      
      return {
        creditBalance: 0,
        cards: [],
        invoices: invoices.data,
        billingInfo: [],
        transactions: transactions.data,
        hasData: transactions.data.length > 0 || invoices.data.length > 0
      };
    } catch (error) {
      // Si no hay datos, devolvemos un estado inicial
      console.error(error);
      return {
        creditBalance: 0,
        cards: [],
        invoices: [],
        billingInfo: [],
        transactions: [],
        hasData: false
      };
    }
  },

  getTransactions: async () => {
    const response = await api.get('/api/billing/transactions');
    return response.data;
  },

  getBalanceHistory: async () => {
    const response = await api.get('/api/billing/balance-history');
    return response.data;
  },

  getInvoices: async () => {
    const response = await api.get('/api/billing/invoices');
    return response.data;
  },

  addCard: async (cardToken: string) => {
    const response = await api.post('/api/billing/cards', { cardToken });
    return response.data;
  },

  removeCard: async (cardId: string) => {
    const response = await api.delete(`/api/billing/cards/${cardId}`);
    return response.data;
  },

  updateBillingInfo: async (billingInfo: BillingInfo) => {
    const response = await api.put('/api/billing/info', billingInfo);
    return response.data;
  }
}; 