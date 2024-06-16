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
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            server_id TEXT,
            role_one_id TEXT,
            role_two_id TEXT,
            role_three_id TEXT
        )
    `);
});

function getRoleEntriesByServerId(serverId) {
    return new Promise((resolve, reject) => {
        rolesDB.all(`SELECT role_one_id AS role1Id, role_two_id AS role2Id, role_three_id AS role3Id FROM roles WHERE server_id = ?`, [serverId], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = { rolesDB, getRoleEntriesByServerId };