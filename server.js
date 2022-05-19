if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
// will bring all enviroment requirements and set them inside process dotenv
const express = require('express');
const layouts = require('express-ejs-layouts');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const {response} = require("express");
const cookiesPaser = require('cookie-parser');
const session  = require('express-session');
const mongodb = require('mongoose');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
const {login, register} = require('./controlers/userCont')
const routs = require('./routs/routes');
const flash = require('express-flash');
const { rmSync } = require('fs');
const request = require('request')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: false}));
/*
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))
*/

// database connection
mongodb.connect('mongodb+srv://Wali:Wali1078$@cluster0.xeeua.mongodb.net/comfy?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const mydb = mongodb.connection;
mydb.on('error', () => console.log('Error in connecting to Database'))
mydb.once('open',()=> console.log('Database is connected!!'))

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


// all usages of express
app.use(express.static('public'));
app.use('/css', express.static(__dirname+ '/css'));
app.use('/css', express.static(__dirname+ '/css'));
app.use('/css', express.static(__dirname+ '/css'));
app.use('/img',express.static(__dirname+'/img'));
app.use('/js', express.static(__dirname+ '/js'));
app.set('view-engine', 'ejs');
app.use(cookiesPaser());
// all routes
app.get('/', (req, res )=>{
    res.render('index.ejs');
})
app.get('/products', (req, res)=>{
    res.render('products.ejs');
})
app.get('/single-product', (req, res)=>{
    res.render('single-product.ejs');
})
app.post('/products', (req, res)=>{
    const search = req.body.search;
    switch(search){
        case "sofa": res.redirect('/LeatherSofa');break;
        case "about": res.redirect('/about'); break;
        case "home": res.redirect('/index'); break;

        default:break;
    }

})

app.get('/about',(req,res)=>{
    res.render('about.ejs');
})
app.get('/login',(req, res)=>{
    res.render('login.ejs');
})
app.post('/login',async (req, res) =>{ 
   login(req, res)
})

app.get('/index',(req,res)=>{
    res.render('index.ejs');
})
app.get('/ifram',(req,res)=>{
    res.render('ifram.ejs');
})
app.get('/profile', (req,res)=>{

    res.render('profile.ejs');
})
// all form validations and cookie validations
app.post('/register', async (req, res)=>{  
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if(password === confirmPassword){
        register(req, res)
    }
    else{
        res.send("please enter the same password")
    }

})

app.post('/checkout', function(req, res) {
    res.render('form.ejs');
})

app.post('/paymentMethod', function(req, res){
    sofaColor= req.body.color,
     deskColor= req.body.deskcolor,
     firstName=req.body.firstName,
     lastName= req.body.lastName,
     username= req.body.username,
     emale= req.body.email,
     address= req.body.address,
     phone= req.body.phone,
     country= req.body.region,
     city= req.body.city,
     zipCode= req.body.zip,
     saveInfo= req.body.saveInfo,
     callInfo= req.body.callInfo,
     leaveInfo= req.body.leaveInfo,
     info= req.body.info,
     visa=req.body.visa,
     masterCard= req.body.masterCard,
     paypal= req.body.paypal,
     formControl= req.body.formControl,
     ccNumber= req.body.ccNumber,
     ccExpiration= req.body.ccExpiration,
     cvv= req.body.cvv,
    res.render('confirmation.ejs', 
    {
     sofaColor: sofaColor,
     deskColor:deskColor,
     firstName:firstName,
     lastName:lastName,
     username:username,
     emale: emale,
     address:address,
     phone:phone,
     country:country,
     city:city,
     zipCode: zipCode,
     saveInfo:saveInfo,
     callInfo:callInfo,
     leaveInfo: leaveInfo,
     info:info,
     visa:visa,
     masterCard: masterCard,
     paypal:paypal,
     formControl: formControl,
     ccNumber: ccNumber,
     ccExpiration:ccExpiration,
     cvv: cvv,
    });
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

app.post('/curency', (req, res) => {
    let curencies = req.body.curency
    let apiKey = "d1bb088754717d83e0298584195902fe"
    let url = "http://api.currencylayer.com/live?access_key="+apiKey+"&currencies="+curencies+"&source=USD&format=json"

    http.get(url, ( response) => {
        response.on('data', (chunk) => {
            let json = JSON.parse(chunk);
            let result = json.quotes
            console.log(req.body)
            res.send(result)
        })
    })
})

app.post('/checkCard', (req, res) => {
    const cardNumber = req.body.cardNumber;
    const apiKey = "473bd83fa1778ab52448aefb9c0aeaf1441bff31"
    const url = "https://api.bintable.com/v1/"+cardNumber+"?api_key="+apiKey+""

    https.get(url, (response) => {
        response.on('data', (data) => {
            let json = JSON.parse(data)
            let cardType= json.data.card.scheme;
            let countryName = json.data.country.name;
            let flag = json.data.country.flag;
            let bankName = json.data.bank.name;
            let currency = json.data.country.currency;

            res.write("<h3>card type is: "+cardType+"<br/>");
            res.write("<h3>Country: "+countryName+"<br/>");
            res.write("<h3>Country flag: "+flag+"<br/>");
            res.write("<h3>Bank Name: "+bankName+"<br/>");
            res.write("<h3>Country currency: "+currency+"<br/>");
            res.send()
        })
    })
})

app.delete('/logout', (req, res) =>{
    req.logout()
    res.redirect('/login')
})


app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})
