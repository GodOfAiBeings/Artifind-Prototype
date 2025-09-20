import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, Image, DollarSign, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductResult {
  description: string;
  price: string;
  category: string;
}

export const ImageUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<ProductResult | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        processImage(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const processImage = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Mock AI results based on image analysis
    const mockResults = [
      {
        description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals who demand the best sound experience.",
        price: "$299.99",
        category: "Electronics"
      },
      {
        description: "Stylish ceramic coffee mug with ergonomic handle design. Microwave and dishwasher safe, perfect for your morning coffee ritual. Elegant matte finish adds sophistication to any kitchen.",
        price: "$24.99",
        category: "Home & Kitchen"
      },
      {
        description: "High-performance running shoes with advanced cushioning technology and breathable mesh upper. Designed for athletes and fitness enthusiasts seeking comfort and performance.",
        price: "$149.99",
        category: "Sports & Fashion"
      }
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
    setIsProcessing(false);
    
    toast({
      title: "AI Analysis Complete!",
      description: "Your product description and pricing have been generated.",
    });
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-glass rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? "border-primary bg-gradient-accent" : "hover:border-primary/50 hover:bg-gradient-accent"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? "Drop your image here..." : "Upload Product Image"}
          </p>
          <p className="text-muted-foreground">
            Drag & drop or click to select • PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 bg-secondary/20 border-glass">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded product"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                {isProcessing ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="font-medium">AI is analyzing your image...</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">AI Analysis Complete</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Product Description
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                      
                      <div className="flex gap-4">
                        <div>
                          <h4 className="font-semibold mb-1 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Suggested Price
                          </h4>
                          <p className="text-lg font-bold text-primary">{result.price}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1 flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            Category
                          </h4>
                          <p className="text-sm text-muted-foreground">{result.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Card>
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={resetUpload}>
              Upload Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};