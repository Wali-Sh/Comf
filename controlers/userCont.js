const UserModel = require('../modles/userModle')
const bcrypt = require('bcrypt')
const {hash} = require("bcrypt");
// Create and Save a new user
exports.register = async (req, res) => {
    //level 4
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const newUser = new UserModel({
            email: req.body.email,
            firstName: req.body.fullName,
            password:hash,
            confirmPassword: hash
            
        });
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.redirect('/register')
            } else {
                res.render("index.ejs");
            }
        });
    })
    //
};
    exports.login = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        //const password = req.body.password;
        //level 3
        //const password = md5(req.body.password);
        //
    
        UserModel.findOne({email: email}, function(err, foundUser){
            if (err) {
                res.redirect("/login")
            } else {
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, function(err, result) {
                        if(result===true) {
                            res.render("index.ejs");
                        }
                    });
                    /*if (foundUser.password === password) {
                        res.render("secrets");
                    }*/
                }
            }
        })
    }
/* by id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        res.status(200).render('results', {mydata: "user :"+ user.firstName +" "
                + user.lastName +" "+ user.email +" "+ user.phone
        })
    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).render('results', {mydata: error.message})
    }
};
*/
