const express = require('express');
const morgan = require('morgan');
const lapyroute = require('./routes/lapyroutes');
const outerroute = require('./routes/outerroutes');
const methodOverride = require('method-override');


const app = express();


let port = 3000;
let host ='localhost';
app.set('view engine','ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use("/", outerroute);

app.use("/trades", lapyroute);

app.use((req, res, next) =>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error:err});
});


app.listen(port, host, ()=>{
    console.log('server is running on port',port);
})