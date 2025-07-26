'use client';
import React, { useEffect, useState } from 'react';
import LeaderBoardCardHeader from './leaderBoardCardHeader';
import MatchesCard from './MatchesCard';
import TeamCard from './TeamCard';
import { LeaderboardEntry, Match, OverviewResponse, PlayerStats, Team } from '@/lib/overviwInterface';
import { useParams } from 'next/navigation';
import TeamStatsCard from './TeamStatsCard';
import PlayerStatsCard from './PlayerStatsCard';
 // Import interfaces from a separate file if preferred

const tabItems = ['LEADERBOARDS', 'TEAMS', 'MATCHES', 'TEAM STATS', 'PLAYER STATS'];

const TabsSection: React.FC = () => {
  const { tournamentId } = useParams();

  const [activeTab, setActiveTab] = useState('LEADERBOARDS');
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]); // Adjust type as needed
  const [playerStatsData, setPlayerStatsData] = useState<PlayerStats[]>([]); // Adjust type as needed
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!tournamentId) return;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/tournaments/overviews?tournamentId=${tournamentId}`);
        const data: OverviewResponse = await res.json();

        setMatchesData(data.matches || []);
        setTeamsData(data.teams || []);
        setLeaderboardData(data.leaderBoardData);
        setPlayerStatsData(data.playerStats); // Set player stats data
        
      } catch (error) {
        console.error('Error fetching overview data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [tournamentId]);

  return (
    <div className="w-full bg-[#1A1A1A]">
      {/* Tabs */}
      <div style={{borderBottom: '1px solid #FBBF24'}} className="flex justify-between px-6 md:px-10 text-sm font-semibold text-white">
        {tabItems.map((tab) => (
          <button
            style={{ borderBottom: activeTab === tab ? '5px solid #FBBF24' : 'none' }}
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-center transition-all duration-300 ${
              activeTab === tab
                ? 'text-yellow-500'
                : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 text-white">
        {loading ? (
          <div className="text-center text-yellow-400">Loading...</div>
        ) : (
          <>
            {activeTab === 'LEADERBOARDS' && (
              <LeaderBoardCardHeader data={leaderboardData} />
            )}
            {activeTab === 'MATCHES' && <MatchesCard data={matchesData} />}
            {activeTab === 'TEAMS' && <TeamCard data={teamsData} />}
            {activeTab === 'TEAM STATS' && 
              <div>
                <TeamStatsCard data={leaderboardData} />
              </div>
            }
            {activeTab === 'PLAYER STATS' && 
            <div>
              <PlayerStatsCard data={playerStatsData} />
            </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default TabsSection;
