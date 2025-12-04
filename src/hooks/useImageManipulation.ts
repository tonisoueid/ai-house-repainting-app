import { useState, useCallback } from 'react';
import { repaintHouseImage, isApiKeyConfigured } from '../services/geminiApi';
import type { ColorPalette, ImageManipulationResponse } from '../types/api';

export interface ManipulationOptions {
  preserveRoof?: boolean;
  preserveWindows?: boolean;
  highRealism?: boolean;
  enhancedLighting?: boolean;
  colorIntensity?: number;
  textureRealism?: number;
  shadowContrast?: number;
}

export interface UseImageManipulationResult {
  isProcessing: boolean;
  outputImage: string | null;
  error: string | null;
  isApiConfigured: boolean;
  repaintImage: (
    inputImage: string,
    targetColor: ColorPalette,
    options?: ManipulationOptions
  ) => Promise<ImageManipulationResponse>;
  clearOutput: () => void;
  clearError: () => void;
}

export function useImageManipulation(): UseImageManipulationResult {
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isApiConfigured = isApiKeyConfigured();

  const repaintImage = useCallback(
    async (
      inputImage: string,
      targetColor: ColorPalette,
      options?: ManipulationOptions
    ): Promise<ImageManipulationResponse> => {
      setIsProcessing(true);
      setError(null);

      try {
        const response = await repaintHouseImage({
          image: inputImage,
          targetColor,
          options,
        });

        if (response.success && response.outputImage) {
          setOutputImage(response.outputImage);
        } else if (response.error) {
          setError(response.error);
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const clearOutput = useCallback(() => {
    setOutputImage(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isProcessing,
    outputImage,
    error,
    isApiConfigured,
    repaintImage,
    clearOutput,
    clearError,
  };
}
