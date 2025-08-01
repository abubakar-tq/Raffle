
"use client";


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import LotterySearchFilter from "@/components/LotterySearchFilter";
import AddMoreLotteries from "@/components/admin/AddMoreLotteries";

export default function LotteryHistoryPage() {
    const params = useParams();
    const { id } = params; // Extract the lottery ID from the URL
    const [historyData, setHistoryData] = useState(null);


    // Simulate fetching history data (replace with real API/smart contract call)
    useEffect(() => {
        const fetchHistory = async () => {
            // Synthetic data for demonstration
            const syntheticHistory = {
                "L006": [
                    { "Winner Address": "0x1234abcd...", Players: 150, Prize: "2.0 ETH", Date: "2025-07-25" },
                    { "Winner Address": "0x5678efgh...", Players: 85, Prize: "1.5 ETH", Date: "2025-07-20" },
                    { "Winner Address": "0x9012ijkl...", Players: 230, Prize: "3.5 ETH", Date: "2025-07-15" },
                    { "Winner Address": "0x3456mnop...", Players: 120, Prize: "2.2 ETH", Date: "2025-07-10" },
                    { "Winner Address": "0x7890qrst...", Players: 90, Prize: "1.8 ETH", Date: "2025-07-05" },
                ],
                "L007": [
                    { "Winner Address": "0x1234abcd...", Players: 150, Prize: "2.0 ETH", Date: "2025-07-25" },
                    { "Winner Address": "0x5678efgh...", Players: 85, Prize: "1.5 ETH", Date: "2025-07-20" },
                    { "Winner Address": "0x9012ijkl...", Players: 230, Prize: "3.5 ETH", Date: "2025-07-15" },
                    { "Winner Address": "0x3456mnop...", Players: 120, Prize: "2.2 ETH", Date: "2025-07-10" },
                    { "Winner Address": "0x7890qrst...", Players: 90, Prize: "1.8 ETH", Date: "2025-07-05" },
                ],
                // Add more synthetic data as needed
            };
            setHistoryData(syntheticHistory[id] || []);
        };
        fetchHistory();
    }, [id]);

    if (!historyData) return <div className="p-4">Loading history...</div>;

    return (
        <div>
            <p className="mb-4">{`Active Lotteries > ${id} `} </p>
        

            <div className="mt-4">
               
                <AdminTable
                    headers={["Lottery Id", "Lottery Name", "Entries", "Total Balance"]}
                    data={historyData}
                   
                />

                <AddMoreLotteries/>
            </div>
        </div>
    );
}







           
       
