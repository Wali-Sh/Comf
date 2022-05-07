const UserModel = require('./userModle')
const bcrypt = require('bcrypt')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.password) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.fullName,
        password: await bcrypt.hash(req.body.password,10),
        confirmPassword: await bcrypt.hash(req.body.confirmPassword, 10)
    });
        await user.save().then(data => {
            res.redirect('/login')
        })
        .catch(err => {
            res.render('/register', {mydata: err.message || "Some error occurred while creating user"})
        });
    }
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec(); 
        const password = await UserModel.findOne({password: req.query.password}).exec();
        res.redirect('/index');
    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).redirect('/login', {mydata: error.message})
    }
};
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
