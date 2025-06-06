export interface UserStorageData {
  token: string | null;
  user: any;
  walletDialogDismissed: boolean;
}

const STORAGE_KEYS = {
  USER_DATA: 'racing_user_data',
  WALLET_DIALOG_DISMISSED: 'walletDialogDismissed'
} as const;

export const storage = {
  // User data management
  getUserData: (): UserStorageData => {
    return {
      token: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user') || 'null'),
      walletDialogDismissed: localStorage.getItem('walletDialogDismissed') === 'true'
    };
  },

  setUserData: (data: Partial<UserStorageData>) => {
    if (data.token !== undefined) {
      if (data.token === null) {
        localStorage.removeItem('token');
      } else {
        localStorage.setItem('token', data.token);
      }
    }
    if (data.user !== undefined) {
      if (data.user === null) {
        localStorage.removeItem('user');
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    if (data.walletDialogDismissed !== undefined) {
      localStorage.setItem('walletDialogDismissed', data.walletDialogDismissed.toString());
    }
  },

  clearUserData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('walletDialogDismissed');
  },

  // Specific getters/setters
  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token: string | null) => {
    if (token === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: any) => {
    if (user === null) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Wallet dialog management
  getWalletDialogDismissed: () => {
    return localStorage.getItem('walletDialogDismissed') === 'true';
  },

  setWalletDialogDismissed: (dismissed: boolean) => {
    localStorage.setItem('walletDialogDismissed', dismissed.toString());
  },

  clearToken: () => {
    localStorage.removeItem('token');
  }
}; 