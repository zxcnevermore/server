const Router = require('express')
const Order = require('../models/orders')
const { check, validationResult } = require('express-validator')


const router = new Router()



router.get('/', (req, res) => {
  res.send({ message: 'server start' })
})


router.post('/orders',
  [
    check('name', "Поле не может быть пустым").isLength({ min: 3, max: 30 }),
    check('nomer', "Поле не может быть пустым").isLength({ min: 1, max: 11 })
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors })
      }

      const { name, nomer } = req.body

      const order = new Order({ name, nomer })
      await order.save()
      return res.json({ message: "Заявка отправлена" })

    } catch (error) {
      console.log(error)
      res.send({ mssage: "Server error" })
    }
  })


router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders)
  } catch (error) {
    res.json({ message: error })
  }
})


module.exports = router
