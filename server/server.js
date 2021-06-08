const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');


const port = 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());


app.use('/assets', express.static(path.join(__dirname, './assets')));

app.get('/', (req, res) => {
  console.log('serving root');
  res.sendFile(path.resolve(__dirname + '/index.html'))
})

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



//unhandled endpoints
app.use('*', (req, res) => {
  return res.status(404).send('Not Found');
});
//Global Error Handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Unknown Express middleware error occured',
    status: 500,
    message: {error: 'Oops, something went wrong!'}
  };

  err = Object.assign(defaultError, err);

  console.log(err.log);//this gets logged in the server
  return res.status(err.status).json(err.message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})