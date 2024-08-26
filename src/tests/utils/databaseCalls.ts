import { randomUUID } from "crypto";
import { initializeDbConnection } from "../../database/datbaseConnector.js";

export async function getTripsFromDB() {
    const db = initializeDbConnection();
    const trips = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM trip', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
    db.close();
    return trips;
}

export async function getTestTripFromDB() {
    const db = initializeDbConnection();
    const trips = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM trip WHERE origin LIKE 'TEST'", (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
    db.close();
    return trips;
}

export async function insertTestTripInDB () {
    const db = initializeDbConnection();
    const uuid = randomUUID();
    await new Promise((resolve, reject) => {
        db.run('INSERT INTO trip (ID, origin, destination, cost, duration, type, display_name) VALUES (?, ?, ?, ?, ?, ?, ?)', [uuid, 'TEST', 'TEST', 100, 100, 'flight', 'MAD to AGP'], (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
    db.close();
    return uuid;
}

export async function deleteFromDB (uuid: string) {
    const db = initializeDbConnection();
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM trip WHERE id = ?', [uuid], (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
    db.close();
    return true;
}