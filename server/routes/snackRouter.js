//** Requiring in express.Router**//
const expressUser = require('express');
const snackRouter = expressUser.Router();

//** Path to file controllers**//
const snackController = require("../controllers/snackController.js");
const commentController = require("../controllers/commentController.js");
const cookieController = require("../controllers/cookieController.js");

snackRouter.get('/', snackController.getSnacks, (req, res) => {
    console.log(`res.locals.snacks: `);
    console.log(res.locals.snacks);
    res.status(200).json(res.locals.snacks);
});

snackRouter.post('/add', snackController.addSnack, snackController.getSnacks, (req, res) => {
    res.status(200).json(res.locals.snacks);
});

snackRouter.post('/del', snackController.delSnack, snackController.getSnacks, (req, res) => {
    res.status(200).json(res.locals.snacks);
});

snackRouter.get('/rate', commentController.addComment, snackController.updateRating, (req, res) => {
    res.status(200);
});

snackRouter.post('/snackComment', commentController.getSnackComments, (req, res) => {
    res.status(200).json(res.locals.comments);
});

snackRouter.post('/addSnackComment',
    cookieController.getUserFromSSID,
    commentController.addComment,
    snackController.updateRating,
    commentController.getSnackComments, (req, res) => {
        res.status(200).json(res.locals.comments);
    });

snackRouter.post('/search', snackController.snackSearch, (req, res) => {
    res.status(200).json(res.locals.snacks);
});

module.exports = snackRouter;