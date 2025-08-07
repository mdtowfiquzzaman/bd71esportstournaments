import { LeaderboardEntry } from '@/lib/overviwInterface'
import React, { useState } from 'react'

interface TeamStatsCardProps {
  data: LeaderboardEntry[]
}

const TeamStatsCard: React.FC<TeamStatsCardProps> = ({ data }) => {
  // State for sorting column and ascending/descending
  const [sortKey, setSortKey] = useState<keyof LeaderboardEntry>('totalPoints')
  const [sortAsc, setSortAsc] = useState(false)

  const handleSort = (key: keyof LeaderboardEntry) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc) // Toggle direction if same key clicked
    } else {
      setSortKey(key)
      setSortAsc(false) // Default desc on new column
    }
  }

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortKey]
    let bVal = b[sortKey]

    if (aVal === undefined || aVal === null) aVal = sortAsc ? -Infinity : Infinity
    if (bVal === undefined || bVal === null) bVal = sortAsc ? -Infinity : Infinity

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortAsc ? -1 : 1
      if (aVal > bVal) return sortAsc ? 1 : -1
      return 0
    }

    // For numbers
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
  })

  const renderSortArrow = (key: keyof LeaderboardEntry) => {
    if (sortKey !== key) return null
    return sortAsc ? ' ▲' : ' ▼'
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow mb-4">
      <table className="min-w-max table-auto text-white text-sm text-left border-separate border-spacing-y-[2px] bg-[#080808]">
        <thead>
          <tr className="bg-[#2c2f35] text-center uppercase cursor-pointer select-none">
            <th
              className="px-4 py-3 w-[230px] whitespace-nowrap"
              onClick={() => handleSort('teamName')}
            >
              Team Name{renderSortArrow('teamName')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('matchPlayedCount')}
            >
              Number of Matches{renderSortArrow('matchPlayedCount')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('placePoints')}
            >
              Place Points{renderSortArrow('placePoints')}
            </th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap" onClick={() => handleSort('kills')}>
              Kill{renderSortArrow('kills')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('totalPoints')}
            >
              Total Points{renderSortArrow('totalPoints')}
            </th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap" onClick={() => handleSort('avgPoints')}>
              AVG Points{renderSortArrow('avgPoints')}
            </th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap" onClick={() => handleSort('avgKill')}>
              AVG Kill{renderSortArrow('avgKill')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('totalWins')}
            >
              Wins{renderSortArrow('totalWins')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('totalDeaths')}
            >
              Deaths{renderSortArrow('totalDeaths')}
            </th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap" onClick={() => handleSort('avgDeath')}>
              AVG Deaths{renderSortArrow('avgDeath')}
            </th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap" onClick={() => handleSort('kd')}>
              KD{renderSortArrow('kd')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('assists')}
            >
              Assists{renderSortArrow('assists')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('revives')}
            >
              Revives{renderSortArrow('revives')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('totalDamage')}
            >
              Damage{renderSortArrow('totalDamage')}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort('avgDamage')}
            >
              AVG Damage{renderSortArrow('avgDamage')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
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
