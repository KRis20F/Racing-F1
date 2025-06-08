export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  type: string;
  status: 'paid' | 'pending' | 'failed';
  created_at: string;
  paid_at?: string;
  pdf_url?: string;
}

export interface BillingInfo {
  name: string;
  company?: string;
  email: string;
  vatNumber?: string;
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'positive' | 'negative' | 'pending';
  description?: string;
}

export interface BillingState {
  creditBalance: number;
  cards: CreditCard[];
  invoices: Invoice[];
  billingInfo: BillingInfo[];
  transactions: Transaction[];
  latestTransaction?: Transaction;
  hasData: boolean;
} 