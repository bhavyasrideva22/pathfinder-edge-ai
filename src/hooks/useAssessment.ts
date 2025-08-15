import { useState, useCallback } from 'react';
import { AssessmentState, AssessmentAnswer, AssessmentResults } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

const calculateResults = (answers: AssessmentAnswer[]): AssessmentResults => {
  // Create a map for quick answer lookup
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  
  // Helper function to calculate weighted average for a category
  const calculateCategoryScore = (category: string, subcategory?: string) => {
    const relevantQuestions = assessmentQuestions.filter(q => 
      q.category === category && (!subcategory || q.subcategory === subcategory)
    );
    
    let totalScore = 0;
    let totalWeight = 0;
    
    relevantQuestions.forEach(question => {
      const answer = answerMap.get(question.id);
      if (answer !== undefined) {
        const weight = question.weight || 1;
        let normalizedScore = 0;
        
        if (typeof answer === 'number') {
          // For likert scales (1-5), normalize to 0-100
          normalizedScore = ((answer - 1) / 4) * 100;
        } else if (typeof answer === 'string') {
          // For multiple choice, assign scores based on correctness/alignment
          const optionIndex = question.options?.indexOf(answer as string) || 0;
          normalizedScore = getMultipleChoiceScore(question.id, optionIndex);
        }
        
        totalScore += normalizedScore * weight;
        totalWeight += weight;
      }
    });
    
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  };
  
  // Calculate WISCAR subscores
  const wiscarScores = {
    will: calculateCategoryScore('wiscar', 'will'),
    interest: calculateCategoryScore('wiscar', 'interest'),
    skill: calculateCategoryScore('wiscar', 'skill'),
    cognitive: calculateCategoryScore('wiscar', 'cognitive'),
    ability: calculateCategoryScore('wiscar', 'ability'),
    realWorld: calculateCategoryScore('wiscar', 'realWorld')
  };
  
  // Calculate main category scores
  const scores = {
    psychometric: calculateCategoryScore('psychometric'),
    technical: calculateCategoryScore('technical'),
    aptitude: calculateCategoryScore('aptitude'),
    wiscar: wiscarScores,
    overall: 0
  };
  
  // Calculate overall score (weighted average)
  scores.overall = Math.round(
    (scores.psychometric * 0.25 + 
     scores.technical * 0.30 + 
     scores.aptitude * 0.20 + 
     (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) * 0.25)
  );
  
  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no' = 'no';
  let confidence = 0;
  
  if (scores.overall >= 75) {
    recommendation = 'yes';
    confidence = Math.min(95, scores.overall + 10);
  } else if (scores.overall >= 55) {
    recommendation = 'maybe';
    confidence = scores.overall;
  } else {
    recommendation = 'no';
    confidence = Math.max(30, 100 - scores.overall);
  }
  
  // Generate insights
  const insights = generateInsights(scores, wiscarScores);
  const nextSteps = generateNextSteps(recommendation, scores);
  const alternativeRoles = recommendation === 'no' ? generateAlternativeRoles(scores) : undefined;
  const learningPath = generateLearningPath(scores);
  
  return {
    scores,
    recommendation,
    confidence,
    insights,
    nextSteps,
    alternativeRoles,
    learningPath
  };
};

const getMultipleChoiceScore = (questionId: string, optionIndex: number): number => {
  // Define correct answers and scoring logic for multiple choice questions
  const scoring: Record<string, number[]> = {
    'psych_3': [75, 85, 65, 70], // Problem-solving approach
    'psych_5': [90, 30, 50, 40], // Technology interests
    'tech_1': [20, 100, 10, 15], // Edge computing advantage
    'tech_2': [0, 100, 10, 50], // Distributed systems
    'aptitude_1': [0, 0, 100, 0], // Latency calculation
    'tech_3': [20, 100, 60, 30], // Smart factory scenario
    'wiscar_interest_2': [100, 20, 40, 30], // Interesting scenarios
    'wiscar_skill_1': [100, 75, 50, 25], // Linux comfort
    'wiscar_cognitive_1': [100, 80, 70, 85], // Design approach
    'wiscar_real_world_1': [100, 70, 60, 80] // Important skills
  };
  
  return scoring[questionId]?.[optionIndex] || 50;
};

const generateInsights = (scores: any, wiscarScores: any): string[] => {
  const insights = [];
  
  if (scores.psychometric >= 75) {
    insights.push("Your personality profile shows strong alignment with edge cloud architecture roles.");
  }
  
  if (scores.technical >= 70) {
    insights.push("You demonstrate solid technical understanding of edge computing concepts.");
  } else if (scores.technical < 50) {
    insights.push("Consider building foundational knowledge in networking and distributed systems.");
  }
  
  if (wiscarScores.interest >= 80) {
    insights.push("Your strong interest in edge technologies is a significant advantage.");
  }
  
  if (wiscarScores.cognitive >= 75) {
    insights.push("Your problem-solving approach is well-suited for complex system design.");
  }
  
  return insights;
};

const generateNextSteps = (recommendation: string, scores: any): string[] => {
  const steps = [];
  
  if (recommendation === 'yes') {
    steps.push("Begin with edge computing fundamentals and networking courses");
    steps.push("Set up a home lab with Raspberry Pi or edge devices");
    steps.push("Explore Azure IoT Edge or AWS IoT Greengrass");
    steps.push("Join edge computing communities and forums");
  } else if (recommendation === 'maybe') {
    steps.push("Strengthen foundational skills in networking and cloud computing");
    steps.push("Complete introductory courses in distributed systems");
    steps.push("Gain hands-on experience with Linux and containerization");
    steps.push("Reassess in 2-3 months after building these skills");
  } else {
    steps.push("Consider starting with general cloud computing or DevOps");
    steps.push("Build programming and system administration skills");
    steps.push("Explore related fields that match your strengths better");
  }
  
  return steps;
};

const generateAlternativeRoles = (scores: any): string[] => {
  const alternatives = [];
  
  if (scores.technical >= 60) {
    alternatives.push("Cloud Solutions Architect");
    alternatives.push("DevOps Engineer");
  }
  
  if (scores.psychometric >= 70) {
    alternatives.push("IoT Product Manager");
    alternatives.push("Technical Project Manager");
  }
  
  alternatives.push("Site Reliability Engineer");
  alternatives.push("Network Engineer");
  
  return alternatives;
};

const generateLearningPath = (scores: any) => {
  return {
    beginner: [
      "Cloud Computing Fundamentals",
      "Networking Basics (TCP/IP, DNS)",
      "Linux Command Line Essentials",
      "Introduction to Containerization"
    ],
    intermediate: [
      "Distributed Systems Architecture",
      "Edge Computing with AWS/Azure",
      "Kubernetes and Container Orchestration",
      "IoT Device Management"
    ],
    advanced: [
      "Real-time Systems Design",
      "Edge AI and Machine Learning",
      "5G Network Integration",
      "Edge Security Architecture"
    ]
  };
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentStep: 0,
    answers: [],
    timeStarted: new Date(),
    isCompleted: false
  });

  const addAnswer = useCallback((questionId: string, value: number | string) => {
    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== questionId),
        { questionId, value, timestamp: new Date() }
      ]
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  }, []);

  const previousStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1)
    }));
  }, []);

  const completeAssessment = useCallback(() => {
    const results = calculateResults(state.answers);
    setState(prev => ({
      ...prev,
      isCompleted: true,
      results
    }));
  }, [state.answers]);

  const resetAssessment = useCallback(() => {
    setState({
      currentStep: 0,
      answers: [],
      timeStarted: new Date(),
      isCompleted: false
    });
  }, []);

  return {
    state,
    addAnswer,
    nextStep,
    previousStep,
    completeAssessment,
    resetAssessment,
    totalQuestions: assessmentQuestions.length
  };
};