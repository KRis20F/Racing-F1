import { useMutation } from '@tanstack/react-query';
import { paymentEndpoints, type PaymentRequest, type PaymentResponse } from '../api/endpoints/payment.endpoints';

export const useSendPayment = () => {
  return useMutation<PaymentResponse, Error, PaymentRequest>({
    mutationFn: paymentEndpoints.sendPayment,
    onError: (error) => {
      console.error('Error al enviar pago:', error);
    }
  });
}; 