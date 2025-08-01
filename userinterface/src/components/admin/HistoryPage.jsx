import LotterySearchFilter from "../LotterySearchFilter";
import AdminTable from "./AdminTable";
import AddMoreLotteries from "./AddMoreLotteries";




const completedLotteryData = [
  { "Lottery Id": "L006", "Lottery Name": "Spring Draw", Entries: 175, "Total Balance": "3.0 ETH", Winner: "0x1234abcd...", Status: "Closed" },
  { "Lottery Id": "L007", "Lottery Name": "Autumn Raffle", Entries: 95, "Total Balance": "1.7 ETH", Winner: "0x5678efgh...", Status: "Closed" },
  { "Lottery Id": "L008", "Lottery Name": "Midyear Jackpot", Entries: 210, "Total Balance": "3.5 ETH", Winner: "0x9012ijkl...", Status: "Open" },
  { "Lottery Id": "L009", "Lottery Name": "Festival Spin", Entries: 130, "Total Balance": "2.2 ETH", Winner: "0x3456mnop...", Status: "Closed" },
  { "Lottery Id": "L010", "Lottery Name": "Winter Bonus", Entries: 100, "Total Balance": "1.9 ETH", Winner: "0x7890qrst...", Status: "Open" },
];

const HistoryPage = () => {

    




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
