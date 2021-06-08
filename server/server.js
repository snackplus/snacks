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
const userRouter = require("./routes/userRouter.ts");
const snackRouter = require("./routes/snackRouter.ts");

//** Serve Static Files and Root **//
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/index.html')));


//** Functionality Routes **//
app.use('/user', userRouter);
app.use('/snack', snackRouter);



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