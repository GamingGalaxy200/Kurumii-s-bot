const sqlite3 = require('sqlite3').verbose();

// Define the variable
const rolesDB = new sqlite3.Database('./src/databases/roles.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the roles database.');
});

// Create table if it doesn't exist
rolesDB.serialize(() => {
    rolesDB.run(`
        CREATE TABLE IF NOT EXISTS roles (
            server_id TEXT,
            role_one_id TEXT,
            role_two_id TEXT,
            role_three_id TEXT,
            PRIMARY KEY (server_id)
        )
    `);
});

module.exports = { rolesDB };