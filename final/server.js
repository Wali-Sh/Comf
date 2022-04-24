const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const request = require('request')
const {response} = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
const port = 3030;
app.use(express.static('final'))
app.use('/css', express.static(__dirname+ '/css'))
app.use('/css', express.static(__dirname+ '/css'))
app.use('/css', express.static(__dirname+ '/css'))
app.use('/img',express.static(__dirname+'/img'))
app.use('viewport,ejs')
app.get('/',(req, res )=>{
    res.sendFile(__dirname +'/index.ejs')
})
app.get('/products.ejs',(req,res)=>{
    res.sendFile(__dirname+'/products.ejs')
})
app.get('/about.ejs',(req,res)=>{
    res.sendFile(__dirname+'/about.ejs')
})
app.get('/login.ejs',(req,res)=>{
    res.sendFile(__dirname+'/login.ejs')
})
app.get('/index.ejs',(req,res)=>{
    res.sendFile(__dirname+'/index.ejs')
})
app.get('/ifram.ejs',(req,res)=>{
    res.sendFile(__dirname+'/ifram.ejs')
})
// Shows the weather inside a Frame
app.post('/weather',(req,res)=>{
    let city = req.body.city
    let apikey ="95b3072b309da131c84c68dab057dd56"
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&mode=json&units=metric"

    https.get(url, (response)=>{
        response.on('data',(d)=>{
            let json = JSON.parse(d)
            let temp = json.main.temp
            let condition  = json.weather[0].description
            let icon = json.weather[0].icon
            let humidity = json.main.humidity


            res.write("<h1>Today's weather in "+city+" is "+temp+"C<br>")
            res.write("<h4>Condition is <i>"+condition+"<br>")
            res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'> <br>" )
            res.write("<h4>Humidity is: "+humidity)
            res.send()
        })
    })
})

app.listen(port,()=>{
    console.log("Server is running on port: "+port)
})
