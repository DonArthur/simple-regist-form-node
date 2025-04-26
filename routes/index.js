const express = require('express')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const Registration = mongoose.model('Registration')

// req = objects full of data or params
// res = objects full of methods for user
// next = if not want to send data back or pass the req off for something else
router.get('/', (req, res) => {
    res.render('form', { title: 'Registration Form' })
})

router.post('/',
    [
        body('name').trim().isLength({ min: 1 }).withMessage('Please enter a name'),
        body('email').trim().isLength({ min: 1 }).withMessage('Please enter an email'),
    ],
    (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const registration = new Registration(req.body)
        registration.save().then(() => {
            res.send('Data submitted')
        }).catch(() => {
            res.send('Sorry, something went wrong')
        })
    } else {
        res.render('form', {
            title: 'Registration Form',
            errors: errors.array(),
            data: req.body,
        })
    }
})

router.get('/registrations', (req, res) => {
    Registration.find()
        .then((reg) => {
            res.render('index', { title: 'Registrations', reg })
        })
        .catch(() => {  res.send('Sorry, something went wrong') })
})

module.exports = router