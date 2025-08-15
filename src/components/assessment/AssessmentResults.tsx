import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults as Results } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, ArrowRight, Target, BookOpen, Users } from 'lucide-react';

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      case 'no': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="w-6 h-6" />;
      case 'maybe': return <AlertCircle className="w-6 h-6" />;
      case 'no': return <XCircle className="w-6 h-6" />;
      default: return null;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Conditionally Recommended';
      case 'no': return 'Not Recommended Currently';
      default: return 'Unknown';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-slide-up">
      {/* Overall Recommendation */}
      <Card className="shadow-card border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-${getRecommendationColor()}/20`}>
              {getRecommendationIcon()}
            </div>
            <div>
              <CardTitle className="text-2xl">Edge Cloud Architecture Assessment</CardTitle>
              <p className="text-muted-foreground">Your personalized career fit evaluation</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{getRecommendationText()}</h3>
              <p className="text-muted-foreground">Confidence: {results.confidence}%</p>
            </div>
            <Badge variant={getRecommendationColor() as any} className="text-lg px-4 py-2">
              {results.scores.overall}/100
            </Badge>
          </div>
          
          <Progress value={results.confidence} className="h-3" />
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Core Assessment Scores</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Psychometric Fit', score: results.scores.psychometric },
              { label: 'Technical Knowledge', score: results.scores.technical },
              { label: 'Problem-Solving Aptitude', score: results.scores.aptitude },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.score}/100</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>WISCAR Framework Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">
              Comprehensive readiness evaluation
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Will (Motivation)', score: results.scores.wiscar.will },
              { label: 'Interest', score: results.scores.wiscar.interest },
              { label: 'Current Skill Level', score: results.scores.wiscar.skill },
              { label: 'Cognitive Readiness', score: results.scores.wiscar.cognitive },
              { label: 'Learning Ability', score: results.scores.wiscar.ability },
              { label: 'Real-World Fit', score: results.scores.wiscar.realWorld },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.score}/100</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {results.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-accent/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="w-5 h-5" />
            <span>Recommended Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      {results.learningPath && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Personalized Learning Path</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { level: 'Beginner', skills: results.learningPath.beginner, color: 'bg-success/20' },
                { level: 'Intermediate', skills: results.learningPath.intermediate, color: 'bg-warning/20' },
                { level: 'Advanced', skills: results.learningPath.advanced, color: 'bg-primary/20' },
              ].map((path, index) => (
                <div key={index} className={`p-4 rounded-lg ${path.color}`}>
                  <h4 className="font-semibold mb-3">{path.level}</h4>
                  <ul className="space-y-2">
                    {path.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-sm flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Roles */}
      {results.alternativeRoles && results.alternativeRoles.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Alternative Career Paths</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Based on your assessment, these roles might be a better fit:
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {results.alternativeRoles.map((role, index) => (
                <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4 pt-8">
        <Button onClick={onRestart} variant="outline" size="lg">
          Take Assessment Again
        </Button>
        <Button variant="hero" size="lg">
          Explore Learning Resources
        </Button>
      </div>
    </div>
  );
};