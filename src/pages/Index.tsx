import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import EnhancedOnboarding from "@/components/EnhancedOnboarding";
import Dashboard from "@/components/Dashboard";
import CareerSimulator from "@/components/CareerSimulator";
import LearningRecommendations from "@/components/LearningRecommendations";
import RoadmapGenerator from "@/components/RoadmapGenerator";
import ChatAssistant from "@/components/ChatAssistant";

type UserData = {
  name: string;
  mode: 'education' | 'career';
  level: string;
  skills: string[];
  interests: string[];
  learningStyle?: string;
  experience?: string;
};

type View = "landing" | "onboarding" | "dashboard" | "simulator" | "learning" | "roadmap";

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<View>("landing");
  const [selectedMode, setSelectedMode] = useState<'education' | 'career' | null>(null);

  const handleModeSelect = (mode: 'education' | 'career') => {
    setSelectedMode(mode);
    setCurrentView("onboarding");
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setCurrentView("dashboard");
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  if (currentView === "landing") {
    return <LandingPage onModeSelect={handleModeSelect} />;
  }

  if (currentView === "onboarding") {
    return (
      <EnhancedOnboarding 
        mode={selectedMode!} 
        onComplete={handleOnboardingComplete} 
      />
    );
  }

  if (currentView === "simulator") {
    return <CareerSimulator onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "roadmap") {
    return (
      <RoadmapGenerator 
        userData={userData!} 
        onBack={() => setCurrentView("dashboard")} 
      />
    );
  }

  return (
    <>
      <Dashboard 
        userData={userData!} 
        onNavigate={handleViewChange}
        currentView={currentView}
      />
      <ChatAssistant />
    </>
  );
};

export default Index;
