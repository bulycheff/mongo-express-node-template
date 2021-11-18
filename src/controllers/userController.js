const { User } = require('../models')

module.exports = {

  create: async (req, res) => {
    try {
      console.log(req.body)

      const user = await User.create(req.body)
      res.status(200).json({ success: true, user })

    } catch (e) {
      console.log(e.message)
    }

  },

  getAll: async (req, res) => {
    try {

      const users = await User.find()
      res.status(200).json({ success: true, users })

      res.status(200).json('Hello from GET ALL')
    } catch (e) {
      console.log(e.message)
    }

  },

  getById: async (req, res) => {
    try {

    } catch (e) {
      console.log(e.message)
    }

  },
}