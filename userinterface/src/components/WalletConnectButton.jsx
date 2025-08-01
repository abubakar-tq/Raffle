"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import useWalletStore from "../lib/useWalletStore";

export default function WalletConnectButton({ className = "", type = "" }) {
  const [isMounted, setIsMounted] = useState(false);
  const { updateWallet } = useWalletStore();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, isPending, pendingConnector, error } = useConnect();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDisconnect = () => {
    disconnect();
    updateWallet({ isConnected: false, isAdmin: false, address: null });
  };

  if (!isMounted) return <div style={{ height: "42px" }} />;

  const metaMaskConnector = connectors.find((c) => c.id === "metaMaskSDK");

  if (isConnected) {
    return (
      <button
        onClick={handleDisconnect}
        className={`px-4 py-2 bg-white text-black rounded-full ${className}`}
      >
        Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: metaMaskConnector })}
      type={type}
      disabled={isPending}
      className={`px-4 py-2 bg-white text-black rounded-full ${className} ${
        isPending ? "opacity-50" : ""
      }`}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}