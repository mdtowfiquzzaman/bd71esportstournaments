import { PlayerStats } from '@/lib/overviwInterface'
import React from 'react'

interface PlayerStatsCardProps {
  data: PlayerStats[]
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ data }) => {
  // Sort by K/D descending and assign rank
  const rankedData = [...data]
    .sort((a, b) => (b.kd || 0) - (a.kd || 0))
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow mb-4">
      <table className="min-w-max table-auto text-white text-sm text-left border-separate border-spacing-y-[2px] bg-[#080808]">
        <thead>
          <tr className="bg-[#2c2f35] text-center uppercase">
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Rank</th>
            <th className="px-4 py-3 w-[230px] whitespace-nowrap">Player Name</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Matches</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Kills</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Assists</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Revives</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Deaths</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Avg Kills</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Avg Deaths</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">K/D</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Total DMG</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Avg DMG</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Total Surv Time</th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap">Avg Surv Time</th>
          </tr>
        </thead>
        <tbody>
          {rankedData.map((entry, index) => (
            <tr
              key={index}
              className="hover:bg-[#32363e] bg-[#24272c] transition text-[18px] text-center"
            >
              <td className="px-4 py-3 font-bold">{entry.rank}</td>
              <td className="px-4 py-3 font-semibold text-[20px] bg-gray-700">{entry.playerName}</td>
              <td className="px-4 py-3">{entry.matchPlayedCount}</td>
              <td className="px-4 py-3">{entry.kills}</td>
              <td className="px-4 py-3">{entry.assists}</td>
              <td className="px-4 py-3">{entry.revives}</td>
              <td className="px-4 py-3">{entry.deaths}</td>
              <td className="px-4 py-3">{entry.avgKills}</td>
              <td className="px-4 py-3">{entry.avgDeaths}</td>
              <td className="px-4 py-3">{entry.kd?.toFixed(2)}</td>
              <td className="px-4 py-3">{entry.totalDamage?.toFixed(2)}</td>
              <td className="px-4 py-3">{entry.avgDamage?.toFixed(2)}</td>
              <td className="px-4 py-3">{entry.totalSurvivalTime}</td>
              <td className="px-4 py-3">{entry.avgSurvivalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerStatsCard
