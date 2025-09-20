import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { VoiceInput } from "@/components/VoiceInput";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Image, Mic, MessageCircle } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Marketplace
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Transform your selling experience with AI-powered product descriptions, 
              voice-to-text listings, and intelligent buyer assistance.
            </p>
            <Button variant="hero" size="lg" className="shadow-ai">
              Get Started <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-glass border-glass backdrop-blur-sm">
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image to Description
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Input
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="space-y-6">
              <Card className="p-8 bg-glass border-glass backdrop-blur-sm shadow-glass">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">AI Product Description</h2>
                  <p className="text-muted-foreground">
                    Upload any product image and get an instant AI-generated description with pricing suggestions
                  </p>
                </div>
                <ImageUpload />
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="space-y-6">
              <Card className="p-8 bg-glass border-glass backdrop-blur-sm shadow-glass">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Voice to Product</h2>
                  <p className="text-muted-foreground">
                    Speak in any language to generate product titles and categories instantly
                  </p>
                </div>
                <VoiceInput />
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <Card className="p-8 bg-glass border-glass backdrop-blur-sm shadow-glass">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">AI Buyer Assistant</h2>
                  <p className="text-muted-foreground">
                    Help your customers with intelligent responses to their questions
                  </p>
                </div>
                <ChatBot />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;