import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Loader2, Volume2, FileText, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceResult {
  transcript: string;
  title: string;
  category: string;
  language: string;
}

export const VoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<VoiceResult | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        processVoice();
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Speak clearly about your product...",
      });
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processVoice = async () => {
    setIsProcessing(true);
    
    // Simulate voice processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    // Mock voice-to-text and AI processing results with professional variety
    const productCategories = [
      'Electronics & Technology', 'Fashion & Apparel', 'Home & Garden', 'Sports & Fitness',
      'Beauty & Personal Care', 'Books & Media', 'Automotive Parts', 'Industrial Equipment',
      'Office Supplies', 'Health & Medical', 'Food & Beverages', 'Pet Supplies',
      'Arts & Crafts', 'Musical Instruments', 'Jewelry & Accessories', 'Tools & Hardware'
    ];
    
    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Hindi', 'Mandarin', 'Japanese', 'Arabic'];
    
    const professionalTranscripts = [
      "I have a high-quality product that I'd like to list for sale with professional specifications and competitive pricing",
      "Looking to create a professional listing for this premium item with detailed product information and market positioning",
      "I need to list this commercial-grade product with appropriate technical specifications and industry-standard descriptions",
      "Want to create a professional marketplace listing for this quality item with optimized title and category placement",
      "I have a professional product that needs proper documentation and listing with market-appropriate pricing strategy",
      "Need to generate a comprehensive product listing with professional descriptions and competitive market analysis"
    ];
    
    const generateProfessionalTitle = (category: string) => {
      const adjectives = ['Professional', 'Premium', 'Advanced', 'High-Performance', 'Commercial-Grade', 'Industrial', 'Professional-Quality'];
      const descriptors = ['Solution', 'System', 'Equipment', 'Product', 'Tool', 'Device', 'Kit', 'Set'];
      
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
      
      return `${adjective} ${category} ${descriptor} - ${['Certified', 'Verified', 'Tested', 'Approved'][Math.floor(Math.random() * 4)]} Quality`;
    };
    
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const randomCategory = productCategories[Math.floor(Math.random() * productCategories.length)];
    const randomTranscript = professionalTranscripts[Math.floor(Math.random() * professionalTranscripts.length)];
    const generatedTitle = generateProfessionalTitle(randomCategory);
    
    const result = {
      transcript: randomTranscript,
      title: generatedTitle,
      category: randomCategory,
      language: randomLanguage
    };
    setResult(result);
    setIsProcessing(false);
    
    toast({
      title: "Voice Processing Complete!",
      description: "Your product title and category have been generated.",
    });
  };

  const playAudio = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    }
  };

  const resetRecording = () => {
    setResult(null);
    setAudioBlob(null);
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <div className="text-center space-y-6">
          <div className="relative">
            <div 
              className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-elegant ${
                isRecording 
                  ? "bg-red-50 border-4 border-red-400 animate-pulse" 
                  : "bg-gradient-secondary border-4 border-border hover:border-muted-foreground"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
              ) : isRecording ? (
                <MicOff className="h-12 w-12 text-red-500" />
              ) : (
                <Mic className="h-12 w-12 text-foreground" />
              )}
            </div>
            
            {isRecording && (
              <div className="absolute -inset-4 rounded-full border-2 border-red-400/30 animate-ping" />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isProcessing ? "Processing Voice..." : isRecording ? "Listening..." : "Ready to Record"}
            </h3>
            <p className="text-muted-foreground">
              {isProcessing 
                ? "Processing speech and generating professional product information..."
                : isRecording 
                ? "Speak clearly about your product. Click stop when finished."
                : "Click the microphone to record your product description in any language"
              }
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            {!isRecording && !isProcessing ? (
              <Button 
                variant="hero" 
                size="lg" 
                onClick={startRecording}
                className="shadow-ai"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Recording
              </Button>
            ) : isRecording ? (
              <Button 
                variant="destructive" 
                size="lg" 
                onClick={stopRecording}
              >
                <MicOff className="mr-2 h-5 w-5" />
                Stop Recording
              </Button>
            ) : null}
          </div>
        </div>
          ) : (
            <div className="space-y-6">
              <Card className="p-6 bg-background border shadow-elegant">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600">
                      <Mic className="h-5 w-5" />
                      <span className="font-medium">Processing Complete</span>
                    </div>
                    {audioBlob && (
                      <Button variant="ghost" size="sm" onClick={playAudio}>
                        <Volume2 className="h-4 w-4 mr-2" />
                        Replay
                      </Button>
                    )}
                  </div>
              
              <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Speech Recognition ({result.language})
                    </h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                      "{result.transcript}"
                    </p>
                  </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Optimized Title
                      </h4>
                      <p className="text-lg font-medium text-foreground">{result.title}</p>
                    </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Category
                    </h4>
                    <p className="text-sm text-muted-foreground">{result.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={resetRecording}>
              Record New Product
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};