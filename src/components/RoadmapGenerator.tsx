import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, Calendar, Clock, Target, BookOpen, Code, 
  Users, FileText, Download, Share, CheckCircle, 
  AlertCircle, PlayCircle, Trophy, MapPin
} from "lucide-react";

interface UserData {
  name: string;
  mode: 'education' | 'career';
  level: string;
  skills: string[];
  interests: string[];
  learningStyle?: string;
  experience?: string;
}

interface RoadmapGeneratorProps {
  userData: UserData;
  onBack: () => void;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  duration: string;
  objectives: string[];
  courses: string[];
  projects: string[];
  skills: string[];
  exams?: string[];
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const RoadmapGenerator = ({ userData, onBack }: RoadmapGeneratorProps) => {
  const [activeView, setActiveView] = useState<'timeline' | 'kanban' | 'calendar'>('timeline');
  const [selectedRoadmap, setSelectedRoadmap] = useState(0);

  // Generate roadmaps based on user mode and data
  const generateRoadmaps = () => {
    if (userData.mode === 'education') {
      return generateEducationRoadmaps();
    } else {
      return generateCareerRoadmaps();
    }
  };

  const generateEducationRoadmaps = (): Milestone[][] => {
    if (userData.level === "After 10th Grade") {
      return [
        [ // Science Stream Path
          {
            id: "e1",
            title: "Choose Science Stream",
            description: "Select Physics, Chemistry, Math/Biology",
            duration: "Month 1-2",
            objectives: ["Research career options", "Choose subjects", "Enroll in coaching"],
            courses: ["Foundation Physics", "Chemistry Basics", "Mathematics"],
            projects: ["Science fair project", "Lab experiments"],
            skills: ["Scientific thinking", "Problem solving"],
            exams: ["Board exams preparation"],
            completed: false,
            priority: 'high'
          },
          {
            id: "e2", 
            title: "Prepare for Entrance Exams",
            description: "Focus on JEE/NEET preparation",
            duration: "Month 6-18",
            objectives: ["Master core concepts", "Practice mock tests", "Time management"],
            courses: ["JEE Main prep", "Advanced Math", "Physics mastery"],
            projects: ["Research papers", "Science models"],
            skills: ["Analytical thinking", "Time management"],
            exams: ["JEE Main", "JEE Advanced", "NEET"],
            completed: false,
            priority: 'high'
          },
          {
            id: "e3",
            title: "College Selection & Admission",
            description: "Apply to top engineering/medical colleges",
            duration: "Month 18-24",
            objectives: ["Research colleges", "Apply for admissions", "Prepare for counseling"],
            courses: ["College prep courses", "English communication"],
            projects: ["College comparison analysis"],
            skills: ["Research", "Decision making"],
            exams: ["College entrance tests"],
            completed: false,
            priority: 'medium'
          }
        ]
      ];
    } else if (userData.level === "After 12th Grade") {
      return [
        [ // Engineering Path
          {
            id: "e4",
            title: "B.Tech Computer Science",
            description: "4-year engineering degree program",
            duration: "Year 1-4",
            objectives: ["Master programming", "Build projects", "Internships"],
            courses: ["Data Structures", "Algorithms", "Database Systems"],
            projects: ["Web applications", "Mobile apps", "AI projects"],
            skills: ["Programming", "System design", "Teamwork"],
            completed: false,
            priority: 'high'
          },
          {
            id: "e5",
            title: "Specialization & Internships",
            description: "Choose specialization and gain experience",
            duration: "Year 3-4",
            objectives: ["Pick specialization", "Complete internships", "Build portfolio"],
            courses: ["Machine Learning", "Web Development", "Cybersecurity"],
            projects: ["Capstone project", "Industry projects"],
            skills: ["Specialized skills", "Professional communication"],
            completed: false,
            priority: 'high'
          }
        ]
      ];
    }
    return [[]];
  };

  const generateCareerRoadmaps = (): Milestone[][] => {
    if (userData.skills.includes("Programming") || userData.interests.includes("Technology")) {
      return [
        [ // Data Science Path
          {
            id: "c1",
            title: "Foundation Skills",
            description: "Build strong programming and math foundation",
            duration: "Month 1-3",
            objectives: ["Master Python basics", "Learn SQL", "Statistics fundamentals"],
            courses: ["Python for Data Science", "SQL Bootcamp", "Statistics 101"],
            projects: ["Data cleaning project", "Basic analysis"],
            skills: ["Python", "SQL", "Statistics"],
            completed: false,
            priority: 'high'
          },
          {
            id: "c2",
            title: "Data Analysis & Visualization",
            description: "Learn to analyze and visualize data",
            duration: "Month 4-6",
            objectives: ["Master pandas/numpy", "Create visualizations", "Build dashboard"],
            courses: ["Data Analysis with Python", "Tableau/PowerBI", "Excel Advanced"],
            projects: ["Sales analysis dashboard", "Market research project"],
            skills: ["Data visualization", "Pandas", "Tableau"],
            completed: false,
            priority: 'high'
          },
          {
            id: "c3",
            title: "Machine Learning",
            description: "Implement ML algorithms and models",
            duration: "Month 7-12",
            objectives: ["Learn ML algorithms", "Build ML models", "Deploy models"],
            courses: ["Machine Learning Course", "Deep Learning", "MLOps"],
            projects: ["Prediction model", "Recommendation system", "Computer vision app"],
            skills: ["Machine Learning", "Deep Learning", "Model deployment"],
            completed: false,
            priority: 'medium'
          }
        ],
        [ // Frontend Developer Path
          {
            id: "c4",
            title: "Web Fundamentals",
            description: "Master HTML, CSS, and JavaScript basics",
            duration: "Month 1-2",
            objectives: ["HTML/CSS mastery", "JavaScript fundamentals", "Responsive design"],
            courses: ["Web Development Bootcamp", "JavaScript Complete Guide"],
            projects: ["Personal portfolio", "Responsive landing page"],
            skills: ["HTML", "CSS", "JavaScript"],
            completed: false,
            priority: 'high'
          },
          {
            id: "c5",
            title: "Modern Frontend",
            description: "Learn React and modern development tools",
            duration: "Month 3-6",
            objectives: ["Master React", "State management", "API integration"],
            courses: ["React Complete Course", "Redux Toolkit", "REST APIs"],
            projects: ["Todo app", "E-commerce site", "Social media app"],
            skills: ["React", "Redux", "API integration"],
            completed: false,
            priority: 'high'
          }
        ]
      ];
    }
    return [[]];
  };

  const roadmaps = generateRoadmaps();
  const currentRoadmap = roadmaps[selectedRoadmap] || [];

  const toggleMilestoneComplete = (milestoneId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggling completion for milestone: ${milestoneId}`);
  };

  const completedCount = currentRoadmap.filter(m => m.completed).length;
  const progressPercentage = currentRoadmap.length > 0 ? (completedCount / currentRoadmap.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                {userData.mode === 'education' ? 'Education' : 'Career'} Roadmap
              </h1>
              <p className="text-muted-foreground">
                Personalized pathway for {userData.name}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <div className="flex items-center gap-3">
                  <Progress value={progressPercentage} className="flex-1" />
                  <span className="text-xl font-bold">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Milestones Completed</p>
                <p className="text-2xl font-bold">{completedCount}/{currentRoadmap.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Estimated Timeline</p>
                <p className="text-2xl font-bold">6-12mo</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Next Milestone</p>
                <p className="text-lg font-semibold text-primary">
                  {currentRoadmap.find(m => !m.completed)?.title || "All Complete!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="space-y-6">
          <TabsList>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {currentRoadmap.map((milestone, index) => (
                  <div key={milestone.id} className="relative flex gap-6">
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                      milestone.completed 
                        ? 'bg-success border-success text-white' 
                        : 'bg-background border-primary text-primary'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold">{index + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <Card className="flex-1 shadow-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="flex items-center gap-2">
                              {milestone.title}
                              <Badge variant={milestone.priority === 'high' ? 'destructive' : milestone.priority === 'medium' ? 'warning' : 'secondary'}>
                                {milestone.priority} priority
                              </Badge>
                            </CardTitle>
                            <p className="text-muted-foreground">{milestone.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {milestone.duration}
                              </div>
                            </div>
                          </div>
                          <Checkbox
                            checked={milestone.completed}
                            onCheckedChange={() => toggleMilestoneComplete(milestone.id)}
                            className="scale-125"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Objectives
                            </h4>
                            <ul className="space-y-1 text-sm">
                              {milestone.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Recommended Courses
                            </h4>
                            <div className="space-y-1">
                              {milestone.courses.map((course, i) => (
                                <Badge key={i} variant="outline" className="mr-1 mb-1">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Code className="w-4 h-4" />
                              Projects
                            </h4>
                            <ul className="space-y-1 text-sm">
                              {milestone.projects.map((project, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-secondary">•</span>
                                  {project}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Trophy className="w-4 h-4" />
                              Skills to Gain
                            </h4>
                            <div className="space-y-1">
                              {milestone.skills.map((skill, i) => (
                                <Badge key={i} variant="skill" className="mr-1 mb-1">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {milestone.exams && milestone.exams.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Important Exams
                            </h4>
                            <div className="space-y-1">
                              {milestone.exams.map((exam, i) => (
                                <Badge key={i} variant="achievement" className="mr-1 mb-1">
                                  {exam}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4">
                          <Button variant="hero" size="sm">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Start Learning
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="kanban">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  To Do
                </h3>
                <div className="space-y-3">
                  {currentRoadmap.filter(m => !m.completed).map(milestone => (
                    <Card key={milestone.id} className="p-4">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.duration}</p>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  In Progress
                </h3>
                <div className="space-y-3">
                  {/* Mock in-progress items */}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Completed
                </h3>
                <div className="space-y-3">
                  {currentRoadmap.filter(m => m.completed).map(milestone => (
                    <Card key={milestone.id} className="p-4 opacity-75">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.duration}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="p-8 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Calendar Integration</h3>
              <p className="text-muted-foreground mb-4">
                Sync your roadmap milestones with your calendar for better time management
              </p>
              <Button variant="hero">
                <Calendar className="w-4 h-4 mr-2" />
                Connect Calendar
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoadmapGenerator;