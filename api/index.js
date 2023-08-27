const Express = require("express");
var cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();
const app = Express();


// IMPORT ROUTERS
let routersBlog = require("./routers-blog");
let routersWord = require("./routers-words");
let routersMain = require("./routers-main");
let routersExercise = require("./routers-exercise");

app.use(cookieParser());
let hour4ses = 3600000
app.use(session({
  secret: '45WNUX7J51L!54N',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: hour4ses/2 }
}));


app.use('/', routersMain);
app.use('/words', routersWord);
app.use('/blog', routersBlog);
app.use('/exercise', routersExercise);

app.use('/panel/words', require('./panel/routers-words'));
app.use('/panel/taxonomy', require('./panel/routers-taxonomies'));
app.use('/panel', require('./panel/routers-panel'));

module.exports = {
  path: "/api",
  handler: app
}
