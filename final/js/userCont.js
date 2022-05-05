const UserModel = require('./userModle')
const bcrypt = require('bcrypt')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const user = new userModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: await bcrypt.hash(req.body.password,10),
        confirmPassword: await bcrypt.hash(req.body.confirmPassword, 10)
    });
    await user.save().then(data => {
        res.redirect('/login')
    }).catch(err => {
        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
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