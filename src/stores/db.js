import localforage from 'localforage';

// Single IndexedDB database with two named stores
export const expenseDB = localforage.createInstance({
  name: 'level-db',
  storeName: 'expenses',
});

export const seasonDB = localforage.createInstance({
  name: 'level-db',
  storeName: 'season_summaries',
});
