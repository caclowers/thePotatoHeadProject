const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const Request = require('../models/Request');
const verify = require('../modules/verify');
const {email, emailWithPreview, adminEmail} = require('../modules/email');

const theboss = "thepotatoheadproject@gmail.com";

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
        console.log('<><><><>req.body', req.body);
        
        newRequest.hospitalVerified = await verify(newRequest.hospitalName);
        await Request.create(newRequest);
        // send email to requestor
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
            });
        
        
          // send email to admin
          await adminEmail.send(
          {
            template: 'initialAdmin',
            message: {
              to: theboss,
            },
          // these are variable that get insert to the template
            locals: { 
              gender: req.body.baby[0].gender,
              lastName: req.body.baby[0].lastName,
              firstName: req.body.baby[0].firstName,
              birthDate: req.body.baby[0].birthDate,
              weightOunces: req.body.baby[0].weightOunces,
              weightPounds: req.body.baby[0].weightPounds,
              gestationDays: req.body.baby[0].gestationDays,
              gestationWeeks: req.body.baby[0].gestationWeeks,
              nominatorName: req.body.nominatorName,
              nominatorEmail: req.body.nominatorEmail,
              parentName: req.body.parentName,
              parentEmail: req.body.parentEmail,
              personalNote: req.body.personalNote,
              streetAddress: req.body.streetAddress,
              streetAddress2: req.body.streetAddress2,
              floorNumber: req.body.floorNumber,
              roomNumber: req.body.roomNumber,
              city: req.body.city,
              state: req.body.state,
              postalcode: req.body.postalcode,
              country: req.body.country,
              hospitalName: req.body.hospitalName
            },
          });
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
      console.log('req.body', req.body);
      
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