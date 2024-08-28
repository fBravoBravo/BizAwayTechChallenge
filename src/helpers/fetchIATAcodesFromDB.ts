import { initializeDbConnection } from '../database/datbaseConnector.js';

/**
 * Fetch IATA codes from the database
 * @returns {Promise<string[]>} - List of IATA codes
 */
export async function fetchIATAcodesFromDB() {
  const db = initializeDbConnection();

  const rows = await new Promise((resolve, reject) => {
    db.all('SELECT IATAcode FROM locations', [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows as {IATAcode: string}[]);
    });
  }) as {IATAcode: string}[];

  db.close();

  const iataCodes = rows.map((row: { IATAcode: string }) => row.IATAcode);

  return iataCodes;
}
