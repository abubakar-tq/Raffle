
"use client"

import { useState, useEffect } from "react"
import RaffleDetails from "./RaffleDetails"
import RaffleStatus from "./RaffleStatus"
import RaffleHistory from "./RaffleHistory"
import CountdownTimer from "./CountdownTimer"
import { abi,contractAddress } from "../lib/contractData.js"
import { fetchWinnerHistory } from "../lib/fetchWinnerHistory.js"
import {  useAccount, useBalance, usePublicClient,useWatchContractEvent, useChainId } from "wagmi"
import { readContract, getBalance, writeContract, waitForTransactionReceipt } from "wagmi/actions"
import { parseEther, formatEther,getAbiItem } from 'viem'
import {wagmiConfig} from '../lib/wagmiConfig.js'
import { sepolia } from 'wagmi/chains'





const Home = () => {
  const [raffleData, setRaffleData] = useState({})

  const [history, setHistory] = useState([])

  const { address: account, isConnected } = useAccount()





  const winnerPickedEvent = getAbiItem({
    abi,
    name: "WinnerPicked",
  })




  // 1. Fetch existing history on load
  useEffect(() => {
    const getHistory = async () => {
      console.log("Here in get history")
      const data = await fetchWinnerHistory()
      console.log("Fetched history:", data)
      setHistory(data)
    }

    getHistory()
  }, [isConnected, account])

  // -2 For new Winners Picked Event

  useWatchContractEvent({
    address: contractAddress,
    abi: [winnerPickedEvent],
    eventName: "WinnerPicked",
    onLogs: (logs) => {
      const log = logs[0]
      const { args } = log
      const newEntry = {
        winner: args.player,
        amount: Number(formatEther(args.amount)),
        date: new Date(Number(args.timestamp) * 1000).toISOString().split("T")[0],
      }

      setHistory((prev) => [newEntry, ...prev])
    },
  })

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log("Fetching raffle data...")

        // 1. Get total players
        const players = await readContract(wagmiConfig,{
          address: contractAddress,
          abi,
          functionName: "getTotalPlayers",
        })

        // 2. Get all raffle attributes
        const allAttributes = await readContract(wagmiConfig,{
          address: contractAddress,
          abi,
          functionName: "getAllRaffleAttributes",
        })

        const entranceFee = allAttributes[0]
        const status = allAttributes[6] === 0n ? "Open" : "Closed"

        // 3. Get balance of contract
        const balance = await getBalance(wagmiConfig,{
          address: contractAddress,
        })

        // 4. Get last winner
        const lastWinner = await readContract(wagmiConfig,{
          address: contractAddress,
          abi,
          functionName: "getRecentWinner",
        })

        // 5. Get time left
        const endTime = await readContract(wagmiConfig,{
          address: contractAddress,
          abi,
          functionName: "getTimeLeft",
        })

        const now = Date.now()
        const endDate = new Date(now + Number(endTime) * 1000).toISOString()

      

        // Update state
        setRaffleData({
          entranceFee: formatEther(entranceFee),
          players: Number(players),
          contractBalance: formatEther(balance.value),
          lastWinner,
          status,
          endTime: endDate,
          history,
        })

        console.log("Raffle Data:", raffleData)


        console.log("Fetched raffle data ✅")
      } catch (err) {
        console.error("Error fetching raffle data:", err)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 30_000)
    return () => clearInterval(interval)
  }, [])



const handleEnterRaffle = async () => {
  if (!isConnected && !account) {
    throw new Error('Please connect your wallet first')
  }

  if (raffleData.status !== 'Open') {
    throw new Error('Raffle is closed')
  }

  try {
    const entranceFeeInWei = parseEther(raffleData.entranceFee.toString())

    console.log('Entering the raffle...')

    console.log('Account:', account)

    const txHash = await writeContract(wagmiConfig,{
      address: contractAddress,
      
      abi,
      functionName: 'enterRaffle',
      value: entranceFeeInWei,
    })

    console.log('Transaction sent, waiting for confirmation...')
    await waitForTransactionReceipt(wagmiConfig, { hash: txHash })

    // Optimistic UI update
    setRaffleData((prev) => ({
      ...prev,
      players: prev.players + 1,
      contractBalance: Number(prev.contractBalance) + Number(prev.entranceFee),
    }))

    console.log('Transaction Confirmed')
  } catch (err) {
    console.error('Transaction Failed', err)
  }

}

 if(!raffleData || Object.keys(raffleData).length === 0) {
  return <div>Loading...</div>
 }


return (
  <div className="home-page">
    <RaffleDetails
      entranceFee={raffleData.entranceFee}
      players={raffleData.players}
      contractBalance={raffleData.contractBalance}
      lastWinner={raffleData.lastWinner}
    />

    <div className="raffle-info-row">
      <RaffleStatus status={raffleData.status} onEnterRaffle={handleEnterRaffle} />
      <CountdownTimer endTime={raffleData.endTime} />
    </div>

    <RaffleHistory history={history} />
  </div>
)
}

export default Home
