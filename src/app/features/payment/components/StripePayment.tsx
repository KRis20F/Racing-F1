import { Alert, Box, Button, Typography } from '@mui/material';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';

// Inicializar Stripe
const stripePromise = loadStripe('tu_publishable_key');

interface StripePaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<StripePaymentProps> = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Crear intención de pago en el backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
        }),
      });

      const { clientSecret } = await response.json();

      // Confirmar pago
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Error en el pago');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!stripe || loading}
      >
        {loading ? 'Procesando...' : `Pagar $${amount}`}
      </Button>
    </form>
  );
};

const StripePayment: React.FC<StripePaymentProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Compra de Tokens
        </Typography>
        <PaymentForm {...props} />
      </Box>
    </Elements>
  );
};

export default StripePayment; 