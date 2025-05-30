import { api } from '../api.config';

export interface PaymentRequest {
  amount: string;
  recipient: string;
  currency: string;
}

export interface PaymentResponse {
  paymentId: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  amount: string;
  timestamp: string;
  signature: string;
}

export const paymentEndpoints = {
  sendPayment: async (data: PaymentRequest): Promise<PaymentResponse> => {
    const response = await api.post<PaymentResponse>('/api/payment/send', data);
    return response.data;
  }
}; 