import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your professional AI commerce assistant. I can help with product optimization, pricing strategies, market analysis, customer service best practices, and operational efficiency. How may I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const professionalResponses = [
    "For optimal market positioning, I recommend conducting competitive analysis within your category. Price competitively while highlighting unique value propositions that differentiate your offering from similar products.",
    
    "Professional product photography significantly impacts conversion rates. Use consistent lighting, multiple angles, and lifestyle shots that demonstrate product usage. High-resolution images with zoom functionality increase buyer confidence.",
    
    "Effective product descriptions should include key specifications, benefits, and use cases. Structure content with bullet points for easy scanning, and include relevant keywords for search optimization without compromising readability.",
    
    "Customer service excellence drives repeat business and positive reviews. Implement clear communication policies, fast response times, and proactive follow-up procedures to build long-term customer relationships.",
    
    "Inventory management optimization involves demand forecasting, supplier relationship management, and automated reorder points. Consider seasonal trends and lead times to maintain optimal stock levels.",
    
    "Market expansion strategies should be data-driven. Analyze customer demographics, geographic performance, and seasonal patterns to identify growth opportunities and optimize resource allocation.",
    
    "Return policies should balance customer satisfaction with business protection. Clear, reasonable policies build trust while protecting profit margins. Consider offering partial returns or store credit alternatives.",
    
    "Cross-selling and upselling opportunities exist throughout the customer journey. Recommend complementary products based on purchase history and browsing behavior to increase average order value.",
    
    "Quality assurance processes ensure consistent customer satisfaction. Implement systematic product checks, supplier audits, and customer feedback analysis to maintain high standards.",
    
    "Pricing strategies should consider market positioning, cost structures, and competitive landscape. Dynamic pricing models can optimize revenue based on demand patterns and inventory levels.",
    
    "Customer retention programs should focus on value delivery and engagement. Loyalty programs, personalized recommendations, and exclusive offers can significantly improve lifetime customer value.",
    
    "Performance metrics tracking enables data-driven decisions. Monitor key indicators like conversion rates, customer acquisition costs, and average order values to optimize business operations.",
  ];

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: professionalResponses[Math.floor(Math.random() * professionalResponses.length)],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <div className="space-y-4">
      <Card className="h-96 bg-background border shadow-elegant">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-foreground text-background ml-12'
                      : 'bg-muted border'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Analyzing your request...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
      
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about product optimization, pricing strategies, market analysis, or operational guidance..."
          className="flex-1 bg-background border"
          disabled={isTyping}
        />
        <Button 
          onClick={sendMessage}
          disabled={!inputValue.trim() || isTyping}
          variant="default"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};