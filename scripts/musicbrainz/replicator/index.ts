import { DatabaseHandler } from './database';
import { PacketDownloader } from './downloader';
import { PacketParser } from './parser';

export class MusicBrainzReplicator {
  private db: DatabaseHandler;
  private downloader: PacketDownloader;
  private parser: PacketParser;

  constructor(databaseUrl: string) {
    this.db = new DatabaseHandler(databaseUrl);
    this.downloader = new PacketDownloader();
    this.parser = new PacketParser();
  }

  async replicate(options: { limit?: number } = {}) {
    try {
      let currentSeq = await this.db.getCurrentSequence();
      console.log(`Current DB Sequence: ${currentSeq}`);

      // Check for updates
      // We can try to download next sequence.
      // If limit is set, stop after N packets.

      let processed = 0;
      const limit = options.limit || 10; // Default limit

      while (processed < limit) {
        const nextSeq = currentSeq + 1;
        try {
          console.log(`Attempting to replicate packet #${nextSeq}...`);
          const stream = await this.downloader.downloadPacket(nextSeq);

          console.log(`Parsing packet #${nextSeq}...`);
          const changes = await this.parser.parse(stream);

          console.log(`Applying ${changes.length} changes for packet #${nextSeq}...`);
          await this.db.applyPacket(nextSeq, changes);

          currentSeq = nextSeq;
          processed++;
        } catch (e: unknown) {
          if (e instanceof Error && e.message.includes('404')) {
            console.log('No new packets available. Up to date.');
            break;
          }
          throw e; // Real error
        }
      }
    } finally {
      await this.db.close();
    }
  }
}
