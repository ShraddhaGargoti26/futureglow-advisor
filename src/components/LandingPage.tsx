import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, BookOpen, Target } from "lucide-react";

interface LandingPageProps {
  onModeSelect: (mode: 'education' | 'career') => void;
}

const LandingPage = ({ onModeSelect }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            AI Education & Career Advisor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Get personalized guidance for your education path and career journey with AI-powered roadmaps and recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50" 
                onClick={() => onModeSelect('education')}>
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Education Guidance</CardTitle>
              <CardDescription className="text-base">
                Find the perfect academic path for your future
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm">Course & Stream Selection</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm">Entrance Exam Guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-sm">Scholarship Opportunities</span>
              </div>
              <Button className="w-full mt-6 group-hover:bg-primary/90">
                Start Education Journey
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50" 
                onClick={() => onModeSelect('career')}>
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4 group-hover:bg-secondary/20 transition-colors">
                <Briefcase className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Career Guidance</CardTitle>
              <CardDescription className="text-base">
                Build your professional roadmap to success
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-secondary" />
                <span className="text-sm">Skill Gap Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-secondary" />
                <span className="text-sm">Career Path Recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-secondary" />
                <span className="text-sm">Learning Roadmaps</span>
              </div>
              <Button variant="secondary" className="w-full mt-6 group-hover:bg-secondary/90">
                Start Career Journey
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Join thousands of students and professionals who have found their perfect path
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;