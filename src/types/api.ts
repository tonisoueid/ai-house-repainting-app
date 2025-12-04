export interface ColorPalette {
  name: string;
  hex: string;
  border?: boolean;
}

export interface ImageManipulationRequest {
  image: string; // Base64 encoded image
  targetColor: ColorPalette;
  options?: {
    preserveRoof?: boolean;
    preserveWindows?: boolean;
    highRealism?: boolean;
    enhancedLighting?: boolean;
    colorIntensity?: number; // 0-100
    textureRealism?: number; // 0-100
    shadowContrast?: number; // 0-100
  };
}

export interface ImageManipulationResponse {
  success: boolean;
  outputImage?: string; // Base64 encoded result image
  error?: string;
}

export interface GeminiGenerateContentRequest {
  contents: Array<{
    parts: Array<{
      text?: string;
      inline_data?: {
        mime_type: string;
        data: string;
      };
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
    responseMimeType?: string;
    responseModalities?: string[];
  };
}

export interface GeminiGenerateContentResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text?: string;
        inline_data?: {
          mime_type: string;
          data: string;
        };
      }>;
    };
    finishReason: string;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}
