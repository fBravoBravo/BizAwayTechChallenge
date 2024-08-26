import { initializeDbConnection } from "../database/datbaseConnector.js";

export async function fetchIATAcodesFromDB () {
  const db = initializeDbConnection();

  const rows = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM locations', [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

  db.close();

  return rows;
}