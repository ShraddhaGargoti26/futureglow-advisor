import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/components/Dashboard";
import CareerSimulator from "@/components/CareerSimulator";
import LearningRecommendations from "@/components/LearningRecommendations";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  const [userData, setUserData] = useState(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "simulator" | "learning">("dashboard");

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setIsOnboardingComplete(true);
  };

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentView === "simulator") {
    return <CareerSimulator onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <>
      <Dashboard 
        userData={userData} 
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      <ChatAssistant />
    </>
  );
};

export default Index;
