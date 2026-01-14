import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not defined');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function refreshMaterializedView() {
  console.log(`[${new Date().toISOString()}] Starting Materialized View Refresh: mv_artist_search`);

  try {
    const client = await pool.connect();
    try {
      // Execute REFRESH CONCURRENTLY
      // Note: This requires a unique index on the materialized view
      await client.query(`REFRESH MATERIALIZED VIEW CONCURRENTLY "mv_artist_search";`);

      console.log(`[${new Date().toISOString()}] Successfully refreshed mv_artist_search`);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to refresh mv_artist_search:`, error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

refreshMaterializedView();
