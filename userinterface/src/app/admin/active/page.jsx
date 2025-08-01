import ActivePage from "@/components/admin/ActivePage";




const activeLotteryData = [
  { "Lottery Id": "L011", "Lottery Name": "Spring Raffle", Entries: 160, "Total Balance": "2.7 ETH", "Time Remaining": "1d 8h", Status: "Open" },
  { "Lottery Id": "L012", "Lottery Name": "Summer Draw", Entries: 90, "Total Balance": "1.6 ETH", "Time Remaining": "15h 20m", Status: "Open" },
  { "Lottery Id": "L013", "Lottery Name": "Fall Jackpot", Entries: 245, "Total Balance": "4.2 ETH", "Time Remaining": "2d 5h", Status: "Open" },
  { "Lottery Id": "L014", "Lottery Name": "Winter Spin", Entries: 110, "Total Balance": "1.8 ETH", "Time Remaining": "8h 10m", Status: "Closed" },
  { "Lottery Id": "L015", "Lottery Name": "Year-End Draw", Entries: 80, "Total Balance": "1.4 ETH", "Time Remaining": "3d 12h", Status: "Open" },
];


const lotteryData = [
  { "Lottery Id": "L001", "Lottery Name": "Summer Raffle", Entries: 150, "Total Balance": "2.5 ETH", "Time Remaining": "12h 30m" },
  { "Lottery Id": "L002", "Lottery Name": "Winter Draw", Entries: 85, "Total Balance": "1.8 ETH", "Time Remaining": "3d 2h" },
  { "Lottery Id": "L003", "Lottery Name": "Golden Ticket", Entries: 230, "Total Balance": "4.0 ETH", "Time Remaining": "1d 15h" },
  { "Lottery Id": "L004", "Lottery Name": "Holiday Jackpot", Entries: 120, "Total Balance": "2.0 ETH", "Time Remaining": "5h 45m" },
  { "Lottery Id": "L005", "Lottery Name": "New Year Spin", Entries: 90, "Total Balance": "1.5 ETH", "Time Remaining": "2d 10h" },
];

const Page = () => {

    




    return (
        <ActivePage/>
    );
}

export default Page;
