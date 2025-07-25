import { LeaderboardEntry } from '@/lib/overviwInterface'
import React from 'react'


interface LeaderBoardCardHeaderProps {
  data: LeaderboardEntry[]
}

const LeaderBoardCardHeader: React.FC<LeaderBoardCardHeaderProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow mb-4">
      <table className="min-w-full table-auto bg-[#24272c] text-white text-sm text-left">
        <thead>
          <tr className="bg-[#2c2f35]">
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Matches</th>
            <th className="px-4 py-3">Place PTS</th>
            <th className="px-4 py-3">Kill</th>
            <th className="px-4 py-3">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ rank, teamName, matchPlayedCount, placePoints, kills, totalPoints }, index) => (
            <tr key={index} className={`${index === 0? 'bg-amber-500': index === 1 ? 'bg-amber-600' : index === 2 ? 'bg-amber-700' : ''} hover:bg-[#32363e] transition text-[20px] border-1 border-t-0 border-l-0 border-r-0 border-b-[#635c52]`}>
              <td className={`px-4 py-3`}>#{rank}</td>
              <td className={`px-4 py-3 ${index === 0? 'bg-amber-500': index === 1 ? 'bg-amber-600' : index === 2 ? 'bg-amber-700' : 'bg-gray-700'}`}>{teamName}</td>
              <td className="px-4 py-3">{matchPlayedCount}</td>
              <td className="px-4 py-3">{placePoints}</td>
              <td className="px-4 py-3">{kills}</td>
              <td className="px-4 py-3">{totalPoints}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  )
}

export default LeaderBoardCardHeader
