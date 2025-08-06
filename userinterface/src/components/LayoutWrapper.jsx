// src/app/LayoutWrapper.jsx
"use client";

import { useAccount } from "wagmi";
import { useEffect } from "react";
import useWalletStore from "../lib/useWalletStore";
import NavigationBar from "@/components/NavigationBar";
import AdminSidebar from "@/components/admin/Sidebar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const { address, isConnected } = useAccount();

  const { isAdmin, updateWallet } = useWalletStore();

  // useEffect(() => {
  //   const adminAddress = "0x8943F7348E2559C6E69eeCb0dA932424C3E6dC66";
  //   updateWallet({
  //     isConnected,
  //     isAdmin: isConnected && address?.toLowerCase() === adminAddress.toLowerCase(),
  //     address,
  //   });
  // }, [address, isConnected, updateWallet]);

  useEffect(() => {
    if (!isConnected || !address) {
      useWalletStore.getState().clearTokens();
    }
  }, [isConnected, address]);



  return (
    <>
      {!isAdmin ? (
        <>
          <NavigationBar
            className="custom-gradient border-0 rounded-4xl"
            navFirstOption="Lotteries"
            navSecondOption="Community"
            navThirdOption="About Us"
          />
          {children}
          <Footer />
        </>
      ) : (

        <>
          <NavigationBar
            className=" "
            navFirstOption="Overview"
            navSecondOption="Active"
            navThirdOption="History"
            path="/admin"
          />

          <div className="flex p-4">

            <AdminSidebar />

            <div className="py-6 ps-16 pe-4 flex-1">

              {children}
            </div>
          </div>

        </>

      )}
    </>
  );
}