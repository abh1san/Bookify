const express = require('express');

const cors = require('cors');

const { json } = require('express')

const app = express();

const jwt = require('jsonwebtoken')

app.listen(3000,()=>{
    console.log('listening on port 3000');
})

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200'
}))

const dataService = require('./services/dataService')


const appMiddleWare = (req, res, next) => {
    // console.log('application specific middleware');
    next();
}
app.use(appMiddleWare)

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        //verify the token -verify()
        // console.log('Router specific middleware');
        const data = jwt.verify(token, 'superkey2020')
        next();
    }
    catch {
        //422 -unprocessible entity(unable to process)
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: 'please login'
        })
    }
}

app.get('/all-books',(req,res)=>{
dataService.getAllBooks()
.then(result=>{
    res.status(result.statusCode).json(result)
})
})

app.post('/register', (req, res) => {
    console.log(req.body);
    dataService.register(req.body.acno, req.body.username, req.body.pass)
        .then(result => {
            res.status(result.statuscode).json(result)
        })
    // res.status(result.statuscode).json(result)
    // if (result) {
    //     res.send('Successfully registered');
    // } else {
    //     res.send('user registration failed');
    // }

})

app.post('/login', (req, res) => {
    console.log(req.body);
    dataService.login(req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})