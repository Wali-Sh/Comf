const express = require('express')
const router = express.Router()
const Subscriber = require('../modles/subscribe')

/**
 * @swagger
 * definitions:
 *  Subscribers:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: Name of the subscriber
 *     example: 'Your Name'
 *    subscribedToChannel:
 *     type: string
 *     description: Channel to subscribe
 *     example: 'Name of channel'
 *   Subscriber_Assignment:
 *    type: object
 *    properties:
 *    subscriber_id:
 *     type: string
 *     description: Id of the subscriber
 *     example: '123_mongodb Id'
 *    
 */

// Getting all
/**
 * @swagger
 * /subscribers:
 *  get:
 *   summary: Gets All
 *   description: Gets all subscribers
 *   responses:
 *    '200':
 *     description: successfull
 *    '400':
 *     description: error
 *  
 */
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /subscribers/{subscriber_id}:
 *  get:
 *   summary: Get One
 *   description: Get one subscriber
 *   parameters:
 *    - in: path
 *      name: subscriber_id
 *      schema:
 *       type: string
 *      required: true
 *      description: Id of the subscriber
 *      example: 'moongobd_ID'
 *   responses:
 *    '200':
 *     description: successfull
 *    '404':
 *     description: not found
 */
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

/**
 * @swagger
 * /subscribers:
 *  post:
 *   summary: Create
 *   description: Create a new subscriber
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Subscribers'
 *   responses:
 *    '201':
 *     description: Subscriber created successfully
 *    '400':
 *     description: Subscriber failed to create
 * 
 */
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
/**
 * @swagger
 * /subscribers/{id}:
 *  patch:
 *   summary: update
 *   description: update a single subscriber
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: update a single subscriber
 *      example: 'moongobd_ID'
 *      schema:
 *       $ref: '#/definitions/Subscribers'
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Subscribers'
 *   responses:
 *    '200':
 *     description: successfull
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Subscribers'
 *     
 */
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One

/**
 * @swagger
 * /subscribers/{subscriber_id}:
 *  delete:
 *   summary: Delete
 *   description: Delete a subscriber by its
 *   parameters:
 *    - in: path
 *      name: subscriber_id
 *      schema:
 *       type: string
 *      required: true
 *      description: Delete a subscriber by its id
 *   responses:
 *    '200':
 *     description: subscriber deleted successfully
 */
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router