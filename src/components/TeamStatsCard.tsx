import { LeaderboardEntry } from '@/lib/overviwInterface'
import React from 'react'

interface TeamStatsCardProps {
  data: LeaderboardEntry[]
}

const TeamStatsCard: React.FC<TeamStatsCardProps> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow mb-4">
      <table className="min-w-max table-auto text-white text-sm text-left border-separate border-spacing-y-[2px] bg-[#080808]">
        <thead>
          <tr className="bg-[#2c2f35] text-center uppercase">
            <th className="px-4 py-3 w-[230px] whitespace-nowrap">Team Name</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Number of Matches</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Place Points</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Kill</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Total Points</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">AVG Points</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">AVG Kill</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Wins</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Deaths</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">AVG Deaths</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">KD</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Assists</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Revives</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Damage</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">AVG Damage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={index}
              className="hover:bg-[#32363e] bg-[#24272c] transition text-[18px] text-center rounded"
            >
              <td className="px-4 py-3 w-[230px] whitespace-nowrap font-bold text-[20px] bg-gray-700">
                {entry.teamName}
              </td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.matchPlayedCount}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.placePoints}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.kills}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.totalPoints}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.avgPoints}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.avgKill}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.totalWins}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.totalDeaths}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.avgDeath}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.kd}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.assists}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.revives}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.totalDamage.toFixed(2)}</td>
              <td className="px-4 py-3 w-[130px] whitespace-nowrap">{entry.avgDamage.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamStatsCard
