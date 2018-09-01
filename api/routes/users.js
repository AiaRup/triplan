const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/userModel');
const Plan = require('../models/planModel').plan;

/* Create a new User (register on okta). */
router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient
    .createUser(newUser)
    .then(user => {
      // create the user on the mongo DB
      const newUserDB = {
        name: `${user.profile.firstName} ${user.profile.lastName}`,
        oktaID: user.id,
        email: user.profile.email,
        plans: [],
        tempPlaces: [],
        tempEvents: [] };

      User.create(newUserDB, (err, userResult) => {
        if (err) throw err;
        res.status(201).send(userResult);
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// 1) to handle get user data on login and register
router.get('/users/:id', (req, res) => {
  const oktaID = req.params.id;

  User.find({ oktaID : oktaID }, (err, userResult) => {
    if (err) throw err;
    console.log('user from mongo', userResult);
    res.send(userResult);
  });
});


// 2) to update user's plans and tempEvents and tempPlaces
router.post('/users/:id/plantrip', (req, res) => {
  // check mongo id validation
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('Id not in the correct format');
  }

  const newPlan = {
    name: req.body.plan.name,
    days: req.body.plan.days,
    city: req.body.plan.city
  };

  Plan.create(newPlan, (err, planResult) => {
    if (err) throw err;
    // update the user with the new trip plan
    User.findByIdAndUpdate(req.params.id, { $push: { plans: planResult }, tempPlaces: req.body.tempPlaces, tempEvents: req.body.tempEvents }, { new:true }, (err, updateUser) => {
      if (err) throw err;
      console.log('newUser updated', updateUser);
      res.status(200).send(updateUser);
    });
  });
});

module.exports = router;
