import React from 'react';
import Image from 'next/image';

interface BasicInfoProps {
  tournament: {
    tournamentName: string;
    startingDate: string;
    endDate: string;
    tier: string;
    region: string;
    tournamentImage: string;
    prize: string;
    status: string;
    tournamentType: string; // Added tournamentType
  };
}

const BasicInfo: React.FC<BasicInfoProps> = ({ tournament }) => {
  return (
    <div className="space-y-6 mt-4 mb-4">
      <div className="bg-[#24272c] rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div>
              <Image className='w-[100px]' width={100} height={100} src={tournament.tournamentImage} alt="Bd71" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white tracking-wide">
                  {tournament.tournamentName}
                </h2>
              </div>
              <div className="grid grid-cols-6 gap-8 mt-6">
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    START DATE
                  </div>
                  <div className="text-white font-medium">
                    {new Date(tournament.startingDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    END DATEAC
                  </div>
                  <div className="text-white font-medium">
                    {new Date(tournament.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    TIER
                  </div>
                  <div className="text-white font-medium">
                    {tournament.tier}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    REGION
                  </div>
                  <div className="text-white font-medium">
                    {tournament.region}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    PRIZE POOL
                  </div>
                  <div className="text-white font-medium">
                    {tournament.prize}
                  </div>
                </div>
                <div>
                  <div className="text-primary text-sm uppercase tracking-wider mb-2">
                    TYPE
                  </div>
                  <div className="text-white font-medium">
                    {tournament.tournamentType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default BasicInfo;
