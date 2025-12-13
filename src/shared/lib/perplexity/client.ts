export interface PerplexityResponse {
  id: string;
  model: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  object: string;
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }[];
}

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export interface PerplexityOptions {
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  search_mode?: 'web' | 'writing';
  frequency_penalty?: number;
  return_images?: boolean;
  return_videos?: boolean;
  stream?: boolean;
}

export const perplexityClient = {
  /**
   * Sends a chat completion request to the Perplexity API.
   * @param messages Array of message objects with role and content.
   * @param options Configuration options for the API request.
   */
  chat: async (
    messages: { role: 'system' | 'user'; content: string }[],
    options: PerplexityOptions = {}
  ) => {
    const apiKey = process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      throw new Error('PERPLEXITY_API_KEY is not configured');
    }

    const defaultOptions = {
      model: 'sonar-pro',
      temperature: 0.2,
      top_p: 0.9,
      return_images: false,
      return_videos: false,
      stream: false,
    };

    const requestBody = {
      ...defaultOptions,
      ...options,
      messages,
    };

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Perplexity API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = (await response.json()) as PerplexityResponse;
    return data;
  },
};
