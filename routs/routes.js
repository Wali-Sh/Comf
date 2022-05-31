const UserModel = require('../modles/userModle')
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
// Create and Save a new user
const { registerValidation, loginValidation } = require('../controlers/validation');

router.post("/register", async (req, res) => {

    //validate user inputs (name, email, password)
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    //check if email is already registeret
    const emailExist = await UserModel.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);

    //create user o bject and save it in Mongo (via try-catch)
    const user = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password,
        confirmPassword,
    });


    user.save(function (err) {
        if (err) {
            res.status(400).json({ err });
        } else {
            const name = user.fullName;
            res.render('index.ejs', { fullName: name })
        }
    })


});

router.post("/login", async (req, res) => {

    //validate user login info
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const User = UserModel.findOne({ email: req.body.email })
    //if login info is valid find the user
    UserModel.findOne({ email: req.body.email }, async function (err, user) {

        //throw error if email is wrong - user does not exist in DB
        if (err) {
            return res.status(400).json({ err: "Email is wrong" });
        }
        else {
            if (user) {
                const name = user.fullName;
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if (validPassword === true) {
                    res.render('index.ejs', { fullName: name })
                }
                //throw error if password is wrong
                if (!validPassword) {
                    return res.status(400).json({ err: "Password is wrong" })
                }
            }
        }
    })
    //create authentication token with username and id

    const token = jwt.sign
        (
            //payload data
            {
                name: User.name,
                id: User._id
            },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );

})

module.exports = router;
