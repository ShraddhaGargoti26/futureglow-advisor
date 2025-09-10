import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  Target,
  BookOpen,
  FileText,
  MessageSquare,
  Star,
  Award,
  BarChart3,
  Users,
  Clock,
  ExternalLink,
  Download,
  Play
} from "lucide-react";

interface UserData {
  name: string;
  skills: string[];
  interests: string[];
  experience: string;
}

interface DashboardProps {
  userData: UserData;
}

const careerPaths = [
  {
    title: "Data Scientist",
    match: 92,
    icon: "📊",
    description: "Analyze complex data to drive business decisions",
    demandLevel: "High",
    avgSalary: "$95,000",
    requiredSkills: ["Python", "SQL", "Data Analysis", "Machine Learning"],
    timeToRole: "6-12 months"
  },
  {
    title: "Frontend Developer",
    match: 88,
    icon: "💻",
    description: "Build user-facing web applications",
    demandLevel: "Very High",
    avgSalary: "$75,000",
    requiredSkills: ["JavaScript", "React", "Design"],
    timeToRole: "3-6 months"
  },
  {
    title: "Product Manager",
    match: 75,
    icon: "🎯",
    description: "Guide product development and strategy",
    demandLevel: "High",
    avgSalary: "$110,000",
    requiredSkills: ["Communication", "Leadership", "Project Management"],
    timeToRole: "12-18 months"
  }
];

const skillsData = [
  { name: "Python", current: 80, required: 90, category: "Technical" },
  { name: "SQL", current: 70, required: 85, category: "Technical" },
  { name: "Communication", current: 85, required: 80, category: "Soft" },
  { name: "Machine Learning", current: 40, required: 80, category: "Technical" },
  { name: "Data Analysis", current: 75, required: 85, category: "Technical" },
  { name: "Leadership", current: 60, required: 70, category: "Soft" }
];

const courses = [
  {
    title: "Advanced Machine Learning",
    provider: "TechEd",
    duration: "8 weeks",
    rating: 4.8,
    students: "15.2k",
    price: "Free",
    skillsGained: ["Machine Learning", "Deep Learning"],
    urgency: "High Priority"
  },
  {
    title: "SQL for Data Science",
    provider: "DataCamp",
    duration: "4 weeks",
    rating: 4.6,
    students: "23.1k",
    price: "$49",
    skillsGained: ["SQL", "Database Design"],
    urgency: "Medium Priority"
  },
  {
    title: "Leadership Fundamentals",
    provider: "LeadershipU",
    duration: "6 weeks",
    rating: 4.7,
    students: "8.9k",
    price: "$29",
    skillsGained: ["Leadership", "Team Management"],
    urgency: "Low Priority"
  }
];

export default function Dashboard({ userData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const overallProgress = Math.round(
    skillsData.reduce((acc, skill) => acc + (skill.current / skill.required) * 100, 0) / skillsData.length
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Career Advisor</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {userData.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="achievement" className="animate-bounce-gentle">
                <Award className="w-3 h-3 mr-1" />
                Profile 85% Complete
              </Badge>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Career Readiness</p>
                      <p className="text-2xl font-bold">{overallProgress}%</p>
                    </div>
                  </div>
                  <Progress value={overallProgress} className="mt-3" />
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Skills Mastered</p>
                      <p className="text-2xl font-bold">{userData.skills.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Courses to Take</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time to Goal</p>
                      <p className="text-2xl font-bold">6-12mo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Career Matches */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Your Top Career Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {careerPaths.map((career, index) => (
                    <div
                      key={career.title}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-card transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{career.icon}</div>
                        <div>
                          <h3 className="font-semibold">{career.title}</h3>
                          <p className="text-sm text-muted-foreground">{career.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="success" className="text-xs">
                              {career.demandLevel} Demand
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {career.avgSalary}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{career.match}%</div>
                        <p className="text-xs text-muted-foreground">Match</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant={skill.category === "Technical" ? "skill" : "secondary"} className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.current}% / {skill.required}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.required} className="h-2 bg-muted" />
                        <Progress 
                          value={skill.current} 
                          className="h-2 absolute top-0 left-0" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <div className="grid gap-6">
              {careerPaths.map((career) => (
                <Card key={career.title} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{career.icon}</span>
                        {career.title}
                      </CardTitle>
                      <Badge variant="skill" className="text-lg px-3 py-1">
                        {career.match}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{career.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium">Demand Level</p>
                        <Badge variant="success">{career.demandLevel}</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Average Salary</p>
                        <p className="font-semibold">{career.avgSalary}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time to Role</p>
                        <p className="font-semibold">{career.timeToRole}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Key Skills</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {career.requiredSkills.slice(0, 2).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="hero" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Jobs
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Get Roadmap
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={course.title} className="border rounded-lg p-4 hover:shadow-card transition-all">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{course.title}</h3>
                            <Badge 
                              variant={course.urgency === "High Priority" ? "destructive" : 
                                     course.urgency === "Medium Priority" ? "warning" : "secondary"}
                              className="text-xs"
                            >
                              {course.urgency}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {course.provider} • {course.duration} • ⭐ {course.rating} ({course.students} students)
                          </p>
                          <div className="flex gap-1">
                            {course.skillsGained.map(skill => (
                              <Badge key={skill} variant="skill" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-bold text-primary">{course.price}</p>
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Start Course
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    AI Resume Builder
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Generate a tailored resume for your target role using AI optimization.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Features:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ATS-optimized formatting</li>
                      <li>• Role-specific keyword optimization</li>
                      <li>• Multiple template options</li>
                    </ul>
                  </div>
                  <Button variant="hero" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Resume
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Mock Interview Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Practice with AI-powered interview questions tailored to your target role.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Practice Areas:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Technical skills assessment</li>
                      <li>• Behavioral questions</li>
                      <li>• Real-time feedback</li>
                    </ul>
                  </div>
                  <Button variant="gradient" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}