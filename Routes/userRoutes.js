const usercontroller = require('../controllers/usercontroller')

const express = require('express')

const Router = express.Router();

Router.post('/register',usercontroller.userSignup);
Router.post('/login',usercontroller.userLogin);


module.exports = Router;