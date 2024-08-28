import sqlite3 from 'sqlite3';

export function initializeDbConnection() {
  const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connected to the database.');
  });
  return db;
}

async function insertTestTripInDB() {
  const db = initializeDbConnection();

  const locations = [
    'AMS',
    'FRA',
    'IST',
    'CAN',
    'SIN',
    'DEN',
    'ICN',
    'BKK',
    'SFO',
    'LAS',
    'CLT',
    'MIA',
    'KUL',
    'SEA',
    'MUC',
    'EWR',
    'HKG',
    'MCO',
    'PHX',
    'IAH',
    'SYD',
    'MEL',
    'GRU',
    'YYZ',
    'LGW',
    'BCN',
    'MAN',
    'BOM',
    'DEL',
    'ZRH',
    'SVO',
    'DME',
    'JNB',
    'ARN',
    'OSL',
    'CPH',
    'HEL',
    'VIE',
  ];

  for (const location of locations) {
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO locations (IATAcode) VALUES (?)', [location], (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
  db.close();
}

async function deleteFromDb() {
  const db = initializeDbConnection();
  await new Promise((resolve, reject) => {
    db.run('DROP TABLE users', (err) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
  db.close();
}

deleteFromDb();
