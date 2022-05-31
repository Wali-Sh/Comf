const feedBackModel = require('../modles/feedBackModel')
const router = require('express').Router();

router.post("/feedBackForm",  function (req, res){

    const userFeedBack = new feedBackModel({
        name: req.body.name,
        email: req.body.email,
        experience: req.body.experience,
        massage: req.body.comments,
    })
    userFeedBack.save(function (err){
        if (err) {
            res.status(424).json({message: err.message});
        }
        else{
            res.status(200).json({message: "your massage has been successfully submitted."});
        }
    })
})

module.exports = router;

