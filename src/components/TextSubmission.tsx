
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

  const getPlaceholder = () => {
    return side === 'plaintiff' 
      ? 'Enter plaintiff opening statement...' 
      : 'Enter defense opening statement...';
  };

  return (
    <div className="space-y-4">
      {!isSubmitted ? (
        <>
          <Textarea
            placeholder={getPlaceholder()}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            disabled={isSubmitted}
          />
          <Button 
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 font-medium"
          >
            Submit Statement
          </Button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{submittedText}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">Statement Submitted</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextSubmission;
