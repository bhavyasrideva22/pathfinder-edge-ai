export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'likert' | 'yes-no' | 'scenario';
  question: string;
  description?: string;
  options?: string[];
  likertLabels?: { min: string; max: string };
  category: 'psychometric' | 'technical' | 'aptitude' | 'wiscar';
  subcategory?: string;
  weight?: number;
}

export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentResults {
  scores: {
    psychometric: number;
    technical: number;
    aptitude: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
    overall: number;
  };
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  insights: string[];
  nextSteps: string[];
  alternativeRoles?: string[];
  learningPath?: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
}

export interface AssessmentState {
  currentStep: number;
  answers: AssessmentAnswer[];
  timeStarted: Date;
  isCompleted: boolean;
  results?: AssessmentResults;
}