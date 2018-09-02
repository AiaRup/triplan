const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
// const ObjectID = require('mongodb').ObjectID;
const User = require('../models/userModel');
const Plan = require('../models/planModel').plan;

/* Create a new User (register). */
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
        tempEvents: []
      };

      User.create(newUserDB, (err, userResult) => {
        if (err) throw err;
        console.log(userResult);
        res.status(201).send(userResult);
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//saving the trip to the server
router.post('/users/:id/plantrip', (req, res) => {
  const newPlan = {
    name: 'planName',
    days: req.body,
    city: 'cityName'
  };

  const planInServer = Plan.create(newPlan, (err, planResult) => {
    if (err) throw err;
    return planResult
  })

  User.findByIdAndUpdate(req.params.id, { plans: planInServer }, { new: true }, (err, updateResult) => {
    if (err) throw err;
    res.status(200).send(updateResult)
  })
})


// 1) to handle get user data on login
router.get('/users/:id', (req, res) => {
  const oktaID = req.params.id;

  // User.find({ oktaID: oktaID }, (err, userResult) => {
  //   if (err) throw err;
  User.find({ oktaID: oktaID }, (err, userResult) => {
    if (err) {
      console.log(err);
      res.send("an error has occured");
    }
    console.log('user from mongo', userResult);
    res.send(userResult);
  });
});



//2) getting all my trips (carl)

router.get('/users_trips/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  console.log("param id is:");
  console.log(user_id);

  User.findById(user_id, (error, data) => {
    if (error) throw error;
    else {
      console.log(data.plans);
      res.send(data.plans)
    }
  })

})


module.exports = router;
