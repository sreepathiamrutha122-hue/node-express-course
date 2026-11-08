
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dbPromise = open({
    filename: "./books.db",
    driver: sqlite3.Database
});

const initializeDatabase = async () => {
    const db = await dbPromise;

    await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price REAL NOT NULL
        )
    `);

    return db;
};

module.exports = {
    dbPromise,
    initializeDatabase
};
