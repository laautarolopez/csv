const { query } = require('../db/db.js')
const { parse, format } = require('date-fns')

const transferCredits = async (req, res) => {
    const { from_id, to_id, amount } = req.body

    try {
        const from_id_data = await query('SELECT * FROM users WHERE id = $1', [from_id])
        const user_sends = from_id_data.rows[0]
        if(!user_sends) return res.status(400).json({ error: "User with id " + from_id + " not found." })
    
        const to_id_data = await query('SELECT * FROM users WHERE id = $1', [to_id])
        const user_receives = to_id_data.rows[0]
        if(!user_receives) return res.status(400).json({ error: "User with id " + to_id + " not found." })

        if(amount > user_sends.credits) return res.status(400).json({ error: "User with id " + from_id + " does not have enough credits." })

        const update_credits_user_sends = await query('UPDATE users SET credits = $1 WHERE id = $2', [user_sends.credits - amount, from_id])
        if(update_credits_user_sends.rowCount <= 0) return res.status(400).json({ error: "User with id " + from_id + " could not transfer credits." })

        const update_credits_user_receives = await query('UPDATE users SET credits = $1 WHERE id = $2', [user_receives.credits + amount, to_id])
        if(update_credits_user_receives.rowCount <= 0) return res.status(400).json({ error: "User with id " + to_id + " could not receive credits." })

        const new_transfer = await query('INSERT INTO transfers (from_id, to_id, amount, date) VALUES ($1, $2, $3, $4)', [from_id, to_id, amount, new Date()])
        if(new_transfer.rowCount <= 0) return res.status(400).json({ error: "Transfer could not be registered." })

        res.json({
            user_sends_credits: user_sends.credits - amount,
            user_receives_credits: user_receives.credits + amount
        })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

const getReport = async (req, res) => {
    const { initial_date, end_date } = req.body

    const parseDate = (dateStr) => {
        return parse(dateStr, 'dd/MM/yyyy', new Date());
    };
    
    const formatDateToYMD = (date) => {
        return format(date, 'yyyy-MM-dd');
    };

    if(initial_date > end_date) return res.status(400).json({ error: "Initial date must be less than or equal to end date." })
    
    const initial_date_parsed = parseDate(initial_date);
    const end_date_parsed = parseDate(end_date);

    const initial_date_formatted = formatDateToYMD(initial_date_parsed);
    const end_date_formatted = formatDateToYMD(end_date_parsed);

    try {
        const transfers_data = await query('SELECT SUM(amount) FROM transfers WHERE date >= $1 AND date <= $2', [initial_date_formatted, end_date_formatted])
        const amount = transfers_data.rows[0].sum
        
        res.json({ amount: amount | 0 })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { transferCredits, getReport }