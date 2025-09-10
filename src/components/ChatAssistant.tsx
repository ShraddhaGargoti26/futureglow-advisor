import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, X, Bot, User, Sparkles, Lightbulb, Target } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const sampleQuestions = [
  "What career fits my Python + SQL skills?",
  "What should I learn next?",
  "How do I prepare for data science interviews?",
  "What are the best ML projects for beginners?"
];

const mockResponses: Record<string, string> = {
  "what career fits my python + sql skills": "Based on your Python and SQL skills, you're well-positioned for roles like Data Analyst, Data Scientist, or Backend Developer. Data Analyst roles are most accessible now, while Data Scientist positions would benefit from additional ML knowledge. Would you like specific job recommendations?",
  "what should i learn next": "I recommend focusing on Data Visualization next! Since you have Python + SQL, adding Matplotlib/Plotly skills will make you more attractive to employers. After that, consider Machine Learning fundamentals with scikit-learn.",
  "how do i prepare for data science interviews": "Great question! Focus on these areas: 1) SQL practice (joins, window functions), 2) Python coding problems, 3) Statistics concepts, 4) ML fundamentals, 5) Portfolio projects. I can help you create a study plan!",
  "what are the best ml projects for beginners": "Here are 3 beginner-friendly ML projects: 1) House price prediction (regression), 2) Customer churn analysis (classification), 3) Movie recommendation system (collaborative filtering). Each teaches core concepts while building your portfolio!"
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI Career Assistant. I'm here to help you navigate your career journey. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const normalizedInput = text.toLowerCase().trim();
      const response = mockResponses[normalizedInput] || 
        `That's a great question about "${text}". While I'm a demo version, in a full implementation I'd provide personalized career advice based on your profile, current market trends, and industry insights. Try asking one of the suggested questions below!`;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-glow bg-gradient-primary hover:scale-110 transition-all"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-glow flex flex-col">
        <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="w-5 h-5" />
              AI Career Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Online & Ready to Help
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sample Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t bg-secondary/30">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Try asking me:
              </p>
              <div className="space-y-2">
                {sampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2 text-xs hover:bg-primary/10"
                    onClick={() => handleQuestionClick(question)}
                  >
                    <Target className="w-3 h-3 mr-2 flex-shrink-0" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about your career..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputText);
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage(inputText)}
                size="sm"
                className="px-3"
                disabled={!inputText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-1 mt-2">
              <Badge variant="outline" className="text-xs">
                <Lightbulb className="w-3 h-3 mr-1" />
                Demo Mode
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}