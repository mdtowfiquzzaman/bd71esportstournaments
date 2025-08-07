import React, { useState } from "react";
import { PlayerStats } from "@/lib/overviwInterface";

interface PlayerStatsCardProps {
  data: PlayerStats[];
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ data }) => {
  // State to track sorting column and order
  const [sortKey, setSortKey] = useState<keyof PlayerStats | "rank">("kd");
  const [sortAsc, setSortAsc] = useState(false);

  // Handle sort toggle on header click
  const handleSort = (key: keyof PlayerStats | "rank") => {
    if (sortKey === key) {
      // Same column clicked, toggle direction
      setSortAsc(!sortAsc);
    } else {
      // New column clicked, sort descending by default
      setSortKey(key);
      setSortAsc(false);
    }
  };

  // Sort data based on sortKey and sortAsc
  const sortedData = [...data]
    // Add rank after sorting
    .sort((a, b) => {
      let aVal: any = a[sortKey as keyof PlayerStats];
      let bVal: any = b[sortKey as keyof PlayerStats];

      // Handle rank special case (we assign rank after sorting)
      if (sortKey === "rank") return 0;

      // Handle undefined/null values safely
      if (aVal === undefined || aVal === null) aVal = sortAsc ? -Infinity : Infinity;
      if (bVal === undefined || bVal === null) bVal = sortAsc ? -Infinity : Infinity;

      // If values are string, compare case-insensitive
      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      }

      // For numbers, normal comparison
      return sortAsc ? aVal - bVal : bVal - aVal;
    })
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

  // Helper to show sorting arrow
  const renderSortArrow = (key: keyof PlayerStats | "rank") => {
    if (sortKey !== key) return null;
    return sortAsc ? " ▲" : " ▼";
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow mb-4">
      <table className="min-w-max table-auto text-white text-sm text-left border-separate border-spacing-y-[2px] bg-[#080808]">
        <thead>
          <tr className="bg-[#2c2f35] text-center uppercase cursor-pointer select-none">
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("rank")}
            >
              Rank{renderSortArrow("rank")}
            </th>
            <th
              className="px-4 py-3 w-[230px] whitespace-nowrap"
              onClick={() => handleSort("playerName")}
            >
              Player Name{renderSortArrow("playerName")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("matchPlayedCount")}
            >
              Matches{renderSortArrow("matchPlayedCount")}
            </th>
            <th className="px-4 py-3 w-[130px] whitespace-nowrap" onClick={() => handleSort("kills")}>
              Kills{renderSortArrow("kills")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("assists")}
            >
              Assists{renderSortArrow("assists")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("revives")}
            >
              Revives{renderSortArrow("revives")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("deaths")}
            >
              Deaths{renderSortArrow("deaths")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("avgKills")}
            >
              Avg Kills{renderSortArrow("avgKills")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("avgDeaths")}
            >
              Avg Deaths{renderSortArrow("avgDeaths")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("kd")}
            >
              K/D{renderSortArrow("kd")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("totalDamage")}
            >
              Total DMG{renderSortArrow("totalDamage")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("avgDamage")}
            >
              Avg DMG{renderSortArrow("avgDamage")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("totalSurvivalTime")}
            >
              Total Surv Time{renderSortArrow("totalSurvivalTime")}
            </th>
            <th
              className="px-4 py-3 w-[130px] whitespace-nowrap"
              onClick={() => handleSort("avgSurvivalTime")}
            >
              Avg Surv Time{renderSortArrow("avgSurvivalTime")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
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
  );
};

export default PlayerStatsCard;
