const addproducts = require('./prodModle')

exports.create = async (req, res) => {
    if (!req.body.email && !req.body.productName && !req.body.color && !req.body.company) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('/addproducts', { mydata: "Content can not be empty!" })
    }

    const product = new addproducts({
        productName: req.body.product,
        color: req.body.color,
        company: req.body.company
    });

    await product.save().then(data => {
        /*res.send({
            message:"User created successfully!!",
            user:data
        });*/
        res.render('/result', { mydata: "produts" + data.productName + " created succesfully!" })
    }).catch(err => {
        /*res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });*/
        res.render('results', { mydata: err.message || "Some error occurred while creating user" })
    });
};

exports.findAllPro = async (req, res) => {
    try {
        const product = await addproducts.find();
        res.status(200).render('/products', {mydata: user})
    } catch(error) {
        res.status(404).render('results', {mydata: error.message})
    }
};
exports.findOnePro = async (req, res) => {
    try {
        const user = await UserModel.findOnePro({email: req.query.productName}).exec(); //change params to query
        
    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).render('results', {mydata: error.message})
    }
};