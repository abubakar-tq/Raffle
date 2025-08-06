import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import supabase from './supabase'; // Adjust path to your Supabase client file

const useWalletStore = create(
  persist(
    (set, get) => ({
      isConnected: false,
      isAdmin: false,
      address: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      raffleContracts: [],
      // Set wallet and authentication state
      setWallet: (state) =>
        set({
          isConnected: state.isConnected,
          isAdmin: state.isAdmin,
          address: state.address,
          accessToken: state.accessToken || null,
          refreshToken: state.refreshToken || null,
          isAuthenticated: !!state.accessToken,
        }),
      // Clear tokens and sign out from Supabase
      clearTokens: async () => {
        try {
          await supabase.auth.signOut();
          set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isAdmin: false,
            address: null,
            isConnected: false,
            raffleContracts: [],
          });
        } catch (error) {
          console.error('Sign-out error:', error.message);
        }
      },
      // Add a new raffle contract address
      addRaffleContract: (contractAddress) =>
        set((state) => ({
          raffleContracts: [...state.raffleContracts, contractAddress],
        })),
      // Update specific fields
      updateWallet: (newState) => set((state) => ({ ...state, ...newState })),
    }),
    {
      name: 'lottery-wallet-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAdmin: state.isAdmin,
        address: state.address,
        raffleContracts: state.raffleContracts,
      }),
      onRehydrateStorage: () => (state) => {
        // On rehydration, check wallet connection (handled in component with useAccount)
        if (!state?.address) {
          state?.clearTokens();
        }
      },
    }
  )
);

export default useWalletStore;