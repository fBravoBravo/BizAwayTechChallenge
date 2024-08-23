import sqlite3 from 'sqlite3';

export function initializeDbConnection (){
  const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the database.');
});
return db;
}