import type {
  ImageManipulationRequest,
  ImageManipulationResponse,
  GeminiGenerateContentRequest,
  GeminiGenerateContentResponse,
} from '../types/api';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  import.meta.env.VITE_GEMINI_API_URL ||
  'https://generativelanguage.googleapis.com/v1beta';

// Model name with fallback to Gemini 3 Pro Image Preview
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL_NAME || 'gemini-3-pro-image-preview';

/**
 * Validates that the API key is configured
 */
export function isApiKeyConfigured(): boolean {
  return Boolean(GEMINI_API_KEY && GEMINI_API_KEY !== 'your_api_key_here');
}

/**
 * Extracts base64 data from a data URL
 */
function extractBase64FromDataUrl(dataUrl: string): { mimeType: string; data: string } {
  const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid data URL format');
  }
  return {
    mimeType: matches[1],
    data: matches[2],
  };
}

/**
 * Builds the prompt for house repainting
 */
function buildRepaintPrompt(request: ImageManipulationRequest): string {
  const { targetColor } = request;
  return `Paint the walls of the house in the selected color: ${targetColor.name} (${targetColor.hex})`;
}

/**
 * Calls the Google Gemini API to manipulate/repaint a house image
 */
export async function repaintHouseImage(
  request: ImageManipulationRequest
): Promise<ImageManipulationResponse> {
  if (!isApiKeyConfigured()) {
    return {
      success: false,
      error: 'API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.',
    };
  }

  try {
    const { mimeType, data } = extractBase64FromDataUrl(request.image);
    const prompt = buildRepaintPrompt(request);

    const apiRequest: GeminiGenerateContentRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseModalities: ['TEXT', 'IMAGE'],
      },
    };

    const response = await fetch(
      `${GEMINI_API_URL}/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequest),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
      return {
        success: false,
        error: errorMessage,
      };
    }

    const responseData: GeminiGenerateContentResponse = await response.json();

    // Extract the generated image from the response
    const candidate = responseData.candidates?.[0];
    if (!candidate) {
      return {
        success: false,
        error: 'No response generated from the API',
      };
    }

    // Look for image data in the response parts
    // Handle both snake_case (inline_data) and camelCase (inlineData) formats
    const imagePart = candidate.content.parts.find((part) => part.inline_data || (part as any).inlineData);
    if (imagePart?.inline_data) {
      const outputImage = `data:${imagePart.inline_data.mime_type};base64,${imagePart.inline_data.data}`;
      return {
        success: true,
        outputImage,
      };
    } else if ((imagePart as any)?.inlineData) {
      // Handle camelCase format (used by newer models like gemini-3-pro-image-preview)
      const inlineData = (imagePart as any).inlineData;
      const mimeType = inlineData.mimeType || inlineData.mime_type;
      const outputImage = `data:${mimeType};base64,${inlineData.data}`;
      return {
        success: true,
        outputImage,
      };
    }

    // If no image was returned, check for text response (might contain error or explanation)
    const textPart = candidate.content.parts.find((part) => part.text);
    if (textPart?.text) {
      return {
        success: false,
        error: `API returned text instead of image: ${textPart.text.substring(0, 200)}`,
      };
    }

    return {
      success: false,
      error: `Unexpected API response format. Response structure: ${JSON.stringify({
        hasCandidates: !!responseData.candidates,
        candidateCount: responseData.candidates?.length,
        hasContent: !!candidate.content,
        partsCount: candidate.content?.parts?.length,
        partTypes: candidate.content?.parts?.map(p => Object.keys(p))
      })}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Test the API connection
 */
export async function testApiConnection(): Promise<{ success: boolean; message: string }> {
  if (!isApiKeyConfigured()) {
    return {
      success: false,
      message: 'API key not configured',
    };
  }

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/models/${MODEL_NAME}?key=${GEMINI_API_KEY}`
    );

    if (response.ok) {
      return {
        success: true,
        message: 'API connection successful',
      };
    }

    const errorData = await response.json().catch(() => ({}));
    return {
      success: false,
      message: errorData.error?.message || `Connection failed with status ${response.status}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
    };
  }
}
