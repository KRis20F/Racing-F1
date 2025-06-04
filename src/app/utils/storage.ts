interface UserStorageData {
  token: string | null;
  publicKey: string | null;
  username: string | null;
  lastLogin: string | null;
}

const STORAGE_KEYS = {
  USER_DATA: 'racing_user_data',
  WALLET_DIALOG_DISMISSED: 'walletDialogDismissed'
} as const;

export const storage = {
  // User data management
  getUserData(): UserStorageData {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!data) {
      return {
        token: null,
        publicKey: null,
        username: null,
        lastLogin: null
      };
    }
    return JSON.parse(data);
  },

  setUserData(data: Partial<UserStorageData>) {
    const currentData = this.getUserData();
    const newData = {
      ...currentData,
      ...data,
      lastLogin: data.token ? new Date().toISOString() : currentData.lastLogin
    };
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newData));
  },

  clearUserData() {
    try {
      // 1. Clear specific keys first
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });

      // 2. Clear additional known keys
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('walletDialogDismissed');

      // 3. Clear all remaining data
      localStorage.clear();
      sessionStorage.clear();

      // 4. Double check specific keys are gone
      if (localStorage.length > 0) {
        console.warn('Forcing removal of remaining items:', localStorage.length);
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key) localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
      // Last resort: brute force clear
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        console.error('Failed to clear storage:', e);
      }
    }
  },

  // Specific getters/setters
  getToken(): string | null {
    return this.getUserData().token;
  },

  setToken(token: string | null) {
    if (!token) {
      this.clearUserData();
    } else {
      this.setUserData({ token });
    }
  },

  getPublicKey(): string | null {
    return this.getUserData().publicKey;
  },

  setPublicKey(publicKey: string) {
    this.setUserData({ publicKey });
  },

  // Wallet dialog management
  isWalletDialogDismissed(): boolean {
    return localStorage.getItem(STORAGE_KEYS.WALLET_DIALOG_DISMISSED) === 'true';
  },

  setWalletDialogDismissed(dismissed: boolean) {
    localStorage.setItem(STORAGE_KEYS.WALLET_DIALOG_DISMISSED, dismissed.toString());
  }
}; 