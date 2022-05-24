const express = require('express')
const router = express.Router()
const Subscriber = require('../modles/subscribe')

// Getting all
/**
 * @swagger
 * tags:
 *  name: All
 *  description: get all subscribers
 * /subscribers:
 *  get:
 *    tags:
 *      All
 *    responses:
 *      '200':
 *        description: successful
 *      '400': 
 *        description: unsuccessful 
 */
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
/**
 * @swagger
 * /subscribers/{:id}:
 *  get:
 *    tags:
 *     All:
 *    parameters:
 *       - name: subscriber
 *         in: query
 *         schema:
 *            type: string     
 *    responses:
 *      '200':
 *        description: successful
 *      '400': 
 *        description: unsuccessful 
 */
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
/**
 * @swagger
 * /subscribers/{:id}:
 *  post:
 *    tags:
 *     All:
 *    parameters:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                   name: 
 *                      type: string
 *                   subscribedToChannel: 
 *                      type: string     
 *    responses:
 *      '200':
 *        description: successful
 *      '400': 
 *        description: unsuccessful 
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