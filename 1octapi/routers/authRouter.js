var express = require('express')
var router = express.Router()
const Authcontroller = require ('../controllers/Authcontroller')
const upload = require('../index')


router.post('/upload',Authcontroller.addProduct)
module.exports = router