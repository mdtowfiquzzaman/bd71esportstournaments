import { Team } from '@/lib/overviwInterface';
import React from 'react'


interface TeamCardProps {
    data: Team[]
}

const TeamCard: React.FC<TeamCardProps> = ({ data }) => {
    
    
    return (
        <div className="overflow-x-auto rounded-lg shadow mb-4 grid grid-cols-4 gap-8">
            {
                data.map((team) => (
                <div key={team._id} className="flex flex-col gap-2 p-4 bg-[#24272c] text-white rounded-xl">
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='w-20 h-20 bg-amber-900 rounded-full flex justify-center items-center text-3xl'>#{team.teamGameId}</div>
                        <div className='text-2xl font-bold overflow-ellipsis'>{team.teamName}</div>
                    </div>
                    <div className='w-full flex flex-col gap-2 p-4 bg-[#24272c] text-white rounded-xl'>
                        {
                            team.players.map((player, idx) => (
                                <div key={idx} className='bg-gray-900 p-3 rounded-xl flex flex-row justify-between items-center'><h4 className=' text-[22px]'>{player.ign}</h4>
                                {
                                    player.isLeader &&
                                    <span className='bg-amber-700 p-1 rounded text-sm'>Leader</span>
                                } 
                                </div>
                            ))
                        }

                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default TeamCard
