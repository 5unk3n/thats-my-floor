import dotenv from 'dotenv';
import path from 'path';

import { MusicBrainzReplicator } from './replicator';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not defined in .env');
  process.exit(1);
}

async function main() {
  console.log('🚀 Starting MusicBrainz Replication...');

  const replicator = new MusicBrainzReplicator(DATABASE_URL!);

  try {
    // Run replication
    // Limit to 5 packets per run to avoid long running processes in this initial version
    await replicator.replicate({ limit: 5 });
    console.log('✅ Replication finished successfully.');
  } catch (error) {
    console.error('❌ Replication failed:', error);
    process.exit(1);
  }
}

main();
