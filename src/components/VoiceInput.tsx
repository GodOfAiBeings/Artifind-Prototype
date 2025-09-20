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
    
    // Mock voice-to-text and AI processing results
    const mockResults = [
      {
        transcript: "मैं एक सुंदर हैंडमेड कॉटन कुर्ता बेचना चाहता हूँ जो पारंपरिक डिज़ाइन के साथ है",
        title: "Traditional Handmade Cotton Kurta",
        category: "Fashion & Clothing",
        language: "Hindi"
      },
      {
        transcript: "I want to sell a premium wireless gaming mouse with RGB lighting and programmable buttons",
        title: "RGB Gaming Mouse - Wireless & Programmable",
        category: "Electronics & Gaming",
        language: "English"
      },
      {
        transcript: "Je veux vendre un sac à main en cuir véritable de couleur marron avec des détails dorés",
        title: "Genuine Leather Handbag - Brown with Gold Details",
        category: "Fashion & Accessories",
        language: "French"
      },
      {
        transcript: "Quiero vender una guitarra acústica de madera maciza perfecta para principiantes",
        title: "Solid Wood Acoustic Guitar - Perfect for Beginners",
        category: "Musical Instruments",
        language: "Spanish"
      }
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
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
              className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? "bg-red-500/20 border-4 border-red-500 animate-pulse" 
                  : "bg-gradient-primary border-4 border-primary/30 hover:border-primary/50"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="h-12 w-12 animate-spin text-foreground" />
              ) : isRecording ? (
                <MicOff className="h-12 w-12 text-red-500" />
              ) : (
                <Mic className="h-12 w-12 text-foreground" />
              )}
            </div>
            
            {isRecording && (
              <div className="absolute -inset-4 rounded-full border-2 border-red-500/30 animate-ping" />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isProcessing ? "Processing Voice..." : isRecording ? "Listening..." : "Ready to Record"}
            </h3>
            <p className="text-muted-foreground">
              {isProcessing 
                ? "Converting speech to text and generating product details..."
                : isRecording 
                ? "Speak clearly about your product. Click stop when finished."
                : "Click the microphone to start recording your product description"
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
          <Card className="p-6 bg-secondary/20 border-glass">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                  <Mic className="h-5 w-5" />
                  <span className="font-medium">Voice Processing Complete</span>
                </div>
                {audioBlob && (
                  <Button variant="ghost" size="sm" onClick={playAudio}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Play Recording
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Transcript ({result.language})
                  </h4>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg italic">
                    "{result.transcript}"
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Generated Title
                    </h4>
                    <p className="text-lg font-medium text-primary">{result.title}</p>
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
              Record Another Product
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};