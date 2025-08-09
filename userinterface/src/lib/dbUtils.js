// import supabase from "./supabase";

// //have to fetch the active lotteries , total players from them , total entries, and from revenue table total revenue ( All these value for the current month ) and then also get values for prev month if there are and give percentage rise or fall from it

// export async function getLotteryOverview() {

//     const { data: currentMonthData } = await supabase
//         .from("raffle")
//         .select("*")
//         .eq("status", "active")
//         .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1))
//         .lt("created_at", new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));

//     const { data: previousMonthData } = await supabase
//         .from("lottery")
//         .select("*")
//         .eq("status", "active")
//         .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))
//         .lt("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1));

//     const currentOverview = {
//         activeLotteries: currentMonthData.length,
//         totalPlayers: currentMonthData.reduce((acc, lottery) => acc + lottery.players, 0),
//         totalEntries: currentMonthData.reduce((acc, lottery) => acc + lottery.entries, 0),
//         totalRevenue: currentMonthData.reduce((acc, lottery) => acc + lottery.revenue, 0)
//     };

//     const previousOverview = {
//         activeLotteries: previousMonthData.length,
//         totalPlayers: previousMonthData.reduce((acc, lottery) => acc + lottery.players, 0),
//         totalEntries: previousMonthData.reduce((acc, lottery) => acc + lottery.entries, 0),
//         totalRevenue: previousMonthData.reduce((acc, lottery) => acc + lottery.revenue, 0)
//     };

//     return {
//         current: currentOverview,
//         previous: previousOverview
//     };
// }