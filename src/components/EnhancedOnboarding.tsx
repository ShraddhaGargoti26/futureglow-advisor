import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Plus, X, GraduationCap, Briefcase } from "lucide-react";

interface UserData {
  name: string;
  mode: 'education' | 'career';
  level: string;
  skills: string[];
  interests: string[];
  learningStyle?: string;
  experience?: string;
}

interface EnhancedOnboardingProps {
  mode: 'education' | 'career';
  onComplete: (data: UserData) => void;
}

const EnhancedOnboarding = ({ mode, onComplete }: EnhancedOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>({
    name: "",
    mode,
    level: "",
    skills: [],
    interests: [],
    learningStyle: "",
    experience: ""
  });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const educationLevels = [
    "After 10th Grade",
    "After 12th Grade", 
    "During Undergraduate",
    "After Undergraduate",
    "During Postgraduate",
    "After Postgraduate"
  ];

  const careerLevels = [
    "Student (No Experience)",
    "Fresh Graduate",
    "0-2 Years Experience",
    "2-5 Years Experience", 
    "5+ Years Experience"
  ];

  const commonSkills = [
    "Programming", "Data Analysis", "Communication", "Leadership",
    "Project Management", "Design", "Marketing", "Sales",
    "Mathematics", "Writing", "Research", "Problem Solving"
  ];

  const commonInterests = [
    "Technology", "Healthcare", "Finance", "Education", "Arts",
    "Sports", "Environment", "Business", "Science", "Social Work"
  ];

  const learningStyles = [
    "Visual Learner", "Hands-on Learning", "Self-paced Study",
    "Group Learning", "Structured Courses", "Project-based Learning"
  ];

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.level.length > 0;
      case 3: return formData.skills.length > 0;
      case 4: return formData.interests.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {mode === 'education' ? (
              <GraduationCap className="w-8 h-8 text-primary" />
            ) : (
              <Briefcase className="w-8 h-8 text-secondary" />
            )}
            <h1 className="text-3xl font-bold">
              {mode === 'education' ? 'Education' : 'Career'} Guidance Setup
            </h1>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Let's get to know you"}
              {step === 2 && "What's your current level?"}
              {step === 3 && "What are your current skills?"}
              {step === 4 && "What interests you?"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Select your current level</Label>
                  <div className="grid gap-3 mt-2">
                    {(mode === 'education' ? educationLevels : careerLevels).map((level) => (
                      <Button
                        key={level}
                        variant={formData.level === level ? "default" : "outline"}
                        className="justify-start h-auto p-4"
                        onClick={() => setFormData(prev => ({ ...prev, level }))}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Current Skills</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {commonSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (formData.skills.includes(skill)) {
                            removeSkill(skill);
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              skills: [...prev.skills, skill]
                            }));
                          }
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {formData.skills.length > 0 && (
                    <div className="mt-4">
                      <Label>Selected Skills:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill) => (
                          <Badge key={skill} className="gap-1">
                            {skill}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label>Interests & Preferences</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add an interest"
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button onClick={addInterest} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {commonInterests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (formData.interests.includes(interest)) {
                            removeInterest(interest);
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              interests: [...prev.interests, interest]
                            }));
                          }
                        }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {formData.interests.length > 0 && (
                    <div className="mt-4">
                      <Label>Selected Interests:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.interests.map((interest) => (
                          <Badge key={interest} className="gap-1">
                            {interest}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeInterest(interest)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Learning Style (Optional)</Label>
                  <div className="grid gap-2 mt-2">
                    {learningStyles.map((style) => (
                      <Button
                        key={style}
                        variant={formData.learningStyle === style ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setFormData(prev => ({ 
                          ...prev, 
                          learningStyle: prev.learningStyle === style ? "" : style 
                        }))}
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {step === totalSteps ? (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Complete Setup
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedOnboarding;