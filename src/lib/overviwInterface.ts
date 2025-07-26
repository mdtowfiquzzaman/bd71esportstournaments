export interface OverviewResponse {
  matches: Match[];
  teams: Team[];
  leaderBoardData: LeaderboardEntry[];
  playerStats: PlayerStats[];
}

export interface Match {
  _id: string;
  matchName: string;
  map: string;
  matchId: string;
  tournamentId: string;
  createdAt: string;
  winningTeam: WinningTeam;
}

export interface PlayerStats {
  playerName: string;
  matchPlayedCount: number;
  kills: number;
  assists: number;
  revives: number;
  deaths: number;
  avgKills: number;
  avgDeaths: number;
  kd: number;
  totalDamage: number;
  avgDamage: number;
  totalSurvivalTime: number;
  avgSurvivalTime: number;
  rank: number;
}

export interface WinningTeam {
  rosterId: string;
  rank: number;
  won: boolean;
  teamId: number;
  participantIds: string[];
  teamName: string;
}

export interface Team {
  _id: string;
  tournamentId: string;
  teamGameId: number;
  teamName: string;
  players: Player[];
  createdAt: string;
}

export interface Player {
  ign: string;
  isLeader: boolean;
}

export interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  matchPlayedCount: number;
  placePoints: number;
  kills: number;
  totalPoints: number;
  avgPoints: number;
  avgKill: number;
  totalWins: number;
  totalDeaths: number;
  avgDeath: number;
  kd: number;
  assists: number;
  revives: number;
  totalDamage: number;
  avgDamage: number;
  rank: number;
}