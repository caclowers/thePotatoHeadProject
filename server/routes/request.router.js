const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const Request = require('../models/Request');
const verify = require('../modules/verify');
const {email, emailWithPreview} = require('../modules/email')

router.get('/', rejectUnauthenticated, async (req, res) => {
    try {

        let requests = await Request.find();
        res.send(requests);

    } catch (err) {

        res.send(err);

    }
});

router.post('/', async (req, res) => {
    try {
        const newRequest = req.body;
        newRequest.hospitalVerified = await verify(newRequest.hospitalName);
        await Request.create(newRequest);
        await email.send(
            {
            template: 'initialEmail',
            message: {
                to: req.body.nominatorEmail,
            },
            // these are variable that get insert to the template
            locals: {
                name: req.body.nominatorName,
            },
        })
        res.sendStatus(200);

    } catch (err) {

        res.status(400).json({ message: 'An unknown Error Occured' })

    }
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
    try {

        const { id } = req.params;
        let updatedRequest = await Request.findByIdAndUpdate(id, req.body, { new: true });
        res.send(updatedRequest);

    } catch (err) {
        res.send(err);
    }
})

router.put('/', (req, res) => {

    if (req.isAuthenticated) {
        //send email with tracking
        emailWithPreview.send({
            template: 'trackingEmail',
            message: {
                to: req.body.nominatorEmail
            },
            locals: {
                name: req.body.nominatorName,
                tracking: req.body.tracking,
                note: req.body.note
            },
        })
        .catch(err => {
          console.log('emailWithPreview error: ', err); 
          res.status(400).json(err);
        });

        // update Database
        Request.findByIdAndUpdate({
            _id: req.body._id
        }, {
                $set: {
                    tracking: req.body.tracking,
                    note: req.body.note
                }
            }).then(function (response) {
                res.sendStatus(200);
            }).catch((err) => {
                console.log('request error: ', err);                
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }

});

module.exports = router;