"use client";

import useWalletStore from "./useWalletStore";

export function useAdmin() {
  const isAdmin = useWalletStore((s) => s.isAdmin);
  const isConnected = useWalletStore((s) => s.isConnected);
  const isDemoAdmin = !isAdmin;
  const canWrite = isAdmin;
  return { isAdmin, isConnected, isDemoAdmin, canWrite };
}

export function canWrite() {
  return useWalletStore.getState()?.isAdmin;
}
