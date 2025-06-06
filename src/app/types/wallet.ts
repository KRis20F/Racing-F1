export interface WalletCreationResponse {
  user: {
    id: number;
    username: string;
    email: string;
    publicKey: string;
    level: number;
    rank: string;
    experience: number;
  };
  welcomeBonus: {
    amount: number;
    signature: string;
    tokenAccount: string;
  };
}

export interface TokenAccountResponse {
  tokenAccount: string;
  balance: string;
}

export interface TransferResponse {
  signature: string;
  fromBalance: string;
  toBalance: string;
}

export interface TokenBalanceResponse {
  publicKey: string;
  balance: string;
  tokenSymbol: string;
} 