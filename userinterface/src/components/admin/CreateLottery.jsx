
"use client";

import { useState, useEffect } from "react";
import CreateLotteriesButton from "./CreateLotteriesButton";

const CreateLottery = () => {
    // State for form fields
    const [lotteryId, setLotteryId] = useState("");
    const [lotteryName, setLotteryName] = useState("");
    const [blockchain, setBlockchain] = useState("Ethereum");
    const [entryFee, setEntryFee] = useState("");
    const [days, setDays] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    // Simulate fetching lottery ID (replace with real data fetch)
    useEffect(() => {
        const fetchLotteryId = async () => {
            // Mock API call (replace with wagmi or contract call)
            const newId = `L${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
            setLotteryId(newId);
        };
        fetchLotteryId();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            lotteryId,
            lotteryName,
            entryFee,
            timeInterval: `${days} days, ${minutes} minutes, ${seconds} seconds`,
        });
        // Add logic to create lottery (e.g., call smart contract)
        alert("Lottery created! (Simulated)");
    };

    return (
        <div className="w-2/3">

            <form onSubmit={handleSubmit} className="">
                {/* First Row: Lottery ID and Currency */}
                <div className="flex space-x-4  mb-6">
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#FFFFFF]">Lottery ID</label>
                        <input
                            type="text"
                            value={lotteryId}
                            readOnly
                            className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl  text-[#747474]"
                            placeholder="Auto-filled"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#FFFFFF]">Blockchain</label>
                        <select
                            value={blockchain}
                            onChange={(e) => setBlockchain(e.target.value)}
                            className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl   text-[#FFFFFF]"
                        >
                            <option value="Ethereum">Ethereum</option>
                           

                        </select>
                    </div>
                </div>

                {/* Second Row: Lottery Name */}
                <div className=" mb-6">
                    <label className="block mb-2 text-sm font-medium text-[#FFFFFF]">Lottery Name</label>
                    <input
                        type="text"
                        value={lotteryName}
                        onChange={(e) => setLotteryName(e.target.value)}
                        className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl "
                        placeholder="Enter lottery name"
                        required
                    />
                </div>

                {/* Third Row: Entry Fee */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-[#FFFFFF]">Entry Fee</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={entryFee}
                            onChange={(e) => setEntryFee(e.target.value)}
                            className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl  pr-16"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700">
                            ETH
                        </span>
                    </div>
                </div>

                {/* Fourth Row: Time Interval */}
                <div className="mb-12">
                    <label className="block mb-2 text-sm font-medium text-[#FFFFFF]">Time Interval</label>
                    <div className="flex space-x-4 ">
                        <div className="flex-1">
                            <input
                                type="number"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl "
                                placeholder="Days"
                                min="0"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl"
                                placeholder="Minutes"
                                min="0"
                                max="59"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                value={seconds}
                                onChange={(e) => setSeconds(e.target.value)}
                                className="mt-1 block w-full p-2 border-2 border-[#131313] rounded-xl"
                                placeholder="Seconds"
                                min="0"
                                max="59"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Create Lottery Button */}
                <CreateLotteriesButton className="font-semibold" />
            </form>
        </div>
    );
};

export default CreateLottery;