import type { BillingState } from '../../types/api/billing.types';
import { api } from '../api.config';

export const billingEndpoints = {
  getBillingData: async (): Promise<BillingState> => {
    try {
      const response = await api.get('/billing');
      return response.data;
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

  addCard: async (cardToken: string) => {
    const response = await api.post('/billing/cards', { cardToken });
    return response.data;
  },

  removeCard: async (cardId: string) => {
    const response = await api.delete(`/billing/cards/${cardId}`);
    return response.data;
  },

  updateBillingInfo: async (billingInfo: any) => {
    const response = await api.put('/billing/info', billingInfo);
    return response.data;
  }
}; 