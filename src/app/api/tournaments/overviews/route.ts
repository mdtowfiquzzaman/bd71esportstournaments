import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface Participant {
  id: string;
  attributes: {
    stats: {
      kills?: number;
      assists?: number;
      revives?: number;
      damageDealt?: number;
      winPlace?: number;
      timeSurvived?: number;
      name: string;
    };
  };
}

interface Roster {
  attributes: {
    stats: {
      teamId: string;
      rank: number;
    };
  };
  relationships: {
    participants: {
      data: { id: string }[];
    };
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tournamentId = searchParams.get("tournamentId");

    if (!tournamentId || !ObjectId.isValid(tournamentId)) {
      return NextResponse.json({ error: "Invalid tournament ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bd71");

    const matches = await db.collection("matches").find({ tournamentId }).toArray();
    const teams = await db.collection("teams").find({ tournamentId }).toArray();
    const tournament = await db.collection("tournaments").findOne({ _id: new ObjectId(tournamentId) });

    const isSolo = tournament?.tournamentType === "Solo";

    const teamStats: Record<string, Record<string, number | string>> = {};
    const playerStats: Record<string, Record<string, number>> = {};

    const placePointTable: Record<number, number> = {
      1: 10,
      2: 6,
      3: 5,
      4: 4,
      5: 3,
      6: 2,
      7: 1,
      8: 1,
    };

    const enrichedMatches = await Promise.all(
       //@typescript-eslint/no-explicit-any
      matches.map(async (match: Record<string, unknown>) => {
        const matchId = match.matchId;

        const response = await fetch(`https://api.pubg.com/shards/steam/matches/${matchId}`, {
          headers: {
            Accept: "application/vnd.api+json",
          },
        });

        const data = await response.json();

        //@ts-expect-error Reason: data is expected to have a type
        const participants = data.included.filter((i) => i.type === "participant") as Participant[];
        //@ts-expect-error Reason: data is expected to have a type
        const rosters = data.included.filter((i) => i.type === "roster") as Roster[];

        if (!isSolo) {
          for (const roster of rosters) {
            const teamId = roster.attributes.stats.teamId;
            const rank = roster.attributes.stats.rank;
            const participantIds = roster.relationships.participants.data.map((p) => p.id);

            if (!teamId) continue;

            if (!teamStats[teamId]) {
              
              const team = teams.find((t) => t.teamGameId === teamId);
              teamStats[teamId] = {
                teamName: team?.teamName || `Team-${teamId}`,
                matchPlayedCount: 0,
                placePoints: 0,
                kills: 0,
                assists: 0,
                revives: 0,
                damage: 0,
                totalDeaths: 0,
                totalWins: 0,
                totalPoints: 0,
              };
            }

            let kills = 0, assists = 0, revives = 0, damage = 0, deaths = 0;

            for (const pid of participantIds) {
              const p = participants.find((p) => p.id === pid);
              if (!p) continue;

              const stats = p.attributes.stats;
              kills += stats.kills || 0;
              assists += stats.assists || 0;
              revives += stats.revives || 0;
              damage += stats.damageDealt || 0;
              if (stats.winPlace !== 1) deaths += 1;

              const name = stats.name;
              if (!playerStats[name]) {
                playerStats[name] = {
                  kills: 0,
                  assists: 0,
                  revives: 0,
                  damage: 0,
                  deaths: 0,
                  survivalTime: 0,
                  matchPlayedCount: 0,
                };
              }

              playerStats[name].kills += stats.kills || 0;
              playerStats[name].assists += stats.assists || 0;
              playerStats[name].revives += stats.revives || 0;
              playerStats[name].damage += stats.damageDealt || 0;
              playerStats[name].deaths += stats.winPlace !== 1 ? 1 : 0;
              playerStats[name].survivalTime += stats.timeSurvived || 0;
              playerStats[name].matchPlayedCount += 1;
            }

            const placePts = placePointTable[rank] || 0;
            const totalPts = placePts + kills;

            
            const ts = teamStats[teamId] as Record<string, number>;
            ts.matchPlayedCount += 1;
            ts.placePoints += placePts;
            ts.kills += kills;
            ts.assists += assists;
            ts.revives += revives;
            ts.damage += damage;
            ts.totalDeaths += deaths;
            ts.totalPoints += totalPts;
            if (rank === 1) ts.totalWins += 1;
          }

          const winnerRoster = rosters.find((r) => r.attributes.stats.rank === 1);

          const winningTeam = teams.find((t) => t.teamGameId === winnerRoster?.attributes.stats.teamId);
          match.winningTeam = {
            teamId: winningTeam?.teamGameId || winnerRoster?.attributes.stats.teamId,
            teamName: winningTeam?.teamName || `Team-${winnerRoster?.attributes.stats.teamId}`,
          };
        }

        return match;
      })
    );

    const leaderBoardData = Object.entries(teamStats)
      .map(([teamId, stat]) => {
        const s = stat as Record<string, number>;
        const avgPoints = +(s.totalPoints / s.matchPlayedCount).toFixed(2);
        const avgKill = +(s.kills / s.matchPlayedCount).toFixed(2);
        const avgDeath = +(s.totalDeaths / s.matchPlayedCount).toFixed(2);
        const avgDamage = +(s.damage / s.matchPlayedCount).toFixed(2);
        const kd = s.totalDeaths === 0 ? s.kills : +(s.kills / s.totalDeaths).toFixed(2);

        return {
          teamId,
          teamName: s.teamName,
          matchPlayedCount: s.matchPlayedCount,
          placePoints: s.placePoints,
          kills: s.kills,
          totalPoints: s.totalPoints,
          avgPoints,
          avgKill,
          totalWins: s.totalWins,
          totalDeaths: s.totalDeaths,
          avgDeath,
          kd,
          assists: s.assists,
          revives: s.revives,
          totalDamage: s.damage,
          avgDamage,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));

    const playerStatsData = Object.entries(playerStats)
      .map(([playerName, stat]) => {
        const avgKills = +(stat.kills / stat.matchPlayedCount).toFixed(2);
        const avgDeaths = +(stat.deaths / stat.matchPlayedCount).toFixed(2);
        const avgDamage = +(stat.damage / stat.matchPlayedCount).toFixed(2);
        const kd = stat.deaths === 0 ? stat.kills : +(stat.kills / stat.deaths).toFixed(2);
        const avgSurvival = +(stat.survivalTime / stat.matchPlayedCount).toFixed(2);

        return {
          playerName,
          matchPlayedCount: stat.matchPlayedCount,
          kills: stat.kills,
          assists: stat.assists,
          revives: stat.revives,
          deaths: stat.deaths,
          avgKills,
          avgDeaths,
          kd,
          totalDamage: +stat.damage.toFixed(2),
          avgDamage,
          totalSurvivalTime: +stat.survivalTime.toFixed(2),
          avgSurvivalTime: avgSurvival,
        };
      })
      .sort((a, b) => b.kd - a.kd)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));

    return NextResponse.json({
      type: isSolo ? "Solo" : "Team",
      teams,
      matches: enrichedMatches,
      leaderBoardData,
      playerStats: playerStatsData,
    });
  } catch (err) {
    console.error("Leaderboard API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
