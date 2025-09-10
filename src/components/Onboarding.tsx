import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Brain, Target, Zap } from "lucide-react";

interface OnboardingProps {
  onComplete: (userData: any) => void;
}

const skills = [
  "Python", "JavaScript", "SQL", "React", "Data Analysis", "Machine Learning",
  "Communication", "Leadership", "Project Management", "Design", "Marketing", "Sales"
];

const interests = [
  "Technology", "Healthcare", "Finance", "Education", "Gaming", "E-commerce",
  "Sustainability", "AI/ML", "Cybersecurity", "Data Science", "Design", "Marketing"
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experience, setExperience] = useState("");

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = () => {
    const userData = {
      name: "Alex",
      skills: selectedSkills,
      interests: selectedInterests,
      experience,
      completedAt: new Date()
    };
    onComplete(userData);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-white mb-4">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">AI Career Advisor</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Let's discover your perfect career path</h1>
          <p className="text-muted-foreground">This quick assessment will help us personalize your experience</p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">Step {step} of 4</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && (
                <>
                  <Target className="w-5 h-5 text-primary" />
                  What are your current skills?
                </>
              )}
              {step === 2 && (
                <>
                  <Zap className="w-5 h-5 text-accent" />
                  What interests you most?
                </>
              )}
              {step === 3 && (
                <>
                  <Brain className="w-5 h-5 text-success" />
                  What's your experience level?
                </>
              )}
              {step === 4 && (
                <>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  Ready to explore your future?
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div>
                <p className="text-muted-foreground mb-4">Select all skills you currently have (choose at least 3)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "skill" : "outline"}
                      className="cursor-pointer p-3 justify-center hover:scale-105 transition-all"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-muted-foreground mb-4">What industries or areas spark your curiosity?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "achievement" : "outline"}
                      className="cursor-pointer p-3 justify-center hover:scale-105 transition-all"
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-muted-foreground mb-4">How would you describe your professional experience?</p>
                <div className="grid gap-3">
                  {[
                    { id: "student", label: "Student - Still learning the basics", icon: "🎓" },
                    { id: "entry", label: "Entry Level - 0-2 years experience", icon: "🌱" },
                    { id: "mid", label: "Mid Level - 2-5 years experience", icon: "🚀" },
                    { id: "senior", label: "Senior Level - 5+ years experience", icon: "⭐" }
                  ].map(({ id, label, icon }) => (
                    <Card
                      key={id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-card ${
                        experience === id ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setExperience(id)}
                    >
                      <CardContent className="flex items-center gap-3 p-4">
                        <span className="text-2xl">{icon}</span>
                        <span className="font-medium">{label}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Profile is Ready!</h3>
                  <p className="text-muted-foreground">
                    We've analyzed your skills and interests. Time to discover personalized career recommendations!
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Skills Selected:</span>
                    <span className="font-semibold">{selectedSkills.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interests:</span>
                    <span className="font-semibold">{selectedInterests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience Level:</span>
                    <span className="font-semibold capitalize">{experience}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  variant="hero"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && selectedSkills.length < 3) ||
                    (step === 2 && selectedInterests.length === 0) ||
                    (step === 3 && !experience)
                  }
                  className="ml-auto"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleComplete}
                  className="ml-auto"
                >
                  Start My Journey
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}