const db = require('../models/DatabaseModel');
const commentController = {};

//==================================================

commentController.addComment = (req, res, next) => {
    console.log("========== commentController addComment ==========");
    const { snack_id, rating, comment} = req.body;
    
    let q = {
        text: `SELECT * FROM comments WHERE user_id=$1 AND snack_id=$2`,
        values: [res.locals.username, snack_id]
    }
    db.query(q, (err, data) => {
        console.log("========== checking database if user already commented ==========");
        if (err) return next({message: err})
        console.log(data)
        if (data.rows.length) return res.status(400).json({status: 'failed'});
        // console.log(snack_id, user_id, rating, comment);
        q = {
            text: `INSERT INTO comments VALUES ($1, $2, $3, $4, DEFAULT)`,
            values: [snack_id, res.locals.username, rating, comment]
        }
    
        db.query(q)
        .then(() => {
            console.log("========== database updated with new comment ==========");
            return next()
        })
        .catch(err => {
            console.log("========== commentController.addComment error ==========")
            return next({
                log: `err: addComment of commentController ${err}`,
                message: "Error adding comment"
            });
        })
    })
}

//==================================================

commentController.delComment = (req, res, next) => {
    console.log("========== delComment commentController ==========")
    
    let q = {
        text: `DELETE FROM Comments WHERE comment_id = ${req.body[0]} AND user_id = ${req.body[1]}`
    }
    db.query(q.text)
    .then(() => {
        console.log("========== Comment Deleted ==========")
        //res.locals.message = "Task Complete";
        return next();
    })
    .catch(err => {
        return next({
            log: `err: delComments of commentController ${err}`,
            message: "Error deleting comment"
        });
    });
}

//==================================================

commentController.getComments = (req, res, next) => {
    let q = {
        text: `SELECT * FROM Comments`
    }

    db.query(q.text)
    .then(data => {
        console.log("========== getComments query complete ==========");
        res.locals.comments = data.rows;
        return next();
    })
    .catch(err => {
        return next({
            log: `err: getComments of commentController ${err}`,
            message: "Error retrieving comments"
        });
    });
}

commentController.getSnackComments = (req, res, next) => {
    let q = {
        text: `SELECT * FROM Comments WHERE snack_id = $1`,
        values: [req.body.snack_id]
    }

    db.query(q)
    .then(data => {
        console.log("========== getComments query complete ==========");
        res.locals.comments = data.rows;

        return next();
    })
    .catch(err => {
        return next({
            log: `err: getComments of commentController ${err}`,
            message: "Error retrieving comments"
        });
    });
}


//==================================================

module.exports = commentController;