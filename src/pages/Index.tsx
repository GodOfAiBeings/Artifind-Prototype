import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { VoiceInput } from "@/components/VoiceInput";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Image, Mic, MessageCircle, Zap, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Commerce Suite</h1>
                <p className="text-sm text-muted-foreground">Professional marketplace automation</p>
              </div>
            </div>
            <Button variant="hero" className="px-6">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Intelligent Commerce
              <span className="block text-transparent bg-gradient-primary bg-clip-text">
                Automation Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Streamline your marketplace operations with AI-powered product analysis, 
              multilingual voice recognition, and intelligent customer support automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" className="px-8">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">10x</div>
              <div className="text-sm text-muted-foreground">Faster product listings</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Languages supported</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Response accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Commerce Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade AI tools designed to scale your marketplace operations efficiently.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
                <TabsTrigger value="image" className="flex items-center gap-2 py-3">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Image Analysis</span>
                  <span className="sm:hidden">Image</span>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2 py-3">
                  <Mic className="h-4 w-4" />
                  <span className="hidden sm:inline">Voice Processing</span>
                  <span className="sm:hidden">Voice</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2 py-3">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Assistant</span>
                  <span className="sm:hidden">Chat</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="space-y-6">
                <Card className="overflow-hidden shadow-elevated border-0">
                  <div className="p-8 bg-gradient-accent">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Intelligent Product Analysis
                      </h3>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Upload any product image to receive professional descriptions, 
                        competitive pricing analysis, and category recommendations.
                      </p>
                    </div>
                    <ImageUpload />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="voice" className="space-y-6">
                <Card className="overflow-hidden shadow-elevated border-0">
                  <div className="p-8 bg-gradient-accent">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Multilingual Voice Recognition
                      </h3>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Speak naturally in any language to generate optimized product titles, 
                        descriptions, and category classifications instantly.
                      </p>
                    </div>
                    <VoiceInput />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-6">
                <Card className="overflow-hidden shadow-elevated border-0">
                  <div className="p-8 bg-gradient-accent">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Intelligent Customer Support
                      </h3>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Provide instant, accurate responses to customer inquiries with 
                        our advanced AI assistant trained on commerce best practices.
                      </p>
                    </div>
                    <ChatBot />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">AI Commerce Suite</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional marketplace automation for modern businesses
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;