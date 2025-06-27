
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TextSubmissionProps {
  side: 'plaintiff' | 'defense';
  onSubmit: (text: string) => void;
  isSubmitted: boolean;
  submittedText: string;
}

const TextSubmission: React.FC<TextSubmissionProps> = ({ 
  side, 
  onSubmit, 
  isSubmitted, 
  submittedText 
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
    }
  };

  const getSideColor = () => {
    return side === 'plaintiff' ? 'border-green-500' : 'border-red-500';
  };

  const getSideTitle = () => {
    return side === 'plaintiff' ? 'Plaintiff Statement' : 'Defense Statement';
  };

  return (
    <Card className={`w-full ${getSideColor()}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl">
          {getSideTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSubmitted ? (
          <>
            <Textarea
              placeholder={`Enter your ${side} statement here...`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none"
              disabled={isSubmitted}
            />
            <Button 
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="w-full"
              variant={side === 'plaintiff' ? 'default' : 'destructive'}
            >
              Submit {side === 'plaintiff' ? 'Plaintiff' : 'Defense'} Statement
            </Button>
          </>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm md:text-base text-gray-700">{submittedText}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">Statement Submitted</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextSubmission;
