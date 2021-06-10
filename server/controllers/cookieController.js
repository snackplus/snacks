const dbCookie = require("../models/DatabaseModel");

const cookieController = {
    //middleware to create a cookie and add that cookie to user
    createSessionCookie(req, res, next) {
        console.log('********* COOKIE CONTROLLER START *********')

        const { username } = req.body;

        const newSSID = () => {
            const SSID = Math.floor(Math.random() * 1000000000000000);
            dbCookie.query(`SELECT session_id FROM sessions`)
                .then(data => {
                    console.log(data.rows);
                    for (let session of data.rows) {
                        if (session.ssid === SSID) return newSSID();
                    }
                    console.log(SSID);
                    setCookie(SSID);
                })
        }

        const setCookie = (SSID) => {

            res.cookie('SSID', SSID, { httpOnly: false, maxAge: 604800000 })

            const queryString =
                `INSERT INTO sessions(session_id, username)
                VALUES ($1, $2)`,
                queryArgs = [SSID, username];

            dbCookie.query(queryString, queryArgs)
                .then(() => next())
                .catch(err => console.log('MAJOR PROBLEM TRYING TO ADD INTO SESSIONS DB: ', err))
        }

        newSSID();
    },

    //middleware to validate if the user has a cookie and if that cookie is a valid cookie to login
    sessionValidation(req, res, next) {
        console.log('entered verifySession')
        if (!req.cookies.SSID) return res.status(200).json('failed');

        console.log('ssid cookie detected, verfifying...')
        const { SSID } = req.cookies;

        const queryString =
            `SELECT session_id FROM sessions
            WHERE session_id = $1`,
            queryArgs = [SSID];

        console.log('checking for session in db');
        dbCookie.query(queryString, queryArgs)
            .then(data => {
                console.log('data:')
                console.log(data.rows)
                //if nothing is returned then the ssid does not exist in the db and it is not a valid user
                console.log('before check ssid')
                if (data.rows[0] === undefined) return res.status(200).json({ status: false })
                console.log('after check ssid')
                return next();
            })
    },

    deleteSessionCookie(req, res, next) {
        const { SSID } = req.cookies;

        const queryString =
            `DELETE FROM sessions 
            WHERE session_id = $1`,
            queryArgs = [SSID];

        console.log('checking for session in db');
        dbCookie.query(queryString, queryArgs)
            .then(data => {
                //if nothing is returned then the ssid does not exist in the db and it is not a valid user
                res.clearCookie('SSID');
                return next();
            })

    },

    //add this middleware before all middleware
    //add column 
    getUserFromSSID(req, res, next) {

        const { SSID } = req.cookies;

        const query = {
            text: `SELECT username FROM sessions WHERE session_id = $1`,
            values: [SSID]
        }
        dbCookie.query(query)
            .then(data => {
                if (!data.rows.length) return res.status(200).json({ message: 'invalid ssid' })
                res.locals.username = data.rows[0].username;
                return next();
            })
    }
};

module.exports = cookieController;