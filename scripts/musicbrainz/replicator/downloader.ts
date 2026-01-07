import { Readable } from 'stream';

export class PacketDownloader {
  private baseUrl = 'http://ftp.musicbrainz.org/pub/musicbrainz/data/replication';

  async downloadPacket(sequence: number): Promise<Readable> {
    const url = `${this.baseUrl}/replication-${sequence}.tar.bz2`;
    console.log(`Downloading packet #${sequence} from ${url}`);

    // Use native fetch (Node 18+)
    const response = await fetch(url);

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
