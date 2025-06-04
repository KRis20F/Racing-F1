import { api } from '../api.config';

export interface PaymentRequest {
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: 'SOL' | 'USDC';
}

export interface PaymentResponse {
  success: boolean;
  transactionHash: string;
  amount: number;
  currency: string;
  timestamp: string;
  message: string;
}

export const paymentEndpoints = {
  // Enviar pago entre usuarios
  sendPayment: async (data: PaymentRequest): Promise<PaymentResponse> => {
    const response = await api.post('/api/payment/send', data);
    return response.data;
  }
}; 