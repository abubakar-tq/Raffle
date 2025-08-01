// src/lib/useWalletStore.js
import {create} from "zustand";

const useWalletStore = create((set) => ({
  isConnected: false,
  isAdmin: false,
  address: null,
  // Actions to update state
  setWallet: (state) =>
    set(() => ({
      isConnected: state.isConnected,
      isAdmin: state.isAdmin,
      address: state.address,
    })),
  // Additional setter for convenience
  updateWallet: (newState) => set((state) => ({ ...state, ...newState })),
}));

export default useWalletStore;