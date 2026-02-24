import { saveSeason, getSeason, getActiveSeason as storeGetActive } from '../stores/seasonStore.js';
import { ACTIVE_SEASON_ID } from '../utils/constants.js';

/**
 * Create a new season and persist it with status "Active".
 */
export async function createSeason(id) {
  const season = {
    id,
    totalWeight: 0,
    totalExpenseValue: 0,
    status: 'Active',
    createdAt: new Date().toISOString(),
  };
  await saveSeason(season);
  return season;
}

/**
 * Merge updates into an existing season record.
 */
export async function updateSeason(id, updates) {
  const existing = await getSeason(id);
  if (!existing) throw new Error(`Season "${id}" not found`);
  const updated = { ...existing, ...updates };
  await saveSeason(updated);
  return updated;
}

/**
 * Set a season's status to "Archived", closing it out.
 */
export async function archiveSeason(id) {
  return updateSeason(id, { status: 'Archived' });
}

/**
 * Return the active season record. Bootstraps the default season on first run.
 */
export async function getActiveSeason() {
  const active = await storeGetActive();
  if (active) return active;
  // First launch: create the default season automatically
  return createSeason(ACTIVE_SEASON_ID);
}
