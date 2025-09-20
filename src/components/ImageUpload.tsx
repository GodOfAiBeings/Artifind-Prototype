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
    
    // Mock AI results with professional variety
    const productCategories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors', 'Beauty & Health', 'Books & Media', 'Automotive', 'Toys & Games', 'Office Supplies', 'Industrial Equipment'];
    const priceRanges = [
      { min: 15, max: 50, suffix: '.99' },
      { min: 50, max: 200, suffix: '.00' },
      { min: 200, max: 1000, suffix: '.99' },
      { min: 25, max: 75, suffix: '.95' }
    ];
    
    const generatePrice = () => {
      const range = priceRanges[Math.floor(Math.random() * priceRanges.length)];
      const price = Math.floor(Math.random() * (range.max - range.min) + range.min);
      return `$${price}${range.suffix}`;
    };
    
    const professionalDescriptions = [
      "Premium quality product featuring advanced materials and superior craftsmanship. Designed for professionals and enthusiasts who demand excellence. Includes comprehensive warranty and customer support.",
      "High-performance item with innovative design and cutting-edge technology. Perfect for both commercial and personal use. Meets industry standards and certifications for quality assurance.",
      "Professional-grade solution offering exceptional durability and reliability. Engineered with precision components and backed by extensive research and development. Ideal for demanding applications.",
      "Sophisticated product combining elegant aesthetics with functional excellence. Crafted from premium materials with attention to detail. Suitable for discerning customers seeking quality and style.",
      "Industrial-strength item designed for heavy-duty applications. Features robust construction and advanced engineering for maximum performance and longevity. Trusted by professionals worldwide.",
      "Innovative product incorporating latest technology and user-centric design. Optimized for efficiency and ease of use. Complies with international quality and safety standards."
    ];
    
    const randomCategory = productCategories[Math.floor(Math.random() * productCategories.length)];
    const randomDescription = professionalDescriptions[Math.floor(Math.random() * professionalDescriptions.length)];
    const randomPrice = generatePrice();
    
    const result = {
      description: randomDescription,
      price: randomPrice,
      category: randomCategory
    };
    setResult(result);
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
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-elegant ${
            isDragActive 
              ? "border-foreground bg-gradient-accent" 
              : "border-border hover:border-muted-foreground hover:bg-gradient-accent"
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
            <Card className="p-6 bg-background border shadow-elegant">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded product"
                    className="w-48 h-48 object-cover rounded-lg shadow-elevated"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-background/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>
              
              <div className="flex-1 space-y-4">
                  {isProcessing ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-medium">Analyzing product image...</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                      </div>
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">Analysis Complete</span>
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
                            Market Price
                          </h4>
                          <p className="text-lg font-bold text-foreground">{result.price}</p>
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