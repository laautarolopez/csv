const { query, end } = require('./db.js')

const runSeed = async () => {
    try {
        // Crear la tabla "users" si no existe
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                credits NUMERIC DEFAULT 0
            );
        `)
        console.log(`Created "users" table`)

        // Crear la tabla "transfers" si no existe
        await query(`
            CREATE TABLE IF NOT EXISTS transfers (
                id SERIAL PRIMARY KEY,
                from_id TEXT REFERENCES users(id),
                to_id TEXT REFERENCES users(id),
                amount NUMERIC NOT NULL,
                date DATE NOT NULL
            );
        `)
        console.log(`Created "transfers" table`)

        await end()
    } catch (error) {
      console.error('Error seeding:', error)
      throw error
    }
}

module.exports = { runSeed }