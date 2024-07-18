const { newDb } = require('pg-mem');

const PoolTest = newDb().adapters.createPg().Pool;

const poolTest = new PoolTest()

module.exports = {
    query: (text, params) => poolTest.query(text, params),
    end: () => poolTest.end()
}