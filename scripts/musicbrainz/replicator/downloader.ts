import { Readable } from 'stream';

export class PacketDownloader {
  private baseUrl = 'https://metabrainz.org/api/musicbrainz';

  async downloadPacket(sequence: number): Promise<Readable> {
    const url = `${this.baseUrl}/replication-${sequence}.tar.bz2`;
    const token = process.env.METABRAINZ_ACCESS_TOKEN;
    const finalUrl = token ? `${url}?token=${token}` : url;
    console.log(`Downloading packet #${sequence} from ${url}`); // Don't log token

    // Rate limit: Wait 2 seconds to be safe (API limit is approx 1 req/sec)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Use native fetch (Node 18+)
    const response = await fetch(finalUrl);

    if (response.status === 404) {
      throw new Error(`Packet #${sequence} not found (404). We might be up to date.`);
    }

    if (!response.ok) {
      throw new Error(
        `Failed to download packet #${sequence}: ${response.status} ${response.statusText}`
      );
    }

    if (!response.body) {
      throw new Error(`Packet #${sequence} has no body.`);
    }

    // Convert Web ReadableStream to Node Readable
    // @ts-ignore: Readable.fromWeb exists in Node >= 16.17.0
    return Readable.fromWeb(response.body);
  }
}
