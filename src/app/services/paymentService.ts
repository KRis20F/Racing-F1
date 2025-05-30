import { paymentEndpoints } from '../api/endpoints/payment.endpoints';
import type {
  PaymentRequest,
  PaymentResponse
} from '../api/endpoints/payment.endpoints';

export const paymentService = {
  sendPayment: async (data: PaymentRequest): Promise<PaymentResponse> => {
    return await paymentEndpoints.sendPayment(data);
  }
}; 