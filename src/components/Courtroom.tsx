
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Avatar from './Avatar';
import TextSubmission from './TextSubmission';

interface CourtroomState {
  plaintiffSubmission: {
    isSubmitted: boolean;
    text: string;
  };
  defenseSubmission: {
    isSubmitted: boolean;
    text: string;
  };
  speakingStates: {
    judge: boolean;
    plaintiff: boolean;
    defense: boolean;
  };
  sessionStarted: boolean;
}

const Courtroom: React.FC = () => {
  const [state, setState] = useState<CourtroomState>({
    plaintiffSubmission: { isSubmitted: false, text: '' },
    defenseSubmission: { isSubmitted: false, text: '' },
    speakingStates: { judge: false, plaintiff: false, defense: false },
    sessionStarted: false,
  });

  const handlePlaintiffSubmission = (text: string) => {
    setState(prev => ({
      ...prev,
      plaintiffSubmission: { isSubmitted: true, text }
    }));
  };

  const handleDefenseSubmission = (text: string) => {
    setState(prev => ({
      ...prev,
      defenseSubmission: { isSubmitted: true, text }
    }));
  };

  const canStartSession = state.plaintiffSubmission.isSubmitted && state.defenseSubmission.isSubmitted;

  const handleStartSession = () => {
    if (canStartSession) {
      setState(prev => ({ ...prev, sessionStarted: true }));
      // Simulate judge speaking when session starts
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          speakingStates: { ...prev.speakingStates, judge: true }
        }));
      }, 1000);
    }
  };

  // Demo function to simulate speaking states (for testing)
  const toggleSpeaking = (person: 'judge' | 'plaintiff' | 'defense') => {
    setState(prev => ({
      ...prev,
      speakingStates: {
        judge: person === 'judge' ? !prev.speakingStates.judge : false,
        plaintiff: person === 'plaintiff' ? !prev.speakingStates.plaintiff : false,
        defense: person === 'defense' ? !prev.speakingStates.defense : false,
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            Virtual Courtroom
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {state.sessionStarted ? 'Session in Progress' : 'Awaiting Statements'}
          </p>
        </div>

        {!state.sessionStarted ? (
          /* Pre-Session: Statement Submission */
          <div className="space-y-8">
            {/* Avatars Preview */}
            <div className="flex flex-col items-center space-y-6">
              {/* Judge */}
              <div className="flex justify-center">
                <Avatar 
                  name="Judge Smith" 
                  role="judge" 
                  isSpeaking={false}
                />
              </div>
              
              {/* Lawyers */}
              <div className="flex justify-center space-x-8 md:space-x-16 lg:space-x-24">
                <Avatar 
                  name="Attorney Johnson" 
                  role="plaintiff" 
                  isSpeaking={false}
                />
                <Avatar 
                  name="Attorney Williams" 
                  role="defense" 
                  isSpeaking={false}
                />
              </div>
            </div>

            {/* Statement Submissions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TextSubmission
                side="plaintiff"
                onSubmit={handlePlaintiffSubmission}
                isSubmitted={state.plaintiffSubmission.isSubmitted}
                submittedText={state.plaintiffSubmission.text}
              />
              <TextSubmission
                side="defense"
                onSubmit={handleDefenseSubmission}
                isSubmitted={state.defenseSubmission.isSubmitted}
                submittedText={state.defenseSubmission.text}
              />
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        onClick={handleStartSession}
                        disabled={!canStartSession}
                        size="lg"
                        className="px-8 py-3 text-lg font-semibold"
                      >
                        Start Court Session
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canStartSession && (
                    <TooltipContent>
                      <p>Both plaintiff and defense statements must be submitted before starting the session</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ) : (
          /* Active Session */
          <div className="space-y-8">
            {/* Active Courtroom Layout */}
            <div className="flex flex-col items-center space-y-8">
              {/* Judge */}
              <div className="flex justify-center">
                <Avatar 
                  name="Judge Smith" 
                  role="judge" 
                  isSpeaking={state.speakingStates.judge}
                />
              </div>
              
              {/* Lawyers */}
              <div className="flex justify-center space-x-12 md:space-x-20 lg:space-x-32">
                <Avatar 
                  name="Attorney Johnson" 
                  role="plaintiff" 
                  isSpeaking={state.speakingStates.plaintiff}
                />
                <Avatar 
                  name="Attorney Williams" 
                  role="defense" 
                  isSpeaking={state.speakingStates.defense}
                />
              </div>
            </div>

            {/* Demo Controls (Remove in production) */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 mb-3 font-medium">Demo Controls (Remove in production):</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleSpeaking('judge')}
                >
                  Toggle Judge Speaking
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleSpeaking('plaintiff')}
                >
                  Toggle Plaintiff Speaking
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleSpeaking('defense')}
                >
                  Toggle Defense Speaking
                </Button>
              </div>
            </div>

            {/* Session Status */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Session</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courtroom;
