const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export class PerplexityService {
  private static apiKey = process.env.PERPLEXITY_API_KEY;

  /**
   * Search for artist lineup for a given concert.
   * Returns a list of artist names found.
   */
  static async searchConcertLineup(
    concertTitle: string,
    place: string,
    date: string
  ): Promise<string[]> {
    if (!this.apiKey) {
      console.warn('PERPLEXITY_API_KEY is not set. Skipping AI search.');
      return [];
    }

    const query = `
      Find the artist lineup for the concert "${concertTitle}" held at "${place}" on ${date}.
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
          model: 'sonar-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that returns JSON arrays of artist names.',
            },
            { role: 'user', content: query },
          ],
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '[]';

      return this.parseJsonArray(content);
    } catch (error) {
      console.error('Error in PerplexityService.searchConcertLineup:', error);
      return [];
    }
  }

  private static parseJsonArray(text: string): string[] {
    try {
      // Find JSON array pattern in the text (in case there is extra text)
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        return JSON.parse(match[0]);
      }
      return [];
    } catch (e) {
      console.error('Failed to parse JSON from Perplexity response:', text);
      return [];
    }
  }
}
