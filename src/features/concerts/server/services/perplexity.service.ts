import { perplexityClient } from '@/shared/lib/perplexity/client';

/**
 * Search for artist lineup for a given concert.
 * Returns a list of artist names found.
 */
export async function searchConcertLineup(concertTitle: string): Promise<string[]> {
  try {
    const messages: { role: 'system' | 'user'; content: string }[] = [
      {
        role: 'system',
        content: `You are a JSON API that returns concert lineup data.
          # Output Format
          - Return ONLY a valid JSON array of strings
          - Each string is an artist name
          - No explanations, no additional text
          - Example: ["Artist A", "Artist B"]
          - If no artists found: []`,
      },
      {
        role: 'user',
        content: `Find the complete artist lineup for the concert: "${concertTitle}"`,
      },
    ];

    const data = await perplexityClient.chat(messages, {
      model: 'sonar',
      max_tokens: 800,
      search_mode: 'web',
      temperature: 0.1,
      top_p: 0.9,
      frequency_penalty: 0,
    });
    const content = data.choices[0]?.message?.content || '[]';

    return parseJsonArray(content);
  } catch (error) {
    console.error('Error in PerplexityService.searchConcertLineup:', error);
    return [];
  }
}

function parseJsonArray(text: string): string[] {
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
