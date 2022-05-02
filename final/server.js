if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
// will bring all enviroment requirements and set them inside process dotenv

const express = require('express');
const layouts = require('express-ejs-layouts');
const https = require('https');
const bodyParser = require('body-parser');
const {response} = require("express");
const cookiesPaser = require('cookie-parser');
const session  = require('express-session');
const mongodb = require('mongoose');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
const falsh = require('express-flash');
const initializePassport = require('./passportConfig');
const flash = require('express-flash');
initializePassport(
    passport,
    email => data.find(user => user.email === email),
    id => data.find(user => user.id === id )
)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: false}));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// database connection
mongodb.connect('mongodb+srv://Wali:Wali1078$@cluster0.xeeua.mongodb.net/comfy?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const mydb = mongodb.connection;
mydb.on('error', () => console.log('Error in connecting to Database'))
mydb.once('open',()=> console.log('connected'))

const port = process.env.PORT || 3000;


// all usages of express
app.use(express.static('final'));
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
app.get('/about',(req,res)=>{
    res.render('about.ejs');
})
app.get('/login',checkNotAuthenticated, checkNotAuthenticated,(req, res)=>{
    res.render('login.ejs');
})
app.post('/login', passport.authenticate('local',{
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}) )
app.get('/register',checkNotAuthenticated,(req, res)=>{
    res.render('register.ejs')
})
app.get('/index',(req,res)=>{
    res.render('index.ejs');
})
app.get('/ifram',(req,res)=>{
    res.render('ifram.ejs');
})
app.get('/profile',checkNotAuthenticated, (req,res)=>{
    res.render('profile.ejs',{name: req.body.name});
})
// all form validations and cookie validations
app.post('/register',checkNotAuthenticated, async (req, res)=>{     
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let email = req.body.email;
   let password = await bcrypt.hash(req.body.password, 10);
   let confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);

   var data = {
       "FirstName": firstName,
       "LastName": lastName,
       "Email": email,
       "password": password,
       "ConfrimPassword": confirmPassword
   }
   mydb.collection('users').insertOne(data, (err, collection)=>{
       if(err){
           throw err;
       }
      console.log("Database is connected")
   });
   return res.redirect('/login')
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
 
app.delete('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
       return res.redirect('/')
    }
    next()
}

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})
