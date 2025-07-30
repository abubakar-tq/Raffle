"use client"



import { Search, ListFilter  } from "lucide-react"

export default function LotterySearchFilter({ searchTerm, onSearchChange, onFilterClick }) {
  return (
    <div className="flex justify-between items-center mb-8 mx-20">
      <h1 className="text-2xl font-bold text-white">All Lotteries</h1>

      <div className="flex gap-3">

        <div className="relative flex items-center text-[#585858]  bg-[#FFFFFF] border-2 border-white rounded-3xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-64"
          />
        </div>

        <button
          variant="outline"
          onClick={onFilterClick}
          className="  text-[#585858]  bg-[#FFFFFF] border-2 border-white rounded-3xl flex items-center p-2 px-4"
        >
          <ListFilter />
          Filter
        </button>


      </div>
    </div>
  )
}
