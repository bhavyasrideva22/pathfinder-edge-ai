import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AssessmentQuestion } from '@/types/assessment';
import { Slider } from '@/components/ui/slider';

interface QuestionCardProps {
  question: AssessmentQuestion;
  value?: string | number;
  onAnswer: (value: string | number) => void;
  onNext: () => void;
  onPrevious?: () => void;
  questionNumber: number;
  totalQuestions: number;
  canGoBack?: boolean;
}

export const QuestionCard = ({
  question,
  value,
  onAnswer,
  onNext,
  onPrevious,
  questionNumber,
  totalQuestions,
  canGoBack = true
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(value || '');

  const handleAnswer = (newValue: string | number) => {
    setSelectedValue(newValue);
    onAnswer(newValue);
  };

  const canProceed = selectedValue !== '';

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={selectedValue as string}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'likert':
        return (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={[selectedValue as number || 3]}
                onValueChange={(values) => handleAnswer(values[0])}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{question.likertLabels?.min}</span>
              <span>{question.likertLabels?.max}</span>
            </div>
            <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
              {[1, 2, 3, 4, 5].map(num => (
                <span key={num} className="w-8 text-center">{num}</span>
              ))}
            </div>
          </div>
        );

      case 'yes-no':
        return (
          <RadioGroup
            value={selectedValue as string}
            onValueChange={handleAnswer}
            className="flex space-x-8 justify-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        );

      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-accent/30 rounded-lg border border-accent">
              <p className="text-sm text-accent-foreground font-medium">Scenario:</p>
              <p className="text-sm text-muted-foreground mt-2">{question.description}</p>
            </div>
            <RadioGroup
              value={selectedValue as string}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option} id={`scenario-${index}`} className="mt-1" />
                  <Label 
                    htmlFor={`scenario-${index}`} 
                    className="text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-card animate-slide-up">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round((questionNumber / totalQuestions) * 100)}%
            </span>
          </div>
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
        {question.description && (
          <p className="text-muted-foreground">{question.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-8">
        {renderQuestionInput()}
        
        <div className="flex justify-between pt-6">
          <Button
            onClick={onPrevious}
            variant="outline"
            disabled={!canGoBack}
            className="min-w-24"
          >
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canProceed}
            variant="hero"
            className="min-w-24"
          >
            {questionNumber === totalQuestions ? 'Complete' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};