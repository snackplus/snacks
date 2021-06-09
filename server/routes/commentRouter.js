//** Requiring in express.Router**//
const expressUser = require('express');
const commentRouter = expressUser.Router();

//** Path to file controllers**//
// // user deletes a comment 
// ('/delComment', commentController.delComment, snackController.updateRating)

// // ==================================================

// // user replies to a comment
// ('/commentReply', replyController.addReply, replyController.getReplies)

// // user deletes reply to a comment
// ('/replyDel', replyController.delReply, replyController.getReplies)

// ==================================================

// // user opens comment list of a snack
// ('/openComments', commentController.getComments)
// res.locals.comments

// // user opens replies list of a comment
// ('/openReplies', replyController.getReplies)
// res.locals.replies

module.exports = commentRouter;