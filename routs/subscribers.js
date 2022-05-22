const express = require('express');
const router = express.Router();
const Subscriber = require('../modles/subscriber')

// Getting all 
router.get('/', async function (req, res){
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err){
        res.status(500).json({massage: err.massage})
    }

})
// Getting one 
router.get('/:id', getSubscriber,function (req, res){
    res.json(res.subscriber)
})
// Creating a new 
router.post('/',async function (req, res){
    const subscribers = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscribers.save()
        res.status(201).json(newSubscriber)
    } catch(err){
        res.status(400).json({ message: err.message})
    }
})
// Update a 
router.patch('/:id', getSubscriber, async function (req, res){
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})
// Delete a  
router.delete('/:id', getSubscriber, async function (req, res){
    try{
        await res.subscriber.remove()
        res.json({message: "Subscriber deleted successfully"})

    } catch(error){
        res.status(500).json({message: error.message});
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({message: 'Cannot find the subscriber'})
        }   
    } catch(err){
        res.status(500).json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}




module.exports = router