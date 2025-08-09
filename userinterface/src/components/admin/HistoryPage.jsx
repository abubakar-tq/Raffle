"use client"
import LotterySearchFilter from "../LotterySearchFilter";
import AdminTable from "./AdminTable";
import AddMoreLotteries from "./AddMoreLotteries";
import useWalletStore from "@/lib/useWalletStore";
import { formatRemainingTime } from "@/lib/utils";




const completedLotteryData = [
  { "Lottery Id": "L006", "Lottery Name": "Spring Draw", Entries: 175, "Total Balance": "3.0 ETH", Winner: "0x1234abcd...", status: "Closed" },
  { "Lottery Id": "L007", "Lottery Name": "Autumn Raffle", Entries: 95, "Total Balance": "1.7 ETH", Winner: "0x5678efgh...", status: "Closed" },
  { "Lottery Id": "L008", "Lottery Name": "Midyear Jackpot", Entries: 210, "Total Balance": "3.5 ETH", Winner: "0x9012ijkl...", status: "Open" },
  { "Lottery Id": "L009", "Lottery Name": "Festival Spin", Entries: 130, "Total Balance": "2.2 ETH", Winner: "0x3456mnop...", status: "Closed" },
  { "Lottery Id": "L010", "Lottery Name": "Winter Bonus", Entries: 100, "Total Balance": "1.9 ETH", Winner: "0x7890qrst...", status: "Open" },
];

const HistoryPage = () => {

    //Fetch the lottery Data from zustand
    const raffleContracts = useWalletStore(state => state.raffleContracts);
    const openRaffles = raffleContracts.filter(r => r.is_open);

    if(!openRaffles || openRaffles.length === 0) {
        return <div>No active lotteries found.</div>;
    }

    const lotteryData = openRaffles.map(r => {
        const lastOpened = new Date(r.last_opened_at).getTime();
        const intervalMs = r.time_interval * 1000;
        const now = Date.now();

        const remainingMs = Math.max(lastOpened + intervalMs - now, 0);

        return {
            id: r.raffle_id,
            name: r.name,
            total_entries: r.total_entries,
            total_balance: r.total_balance + " ETH",
            formatted_remaining_time: formatRemainingTime(remainingMs)
        };
    });

    console.log("Lottery Data:" ,lotteryData)




    return (
        <>
            <LotterySearchFilter className="text-[#585858] bg-black border-gray w-1/3" FilterClassName="border-1 border-[#585858]" structureClassName="justify-between" />
            <div className="mt-4">
               
                <AdminTable
                    headers={["Lottery Id", "Lottery Name", "Entries", "Total Balance","Winner","Status",]}
                    lastColumnType="status"
                    data={completedLotteryData}
                   
                />

                <AddMoreLotteries/>
            </div>
        </>
    );
}

export default HistoryPage;
