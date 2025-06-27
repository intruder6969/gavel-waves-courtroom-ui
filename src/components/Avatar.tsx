
import React from 'react';
import { Speaker, Waves } from 'lucide-react';

interface AvatarProps {
  name: string;
  role: 'judge' | 'plaintiff' | 'defense';
  isSpeaking: boolean;
  avatar?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, role, isSpeaking, avatar }) => {
  const getRoleColor = () => {
    switch (role) {
      case 'judge':
        return 'border-blue-600 bg-blue-50';
      case 'plaintiff':
        return 'border-green-600 bg-green-50';
      case 'defense':
        return 'border-red-600 bg-red-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'judge':
        return 'Judge';
      case 'plaintiff':
        return 'Plaintiff';
      case 'defense':
        return 'Defense';
      default:
        return role;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        {/* Avatar Circle */}
        <div 
          className={`
            relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 
            rounded-full border-4 ${getRoleColor()} 
            flex items-center justify-center
            transition-all duration-300
            ${isSpeaking ? 'scale-110 shadow-lg' : 'scale-100'}
          `}
        >
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="text-2xl md:text-3xl font-bold text-gray-600">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          
          {/* Speaking Indicator */}
          {isSpeaking && (
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 animate-pulse">
              <Speaker className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* Wave Animation */}
        {isSpeaking && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <Waves className="w-8 h-8 md:w-10 md:h-10 text-blue-500 animate-bounce" />
          </div>
        )}
      </div>
      
      {/* Name and Role */}
      <div className="text-center">
        <div className="font-semibold text-sm md:text-base text-gray-800">{name}</div>
        <div className="text-xs md:text-sm text-gray-600">{getRoleTitle()}</div>
      </div>
    </div>
  );
};

export default Avatar;
