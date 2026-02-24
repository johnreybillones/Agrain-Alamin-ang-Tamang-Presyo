import { seasonDB } from './db.js';

/**
 * Save (create or overwrite) a season summary. Uses season.id as the key.
 */
export async function saveSeason(season) {
  return seasonDB.setItem(season.id, season);
}

/**
 * Retrieve a season by id.
 */
export async function getSeason(id) {
  return seasonDB.getItem(id);
}

/**
 * Return the first season with status "Active", or null if none exists.
 */
export async function getActiveSeason() {
  let active = null;
  await seasonDB.iterate((value) => {
    if (value.status === 'Active') {
      active = value;
      return false; // stops iteration
    }
  });
  return active;
}

/**
 * Return all season summaries.
 */
export async function getAllSeasons() {
  const seasons = [];
  await seasonDB.iterate((value) => {
    seasons.push(value);
  });
  return seasons.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
