const express = require('express')
const cors =    require('cors') 
const rateLimit = require('express-rate-limit')
// import fetch from "node-fetch";
// const fetch = require('node-fetch')
// import fetch from 'node-fetch'
// globalThis.fetch = fetch
const bodyParser = require('body-parser')


const request = require('request')
require('dotenv').config()


const PORT = process.env.PORT || 5000

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs');

// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 300  
})
app.use(limiter)
app.set('trust proxy',1)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//enable cors
app.use(cors())

// set static folder
// app.use(express.static('public'))

//Routes
// app.use('/api',require('./routes'))

app.post("/api",(req,res) => {
    // const {city} = res.main.temp;
    var c =  req.body.city
    // var c = req.params.id;
    // res.send('hehe')
    // res.send(`${c}`)
    // console.log(c)
    request({
        url : 'http://api.openweathermap.org/data/2.5/weather?q='+c+'&appid=af037f27b4bca71e8a0e076c37c8c6b0',
        json : true,
    }, (err,response,body) => {
        console.log(body);
        var result=JSON.stringify((body.main.temp -273.15));; 
        result=Number(result).toPrecision(2);
        console.log('The weather in '+c+' is: '+(result));
        res.render('result',{result,c})
    }); 
    
})

app.get('/test', (req,res) =>{
    res.send('love')
})

app.listen(PORT, () => console.log(`server running on PORT:${PORT}`))

app.get('/',(req,res) =>{
    // res.send('hehe')
    var result=' ' 
    var c=' ' 
    res.render('index',{result,c})
    
})

// request({
//     url : 'http://api.openweathermap.org/data/2.5/weather?q='+c+'&appid=af037f27b4bca71e8a0e076c37c8c6b0',
//     json : true,
// }, (err,response,body) => {
//     console.log(body);
// }); 