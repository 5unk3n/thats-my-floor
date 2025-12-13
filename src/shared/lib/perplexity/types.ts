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
