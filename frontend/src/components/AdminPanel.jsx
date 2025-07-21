"use client"

import { useState, useEffect } from "react"

import { contractAddress, abi } from "../lib/contractData.js"
import { useAccount, useReadContract, } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from "viem/actions"
import { wagmiConfig } from "../lib/wagmiConfig.js"



const AdminPanel = () => {
  const [isOwner, setIsOwner] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const { address: account, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);





  const { data: owner, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getOwner',
    args: [],
  })

  const { data: upkeepNeeded, refetch: upKeepRefetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'checkUpkeep',
    args: ["0x"],
    enabled: false,
  })

  const { data: getRecentWinner, refetch: recentWinnerRefetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getRecentWinner',
    args: [],
    enabled: false,
  })




  useEffect(() => {
    const checkOwner = async () => {

      if (isConnected) {

        if (!owner) {
          setIsOwner(false);
          return;
        }
        setIsOwner(owner.toLowerCase() === account.toLowerCase());

      }
      else {
        setIsOwner(false);
      }
    };
    checkOwner();


  }, [account, isConnected, owner]);



  const handleGetWinner = async () => {
    try {


      setIsProcessing(true);
      console.log("Checking upkeep conditions...");


      const { data: upkeepNeeded } = await upKeepRefetch();
      console.log("Upkeep Needed: ", upkeepNeeded);
      if (!upkeepNeeded) {
        alert("No upkeep needed at this time.");
        setIsProcessing(false);
        return;
      }


      console.log("performUpkeep...");
     

      const txHash = await writeContract(wagmiConfig, {
        address: contractAddress,
        abi,
        functionName: 'performUpkeep',
        args: ["0x"],
      })

      console.log('Transaction sent, waiting for confirmation...')
      await waitForTransactionReceipt(wagmiConfig, { hash: txHash })


      console.log("Winner Selected")
      const recentWinner = await recentWinnerRefetch();
      console.log("Recent Winner: ", recentWinner);

      setIsProcessing(false);
      alert("Winner picked!");
    } catch (error) {
      console.error("Error in upkeep logic:", error);

      // Check if the error contains a revert reason
      if (error.reason) {
        alert("Revert Reason: " + error.reason);
      } else if (error.error && error.error.message) {
        alert("Detailed Error: " + error.error.message);
      } else {
        alert("Unknown Error: " + error.message);
      }

      setIsProcessing(false);
    }
  };




  if (!isMounted) {
    return <div>Loading...</div>
  }


  if (!isConnected) {
    return (
      <div className="admin-page">
        <h1>Admin Panel</h1>
        <div className="admin-notice">Please connect your wallet to access the admin panel.</div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="admin-page">
        <h1>Admin Panel</h1>
        <div className="admin-notice">Only the contract owner can access the admin panel.</div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="admin-actions">
        <div className="admin-card">
          <h2>Contract Actions</h2>
          <button onClick={handleGetWinner} className="admin-btn" disabled={isProcessing}>
            Pick Winner
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
