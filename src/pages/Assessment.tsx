import { useEffect } from 'react';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { useAssessment } from '@/hooks/useAssessment';
import { assessmentQuestions, sectionTitles, sectionDescriptions } from '@/data/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Cpu, Target, Users } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const {
    state,
    addAnswer,
    nextStep,
    previousStep,
    completeAssessment,
    resetAssessment,
    totalQuestions
  } = useAssessment();

  const currentQuestion = assessmentQuestions[state.currentStep];
  const currentAnswer = state.answers.find(a => a.questionId === currentQuestion?.id);

  // Get current section info
  const getCurrentSection = () => {
    if (!currentQuestion) return { title: '', description: '', icon: null };
    
    const icons = {
      psychometric: <Brain className="w-5 h-5" />,
      technical: <Cpu className="w-5 h-5" />,
      aptitude: <Target className="w-5 h-5" />,
      wiscar: <Users className="w-5 h-5" />
    };

    return {
      title: sectionTitles[currentQuestion.category],
      description: sectionDescriptions[currentQuestion.category],
      icon: icons[currentQuestion.category]
    };
  };

  const handleAnswer = (value: string | number) => {
    if (currentQuestion) {
      addAnswer(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (state.currentStep < totalQuestions - 1) {
      nextStep();
    } else {
      completeAssessment();
    }
  };

  const handleRestart = () => {
    resetAssessment();
  };

  // Introduction screen
  if (state.currentStep === 0 && state.answers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/')}
                variant="ghost" 
                size="sm"
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <Card className="shadow-card animate-slide-up">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-gradient-primary rounded-lg w-fit">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl">TechFit 360™ Assessment</CardTitle>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A comprehensive evaluation to determine your fit for Edge Cloud Architecture careers. 
                  This assessment will take approximately 20 minutes and covers four key areas.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Assessment Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Brain className="w-6 h-6" />,
                      title: "Psychometric Evaluation",
                      description: "Personality traits, cognitive style, and motivation assessment",
                      questions: "5 questions"
                    },
                    {
                      icon: <Cpu className="w-6 h-6" />,
                      title: "Technical Knowledge", 
                      description: "Edge computing concepts and technical understanding",
                      questions: "4 questions"
                    },
                    {
                      icon: <Target className="w-6 h-6" />,
                      title: "Problem-Solving Aptitude",
                      description: "Logical reasoning and analytical thinking skills",
                      questions: "2 questions"
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "WISCAR Framework",
                      description: "Will, Interest, Skill, Cognitive, Ability, Real-world fit",
                      questions: "6 questions"
                    }
                  ].map((section, index) => (
                    <div key={index} className="p-6 bg-accent/30 rounded-lg border border-accent">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/20 rounded">
                          {section.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{section.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {section.questions}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Before You Begin:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Answer honestly for the most accurate results</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>You can go back to previous questions if needed</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Your data is private and used only for generating results</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Results include personalized learning recommendations</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={nextStep}
                    variant="hero" 
                    size="lg"
                    className="text-lg px-8 py-4 h-auto"
                  >
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (state.isCompleted && state.results) {
    return (
      <div className="min-h-screen bg-gradient-hero py-8">
        <div className="container mx-auto px-6">
          <AssessmentResults 
            results={state.results} 
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  // Question screens
  if (currentQuestion) {
    const section = getCurrentSection();
    
    return (
      <div className="min-h-screen bg-gradient-hero py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header with section info */}
            <div className="text-center space-y-4">
              <Button 
                onClick={() => navigate('/')}
                variant="ghost" 
                size="sm"
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Assessment
              </Button>
              
              <div className="flex items-center justify-center space-x-3">
                {section.icon}
                <h1 className="text-2xl font-bold">{section.title}</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {section.description}
              </p>
            </div>

            {/* Question */}
            <QuestionCard
              question={currentQuestion}
              value={currentAnswer?.value}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={state.currentStep > 0 ? previousStep : undefined}
              questionNumber={state.currentStep + 1}
              totalQuestions={totalQuestions}
              canGoBack={state.currentStep > 0}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Assessment;