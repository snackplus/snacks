//** Express Imports **//
const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
// Server port
const port = 3000;

//** Data Parsing **//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//** Route Imports **//
const userRouter = require("./server/routes/userRouter.js");
const snackRouter = require("./server/routes/snackRouter.js");
const commentRouter = require("./server/routes/commentRouter.js");

//** Serve Static Files and Root **//
app.use('/assets', express.static(path.resolve(__dirname, './assets')));
app.use('/build', express.static(path.resolve(__dirname, './build')));
app.get('/', (req, res) => {
  console.log('serving main file')
  // res.set('Content-Type', 'text/HTML;');
  return res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

//** Functionality Routes **//
app.use('/user', userRouter);
app.use('/snack', snackRouter);
app.use('/comment', commentRouter);


//homepage snacklist render
//('/', snackController.getSnacks)
//res.locals.snacks

//user adds a new snack
//('/addSnack', snackController.addSnack, snackController.getSnacks)

//admin deletes a snack
//('/delSnack', snackController.delSnack, snackController.getSnacks)

//==================================================

//user comments a rating on a snack
//('/rateSnack', commentController.addComment, snackController.updateRating)

//user deletes a comment 
//('/delComment', commentController.delComment, snackController.updateRating)

//==================================================

//user replies to a comment
//('/commentReply', replyController.addReply, replyController.getReplies)

//user deletes reply to a comment
//('/replyDel', replyController.delReply, replyController.getReplies)

//==================================================

//user opens comment list of a snack
//('/openComments', commentController.getComments)
//res.locals.comments

//user opens replies list of a comment
//('/openReplies', replyController.getReplies)
//res.locals.replies


//** No Route / 404 Handling **//
app.use('*', (req, res) => res.status(404).send('Not Found'));

//** Middleware Global Error Handling **//

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Unknown Express middleware error occured',
    status: 500,
    message: { error: 'Oops, something went wrong!' }
  };

  err = Object.assign(defaultError, err);

  console.log(err.log);
  return res.status(err.status).json(err.message);
});


//** Run Server **//
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})