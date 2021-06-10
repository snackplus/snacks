const db = require('../models/DatabaseModel');
const replyController = {}

//==================================================

replyController.addReply = (req, res, next) => {
    console.log("========== replyController addreply ==========");
    const user_id = res.locals.username
    const { comment_id, reply } = req.body;
    //comment being replied to
    // reply_id, comment_id, user_id, reply
    let q = {
        text: `INSERT INTO replylist VALUES (DEFAULT, $1, $2, $3)`,
        values: [ comment_id, user_id, reply ]
    }

    db.query(q)
    .then(() => {
        console.log("========== database updated with new reply ==========");
        return next()
    })
    .catch(err => {
        console.log("========== replyController.addReply error ==========")
        return next({
            log: `err: addreplys of replyController ${err}`,
            message: "Error adding reply"
        });
    })

}

//==================================================

replyController.delReply = (req, res, next) => {
    console.log("========== delreply replyController ==========")
    
    let q = {
        text: `DELETE FROM replylist r WHERE r.reply_id = ${req.body[0]} AND r.user_id=${req.body[1]}`,
    }
    db.query(q.text)
    .then(() => {
        console.log("========== reply Deleted ==========")
        //res.locals.message = "Task Complete";
        return next();
    })
    .catch(err => {
        return next({
            log: `err: delreplys of replyController ${err}`,
            message: "Error deleting reply"
        });
    });
}

//==================================================

replyController.getReplies = (req, res, next) => {
    console.log("req.body")
    console.log(req.body)

    let q = {
        text: `SELECT * FROM replylist WHERE comment_id = ${req.body.comment_id}`
    }

    db.query(q.text)
    .then(data => {
        console.log("========== getreplies query complete ==========");
        console.log(data.rows); 
        res.locals.reps = data.rows;
        return next();
    })
    .catch(err => {
        return next({
            log: `err: getreplies of replyController ${err}`,
            message: "Error retrieving replys"
        });
    });
}

//==================================================

module.exports = replyController;