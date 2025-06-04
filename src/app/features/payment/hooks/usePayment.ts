import { useMutation } from '@tanstack/react-query';
import { paymentService } from '../../../services/paymentService';
import type {
  PaymentRequest,
  PaymentResponse
} from '../../../api/endpoints/payment.endpoints';

export const usePayment = () => {
  const sendPaymentMutation = useMutation<PaymentResponse, Error, PaymentRequest>({
    mutationFn: paymentService.sendPayment
  });

  return {
    sendPayment: sendPaymentMutation.mutate,
    isSendingPayment: sendPaymentMutation.isPending,
    sendPaymentError: sendPaymentMutation.error
  };
}; 