const Router = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = new Router();

router.post('/registration', 
[
  check('email', 'Incorect email').isEmail(),
  check('password', 'Password must be longer than 3 and shorten that 12').isLength({min: 3, max: 12})
],
async (req, res) => {
    try {
        const {email, password} = req.body; 
        
        candidate = User.findOne({email});

        if(candidate) {
            return res.status(400).json({message: 'User with email: ${email} already exist'});
        }
        
        const hashPassword = bcrypt.hash(password, 15);
        const user = new User({email, password}); 

        user.save();

        return res.json({message: 'User was created'});

    } catch (e) {
        console.log(e);
        res.sent({message: 'Server error'});
    }
}

);