/* Path to databse*/
const dbUser = require('../models/userModel');
import * as bcrypt from 'bcryptjs';

const userController = {
    createUser(req, res, next) {
        const
            queryString1 = `
                SELECT username FROM users
                WHERE username=$1`,
            queryArgs1 = [req.body.username];
        dbUser.query(queryString1, queryArgs1, (err, user) => {
            if (user.rows.length !== 0) return res.status(400).json({ status: 'userExists'});
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const
                queryString2 = `
                    INSERT INTO users (username, password)
                    VALUES ($1,$2) RETURNING *`,
                queryArgs2 = [req.body.username, hash];
            dbUser.query(queryString2, queryArgs2, (err, user) => {
                if (err) return next({ log: err });
                res.locals.userID = user.rows[0]['_id'];
                return next();
            });
        })
    },

    verifyUser(req, res, next) {
        const
            queryString = `
                SELECT * FROM users
                WHERE username=$1`,
            queryArgs = [req.body.username];

        dbUser.query(queryString, queryArgs, (err, user) => {
            //if our returned query has nothing in the rows key then db did not find the user and it is not a valid user
            if (user.rows.length === 0) return res.status(400).json('noUser');
            //if the username is a username in the db then check that password the user entered matches the password in the db for that username
            bcrypt.compare(req.body.password, user.rows[0].password, (err, isMatch) => {
                if (err) console.log('Error in bcrypt hashing, verifyUser: ', err)
                //if not a password match then not a valid user
                if (!isMatch) return res.status(200).json({ message: 'notMatching' });
                //if password is correct then grab the id from that user in the db and pass it along in the middleware
                res.locals.userID = user.rows[0]['_id'];
                return next();
            })
        })
    }
};

module.exports = userController;