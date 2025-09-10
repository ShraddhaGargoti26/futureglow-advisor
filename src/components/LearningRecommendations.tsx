import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  Star, 
  Clock, 
  Users, 
  Award, 
  ExternalLink,
  Filter,
  Search,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced Machine Learning",
    provider: "TechEd Pro",
    duration: "8 weeks",
    rating: 4.8,
    students: "15.2k",
    price: "Free",
    level: "Advanced",
    category: "Technical",
    skillsGained: ["Machine Learning", "Deep Learning", "Neural Networks"],
    urgency: "High Priority",
    description: "Master advanced ML algorithms and deep learning techniques with hands-on projects.",
    thumbnail: "🤖",
    progress: 0,
    enrolled: false
  },
  {
    id: 2,
    title: "SQL for Data Science",
    provider: "DataCamp",
    duration: "4 weeks",
    rating: 4.6,
    students: "23.1k",
    price: "$49",
    level: "Intermediate",
    category: "Technical",
    skillsGained: ["SQL", "Database Design", "Data Analysis"],
    urgency: "Medium Priority",
    description: "Learn advanced SQL techniques for data analysis and database management.",
    thumbnail: "🗄️",
    progress: 45,
    enrolled: true
  },
  {
    id: 3,
    title: "Leadership Fundamentals",
    provider: "LeadershipU",
    duration: "6 weeks",
    rating: 4.7,
    students: "8.9k",
    price: "$29",
    level: "Beginner",
    category: "Soft Skills",
    skillsGained: ["Leadership", "Team Management", "Communication"],
    urgency: "Low Priority",
    description: "Develop essential leadership skills for career advancement.",
    thumbnail: "👥",
    progress: 0,
    enrolled: false
  },
  {
    id: 4,
    title: "React.js Complete Guide",
    provider: "CodeAcademy",
    duration: "10 weeks",
    rating: 4.9,
    students: "45.7k",
    price: "$79",
    level: "Intermediate",
    category: "Technical",
    skillsGained: ["React", "JavaScript", "Frontend Development"],
    urgency: "High Priority",
    description: "Build modern web applications with React.js and advanced patterns.",
    thumbnail: "⚛️",
    progress: 0,
    enrolled: false
  },
  {
    id: 5,
    title: "Data Visualization Mastery",
    provider: "VisualData",
    duration: "5 weeks",
    rating: 4.5,
    students: "12.3k",
    price: "Free",
    level: "Intermediate",
    category: "Technical",
    skillsGained: ["Data Visualization", "Tableau", "Python"],
    urgency: "Medium Priority",
    description: "Create compelling data visualizations using modern tools and techniques.",
    thumbnail: "📊",
    progress: 20,
    enrolled: true
  },
  {
    id: 6,
    title: "Project Management Essentials",
    provider: "PMI Online",
    duration: "7 weeks",
    rating: 4.4,
    students: "19.6k",
    price: "$99",
    level: "Beginner",
    category: "Soft Skills",
    skillsGained: ["Project Management", "Agile", "Scrum"],
    urgency: "Low Priority",
    description: "Learn project management fundamentals and agile methodologies.",
    thumbnail: "📋",
    progress: 0,
    enrolled: false
  }
];

const achievements = [
  { name: "Fast Learner", icon: "⚡", description: "Complete 3 courses in one month", unlocked: true },
  { name: "Skill Builder", icon: "🔧", description: "Gain 5 new technical skills", unlocked: true },
  { name: "Community Member", icon: "🤝", description: "Join 3 learning communities", unlocked: false },
  { name: "Project Master", icon: "🏆", description: "Complete 10 hands-on projects", unlocked: false },
  { name: "Mentor", icon: "🎓", description: "Help 5 other learners", unlocked: false },
  { name: "Career Ready", icon: "🚀", description: "Complete career preparation track", unlocked: false }
];

export default function LearningRecommendations() {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === "All" || course.level === selectedLevel;
    const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const enrolledCourses = courses.filter(course => course.enrolled);
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  const overallProgress = enrolledCourses.length > 0 ? 
    Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length) : 0;

  return (
    <div className="space-y-6">
      {/* Learning Progress Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{overallProgress}%</div>
              <p className="text-muted-foreground text-sm">Overall Progress</p>
              <Progress value={overallProgress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{enrolledCourses.length}</div>
              <p className="text-muted-foreground text-sm">Courses Enrolled</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">{completedCourses.length}</div>
              <p className="text-muted-foreground text-sm">Courses Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{achievements.filter(a => a.unlocked).length}</div>
              <p className="text-muted-foreground text-sm">Achievements Unlocked</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Filters */}
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <div className="flex gap-2">
                  {["All", "Beginner", "Intermediate", "Advanced"].map(level => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["All", "Technical", "Soft Skills"].map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="shadow-card hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <Badge 
                              variant={course.urgency === "High Priority" ? "destructive" : 
                                     course.urgency === "Medium Priority" ? "warning" : "secondary"}
                              className="text-xs"
                            >
                              {course.urgency}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{course.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-primary">{course.price}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.students} students
                        </div>
                        <Badge variant={course.level === "Beginner" ? "secondary" : 
                                      course.level === "Intermediate" ? "warning" : "skill"}>
                          {course.level}
                        </Badge>
                      </div>

                      <div className="flex gap-1">
                        {course.skillsGained.map(skill => (
                          <Badge key={skill} variant="skill" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {course.enrolled ? (
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                        ) : (
                          <Button variant="hero" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Enroll Now
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <Badge variant={course.progress === 100 ? "success" : "warning"}>
                          {course.progress === 100 ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}% Complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="hero" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                        {course.progress > 0 && (
                          <Button variant="outline" size="sm">
                            <Award className="w-4 h-4 mr-2" />
                            View Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 border rounded-lg ${
                      achievement.unlocked ? "bg-success/10 border-success/20" : "bg-muted/30"
                    }`}
                  >
                    <div className={`text-3xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.unlocked && (
                        <Badge variant="success" className="text-xs mt-1">
                          <Zap className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}