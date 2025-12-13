const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export class PerplexityService {
  private static apiKey = process.env.PERPLEXITY_API_KEY;

  /**
   * Search for artist lineup for a given concert.
   * Returns a list of artist names found.
   */
  static async searchConcertLineup(concertTitle: string): Promise<string[]> {
    if (!this.apiKey) {
      console.warn('PERPLEXITY_API_KEY is not set. Skipping AI search.');
      return [];
    }

    const query = `
      Find the artist lineup for the concert "${concertTitle}".
      Return the artist names as a JSON array of strings.
      Example: ["Artist A", "Artist B"]
      Only return the JSON array, no other text.
      If no artists are found, return [].
    `;

    try {
      const response = await fetch(PERPLEXITY_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar',
          max_tokens: 50,
          search_mode: 'web',
          temperature: 0.0,
          top_p: 0.9,
          top_k: 1,
          // "response_language": "ko",
          return_images: false,
          return_videos: false,
          frequency_penalty: 0,
          stream: false,
          messages: [{ role: 'user', content: query }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.choices[0]?.message?.content);
      const content = data.choices[0]?.message?.content || '[]';

      return this.parseJsonArray(content);
    } catch (error) {
      console.error('Error in PerplexityService.searchConcertLineup:', error);
      return [];
    }
  }

  private static parseJsonArray(text: string): string[] {
    try {
      // 1. Try standard JSON parsing first (best case)
      // Look for a complete JSON array pattern
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch (e) {
      console.warn('Standard JSON parse failed, attempting recovery for truncated data:', e);
    }

    // 2. Recovery logic for truncated JSON (e.g. finish_reason="length")
    // If the text looks like the start of an array, extract all complete quoted strings
    if (text.trim().startsWith('[')) {
      const results: string[] = [];
      // Regex to match valid JSON strings: "..." taking escapes into account
      const stringRegex = /"(?:[^"\\]|\\.)*"/g;

      let match;
      while ((match = stringRegex.exec(text)) !== null) {
        try {
          // match[0] is the full string with quotes, e.g., "Artist Name"
          // We use JSON.parse to correctly handle escapes
          const str = JSON.parse(match[0]);
          results.push(str);
        } catch (e) {
          // Ignore malformed strings
        }
      }
      return results;
    }

    return [];
  }
}
