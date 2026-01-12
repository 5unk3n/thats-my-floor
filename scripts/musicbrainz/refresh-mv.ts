import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function refreshMaterializedView() {
  console.log(`[${new Date().toISOString()}] Starting Materialized View Refresh: mv_artist_search`);

  try {
    // Execute REFRESH CONCURRENTLY
    // Note: This requires a unique index on the materialized view
    await prisma.$executeRawUnsafe(`REFRESH MATERIALIZED VIEW CONCURRENTLY "mv_artist_search";`);

    console.log(`[${new Date().toISOString()}] Successfully refreshed mv_artist_search`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to refresh mv_artist_search:`, error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

refreshMaterializedView();
