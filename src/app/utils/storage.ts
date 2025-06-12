import type { UserProfile } from '../types/api/auth.types';

export interface UserStorageData {
  token: string | null;
  user: UserProfile | null;
  walletDialogDismissed: boolean;
}

const STORAGE_KEYS = {
  USER_DATA: 'racing_user_data',
  WALLET_DIALOG_DISMISSED: 'walletDialogDismissed',
  TOKEN: 'token',
  USER: 'user',
  PERSIST_ROOT: 'persist:root',
  LAST_LOGIN: 'lastLogin'
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

  setUserData: (data: Partial<UserStorageData> | UserProfile) => {
    if ('token' in data) {
      if (data.token === null) {
        localStorage.removeItem('token');
      } else if (data.token !== undefined) {
        localStorage.setItem('token', data.token);
      }
    }
    
    if ('user' in data) {
      if (data.user === null) {
        localStorage.removeItem('user');
      } else if (data.user !== undefined) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } else if (!('token' in data)) {
      // If data is UserProfile
      localStorage.setItem('user', JSON.stringify(data));
    }

    if ('walletDialogDismissed' in data && data.walletDialogDismissed !== undefined) {
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
    return user ? JSON.parse(user) as UserProfile : null;
  },

  setUser: (user: UserProfile | null) => {
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
  },

  clearAllStorage: () => {
    const keysToRemove = Object.values(STORAGE_KEYS);
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // También limpiamos todo por si acaso hay otras claves
    localStorage.clear();
    sessionStorage.clear();
  }
}; 