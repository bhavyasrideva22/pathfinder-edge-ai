import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, 
  Zap, 
  Brain, 
  Target, 
  Users, 
  CheckCircle,
  Timer,
  Award,
  ArrowRight,
  Cpu,
  Network,
  Shield
} from 'lucide-react';
import heroImage from '@/assets/hero-edge-cloud.jpg';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Deep personality and cognitive style assessment"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Technical Evaluation",
      description: "Edge computing knowledge and aptitude testing"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive readiness analysis across 6 dimensions"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Personalized Results",
      description: "Custom learning paths and career recommendations"
    }
  ];

  const roles = [
    { icon: <Cloud className="w-5 h-5" />, name: "Edge Cloud Architect" },
    { icon: <Network className="w-5 h-5" />, name: "Edge Network Engineer" },
    { icon: <Shield className="w-5 h-5" />, name: "Edge Security Architect" },
    { icon: <Zap className="w-5 h-5" />, name: "IoT Integration Specialist" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Cloud className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TechFit 360™</span>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Career Assessment Platform
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <Badge className="bg-accent/20 text-accent-foreground border-accent">
                Edge Cloud Architecture Assessment
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Should I Learn{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Edge Cloud Architecture?
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover your fit for the future of distributed computing. Our comprehensive 
                20-minute assessment evaluates your psychological, technical, and career alignment 
                for edge cloud architecture roles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/assessment')}
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-4 h-auto animate-pulse-glow"
              >
                <Timer className="w-5 h-5 mr-2" />
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4" />
                <span>20 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>1000+ completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>AI-powered insights</span>
              </div>
            </div>
          </div>

          <div className="relative animate-float">
            <img 
              src={heroImage} 
              alt="Edge Cloud Architecture Visualization" 
              className="w-full rounded-2xl shadow-card border border-border"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Features */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our scientifically-backed evaluation covers multiple dimensions to give you 
              the most accurate career fit analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Paths */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unlock These Career Paths</h2>
            <p className="text-muted-foreground">
              Edge cloud architecture opens doors to exciting, high-demand roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="p-2 bg-primary/20 rounded">
                  {role.icon}
                </div>
                <span className="font-medium">{role.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <Card className="max-w-2xl mx-auto shadow-card bg-gradient-to-r from-accent/20 to-primary/20 border-accent">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Potential?</h2>
              <p className="text-muted-foreground mb-6">
                Take the comprehensive assessment and get personalized insights about your 
                fit for edge cloud architecture careers.
              </p>
              <Button 
                onClick={() => navigate('/assessment')}
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                Begin Your Assessment Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
