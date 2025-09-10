import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Target, BookOpen, Briefcase, TrendingUp } from "lucide-react";

interface CareerSimulatorProps {
  onBack: () => void;
}

const careerRoadmaps = {
  "Data Scientist": {
    icon: "📊",
    description: "Analyze complex data to drive business decisions",
    totalDuration: "12-18 months",
    years: [
      {
        year: "Year 1 (Months 1-6)",
        title: "Foundation Building",
        milestones: [
          { title: "Master Python Programming", completed: true, skills: ["Python", "Data Structures"] },
          { title: "Learn SQL & Database Fundamentals", completed: true, skills: ["SQL", "Database Design"] },
          { title: "Statistics & Mathematics Review", completed: false, skills: ["Statistics", "Linear Algebra"] },
          { title: "Data Visualization with Matplotlib/Plotly", completed: false, skills: ["Data Visualization"] }
        ]
      },
      {
        year: "Year 1 (Months 7-12)",
        title: "Core Skills Development",
        milestones: [
          { title: "Machine Learning Fundamentals", completed: false, skills: ["Machine Learning", "Scikit-learn"] },
          { title: "Build 3 Data Analysis Projects", completed: false, skills: ["Project Management", "Portfolio"] },
          { title: "Learn Pandas & NumPy", completed: false, skills: ["Data Manipulation"] },
          { title: "First Internship or Freelance Project", completed: false, skills: ["Professional Experience"] }
        ]
      },
      {
        year: "Year 2",
        title: "Advanced Specialization",
        milestones: [
          { title: "Deep Learning & Neural Networks", completed: false, skills: ["Deep Learning", "TensorFlow"] },
          { title: "Big Data Technologies (Spark, Hadoop)", completed: false, skills: ["Big Data"] },
          { title: "Advanced Analytics Projects", completed: false, skills: ["Advanced Analytics"] },
          { title: "Apply for Data Scientist Roles", completed: false, skills: ["Job Search"] }
        ]
      }
    ]
  },
  "Frontend Developer": {
    icon: "💻",
    description: "Build user-facing web applications",
    totalDuration: "6-12 months",
    years: [
      {
        year: "Months 1-3",
        title: "Web Fundamentals",
        milestones: [
          { title: "HTML, CSS & JavaScript Mastery", completed: true, skills: ["HTML", "CSS", "JavaScript"] },
          { title: "Responsive Design Principles", completed: true, skills: ["CSS Grid", "Flexbox"] },
          { title: "Version Control with Git", completed: false, skills: ["Git", "GitHub"] },
          { title: "Build 3 Static Websites", completed: false, skills: ["Portfolio"] }
        ]
      },
      {
        year: "Months 4-8",
        title: "Framework Specialization",
        milestones: [
          { title: "React.js Fundamentals & Hooks", completed: false, skills: ["React", "State Management"] },
          { title: "State Management (Redux/Context)", completed: false, skills: ["Redux"] },
          { title: "API Integration & Async Programming", completed: false, skills: ["APIs", "Fetch"] },
          { title: "Build 2 React Applications", completed: false, skills: ["React Projects"] }
        ]
      },
      {
        year: "Months 9-12",
        title: "Professional Readiness",
        milestones: [
          { title: "Testing (Jest, React Testing Library)", completed: false, skills: ["Testing"] },
          { title: "Performance Optimization", completed: false, skills: ["Optimization"] },
          { title: "Deployment & CI/CD", completed: false, skills: ["DevOps"] },
          { title: "Apply for Frontend Developer Roles", completed: false, skills: ["Job Search"] }
        ]
      }
    ]
  },
  "Product Manager": {
    icon: "🎯",
    description: "Guide product development and strategy",
    totalDuration: "12-18 months",
    years: [
      {
        year: "Months 1-6",
        title: "Product Fundamentals",
        milestones: [
          { title: "Product Management Certification", completed: false, skills: ["Product Strategy"] },
          { title: "User Research & Analytics", completed: false, skills: ["User Research", "Analytics"] },
          { title: "Agile & Scrum Methodology", completed: false, skills: ["Agile", "Scrum"] },
          { title: "First Product Feature Launch", completed: false, skills: ["Product Launch"] }
        ]
      },
      {
        year: "Months 7-12",
        title: "Strategic Development",
        milestones: [
          { title: "Market Research & Competitive Analysis", completed: false, skills: ["Market Research"] },
          { title: "Product Roadmap Creation", completed: false, skills: ["Roadmapping"] },
          { title: "Cross-functional Team Leadership", completed: false, skills: ["Leadership"] },
          { title: "Data-Driven Decision Making", completed: false, skills: ["Data Analysis"] }
        ]
      },
      {
        year: "Year 2",
        title: "Senior PM Skills",
        milestones: [
          { title: "Business Strategy & P&L Management", completed: false, skills: ["Business Strategy"] },
          { title: "Stakeholder Management", completed: false, skills: ["Communication"] },
          { title: "Product Portfolio Management", completed: false, skills: ["Portfolio Management"] },
          { title: "Apply for Product Manager Roles", completed: false, skills: ["Job Search"] }
        ]
      }
    ]
  }
};

export default function CareerSimulator({ onBack }: CareerSimulatorProps) {
  const [selectedCareer, setSelectedCareer] = useState<keyof typeof careerRoadmaps>("Data Scientist");
  
  const roadmap = careerRoadmaps[selectedCareer];
  const totalMilestones = roadmap.years.reduce((acc, year) => acc + year.milestones.length, 0);
  const completedMilestones = roadmap.years.reduce((acc, year) => 
    acc + year.milestones.filter(m => m.completed).length, 0
  );
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-2xl">{roadmap.icon}</div>
              <div>
                <h1 className="text-2xl font-bold">Career Path Simulator</h1>
                <p className="text-muted-foreground">{roadmap.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Career Selection */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Select Your Target Career
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(careerRoadmaps).map(([career, data]) => (
                <Card
                  key={career}
                  className={`cursor-pointer transition-all hover:shadow-card ${
                    selectedCareer === career ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedCareer(career as keyof typeof careerRoadmaps)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{data.icon}</div>
                    <h3 className="font-semibold">{career}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{data.totalDuration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Progress to {selectedCareer}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
                <p className="text-muted-foreground">Overall Progress</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">{completedMilestones}</div>
                <p className="text-muted-foreground">Milestones Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">{totalMilestones - completedMilestones}</div>
                <p className="text-muted-foreground">Remaining</p>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </CardContent>
        </Card>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          {roadmap.years.map((year, yearIndex) => (
            <Card key={year.year} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {year.year}: {year.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {year.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 border rounded-lg ${
                        milestone.completed ? "bg-success/10 border-success/20" : "bg-background"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        milestone.completed ? "bg-success text-white" : "bg-muted"
                      }`}>
                        {milestone.completed ? "✓" : yearIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <div className="flex gap-1 mt-2">
                          {milestone.skills.map(skill => (
                            <Badge key={skill} variant="skill" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant={milestone.completed ? "secondary" : "outline"} 
                        size="sm"
                        disabled={milestone.completed}
                      >
                        {milestone.completed ? "Completed" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Complete Statistics & Mathematics Review</h4>
                  <p className="text-sm text-muted-foreground">Essential foundation for machine learning concepts</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Start Data Visualization Project</h4>
                  <p className="text-sm text-muted-foreground">Build portfolio with real datasets</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Join Data Science Community</h4>
                  <p className="text-sm text-muted-foreground">Network with professionals and find mentors</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}