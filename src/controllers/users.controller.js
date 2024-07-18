const { query } = require('../db/db.js')
const csv = require('csv-parser');
const { Readable } = require('stream');

const userToJSON = (user) => {
    return ({
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
    })
}

const getUsers = async (req, res) => {
    try {
        const { rows } = await query("SELECT * FROM users");
        res.json(rows.map((user) => userToJSON(user)))
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}

const uploadUsers = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or uploaded file is not a CSV.' })
    }
  
    const results = []
    const csvStream = csv()
    const bufferStream = Readable.from(req.file.buffer);
  
    bufferStream.pipe(csvStream)
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                const promises = results.map(user => insertUser(user));

                await Promise.all(promises);

                res.status(200).json({ message: 'Data loaded successfully' });
            } catch(error) {
                res.status(error.status || 500).json({ error: error.message })
            }
        })

    const insertUser = async (user) => {
        try {
            const {rows} = await query('SELECT * FROM users WHERE id = $1', [user.id]);
    
            if(rows.length > 0) {
                updateUser(user)
            } else {
                const {affectedRows} = await query("INSERT INTO users (id, name, email, credits) VALUES ($1, $2, $3, $4)", [user.id, user.name, user.email, user.credits])
                if(affectedRows <= 0) throw new HttpError(400, "User with id" + user.id + "could not be inserted.")
            }
        } catch(error) {
            throw new HttpError(error.statusCode || 500, error.message)
        }
    }

    const updateUser = async (user) => {
        try {
            const {rows} = await query('SELECT * FROM users WHERE id = $1', [user.id]);
            const userFound = rows[0]
            if(!userFound) throw new HttpError(400, "User not be found.")
            
            const {rowCount} = await query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), credits = COALESCE($3, credits) WHERE id = $4', [user.name, user.email, user.credits, user.id])
            if(rowCount <= 0) throw new HttpError(400, "User cannot be updated.")
        } catch(error) {
            throw new HttpError(error.statusCode || 500, error.message)
        }
    }

    class HttpError extends Error {
        constructor(statusCode, message) {
            super(message);
            this.statusCode = statusCode;
        }
    }
}

module.exports = { getUsers, uploadUsers }