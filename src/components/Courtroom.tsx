
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Volume2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Virtual Courtroom
          </h1>
          <p className="text-lg text-gray-600">
            {state.sessionStarted 
              ? (state.speakingStates.judge ? 'Judge Williams is speaking' :
                 state.speakingStates.plaintiff ? 'Sarah Chen is speaking' :
                 state.speakingStates.defense ? 'Michael Torres is speaking' :
                 'Session in progress')
              : 'Both parties must submit their opening statements before proceeding'
            }
          </p>
        </div>

        {!state.sessionStarted ? (
          /* Pre-Session: Statement Submission */
          <div className="space-y-12">
            {/* Judge Card */}
            <div className="flex justify-center">
              <div className="bg-orange-50 rounded-2xl p-8 shadow-sm border border-orange-100">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">J</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Judge Williams</h3>
                  <p className="text-orange-600 font-medium">Presiding Judge</p>
                </div>
              </div>
            </div>

            {/* Attorneys Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plaintiff Attorney */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">S</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Sarah Chen</h3>
                    <p className="text-gray-600">Plaintiff Attorney</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      Pending
                    </span>
                  </div>
                </div>
                <TextSubmission
                  side="plaintiff"
                  onSubmit={handlePlaintiffSubmission}
                  isSubmitted={state.plaintiffSubmission.isSubmitted}
                  submittedText={state.plaintiffSubmission.text}
                />
              </div>

              {/* Defense Attorney */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">M</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Michael Torres</h3>
                    <p className="text-gray-600">Defense Attorney</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      Pending
                    </span>
                  </div>
                </div>
                <TextSubmission
                  side="defense"
                  onSubmit={handleDefenseSubmission}
                  isSubmitted={state.defenseSubmission.isSubmitted}
                  submittedText={state.defenseSubmission.text}
                />
              </div>
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
                        className="px-12 py-4 text-lg font-semibold bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400"
                      >
                        ▶ Start Court Session
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
          <div className="space-y-12">
            {/* Judge Card - Active Session */}
            <div className="flex justify-center">
              <div className={`
                bg-white rounded-2xl p-8 shadow-sm transition-all duration-300
                ${state.speakingStates.judge 
                  ? 'border-2 border-blue-400 shadow-lg' 
                  : 'border border-gray-200'
                }
              `}>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">J</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Judge Williams</h3>
                  <p className="text-orange-600 font-medium mb-3">Presiding Judge</p>
                  
                  {state.speakingStates.judge && (
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">Speaking</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Attorneys - Active Session */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plaintiff */}
              <div className={`
                bg-white rounded-2xl p-8 shadow-sm text-center transition-all duration-300
                ${state.speakingStates.plaintiff 
                  ? 'border-2 border-blue-400 shadow-lg' 
                  : 'border border-gray-200'
                }
              `}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">S</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Sarah Chen</h3>
                  <p className="text-gray-600 mb-3">Plaintiff Attorney</p>
                  
                  {state.speakingStates.plaintiff && (
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">Speaking</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Defense */}
              <div className={`
                bg-white rounded-2xl p-8 shadow-sm text-center transition-all duration-300
                ${state.speakingStates.defense 
                  ? 'border-2 border-blue-400 shadow-lg' 
                  : 'border border-gray-200'
                }
              `}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">M</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Michael Torres</h3>
                  <p className="text-gray-600 mb-3">Defense Attorney</p>
                  
                  {state.speakingStates.defense && (
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">Speaking</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
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
                  Judge Speaks
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleSpeaking('plaintiff')}
                >
                  Plaintiff Speaks
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleSpeaking('defense')}
                >
                  Defense Speaks
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courtroom;
