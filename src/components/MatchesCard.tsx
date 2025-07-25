import { Match } from '@/lib/overviwInterface';
import React from 'react'



interface MatchesCardProps {
  data: Match[]
}

const MatchesCard: React.FC<MatchesCardProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow mb-4">
      <table className="min-w-full table-auto bg-[#24272c] text-white text-sm text-left">
        <thead>
          <tr className="bg-[#2c2f35]">
            <th className="px-4 py-3">Match Name</th>
            <th className="px-4 py-3">Map</th>
            <th className="px-4 py-3">Wining Team</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ matchName, map, winningTeam }, index) => (
            <tr key={index} className="hover:bg-[#32363e] transition text-[20px]">
              <td className="px-4 py-3">{matchName}</td>
              <td className="px-4 py-3">{map}</td>
              <td className="px-4 py-3">{winningTeam.teamName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MatchesCard
