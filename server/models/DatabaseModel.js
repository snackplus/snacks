const { Pool } = require('pg');

const PG_URI = 'postgres://mfktuuxv:zX_TG9vP8SPcCn3uCPdpZuh8FPsuYKeL@queenie.db.elephantsql.com/mfktuuxv';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};