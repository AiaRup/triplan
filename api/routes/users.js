const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/userModel');
const Plan = require('../models/planModel').plan;
var rp = require('request-promise');

/* Create a new User (register on okta). */
router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email,
    },
    credentials: {
      password: {
        value: req.body.password,
      },
    },
  };
  console.log('newUser', newUser);
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
        tempEvents: [],
      };

      User.create(newUserDB, (err, userResult) => {
        if (err) throw err;
        res.status(201).send(userResult);
      });
    })
    .catch(err => {
      console.log('error', err);

      res.status(400).send(err);
    });
});

// 1) to handle get user data on login and register
router.get('/users/:id', (req, res) => {
  const oktaID = req.params.id;

  User.find({ oktaID: oktaID }, (err, userResult) => {
    if (err) {
      console.log(err);
      res.send('an error has occured');
    }
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
    city: req.body.plan.city,
    notes: {
      good: [],
      bad: [],
      neutral: [],
    },
  };

  Plan.create(newPlan, (err, planResult) => {
    if (err) throw err;
    // update the user with the new trip plan
    User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { plans: planResult },
        tempPlaces: req.body.tempPlaces,
        tempEvents: req.body.tempEvents,
      },
      { new: true },
      (err, updateUser) => {
        if (err) throw err;
        console.log('newUser updated', updateUser);
        res.status(200).send(updateUser);
      }
    );
  });
});

// // 3) get a plan trip from DB
// router.get('/:idUser/myTrips/:planID', (req, res) => {
//   const idUser = req.params.idUser;
//   const planID = req.params.planID;

//   if (!ObjectID.isValid(req.params.idUser)) {
//     return res.status(400).send('Id not in the correct format');
//   }

//   User.findById(idUser, (err, userResult) => {

//     if (err) throw err;
//     const result = userResult.plans.filter((plan)=> plan._id === planID);
//     console.log('trip from mongo', result);
//     res.send(result);
//   });
// });

// 3) getting all my trips
// router.get('/users_trips/:user_id', (req, res) => {
//   let user_id = req.params.user_id;
//   console.log('param id is:');
//   console.log(user_id);

//   User.findById(user_id, (error, data) => {
//     if (error) throw error;
//     else {
//       console.log(data.plans);
//       res.send(data.plans);
//     }
//   });

// });

// enable CORS request to google - first fetch
router.get('/googlePlaces/:type/:lat/:lng', (req, res) => {
  rp(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      req.params.lat
    },${req.params.lng}&radius=2000&type=${
      req.params.type
    }&language=en&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`
  )
    .then(function(placesRes) {
      console.log('placesRes:', placesRes);
      res.send(placesRes);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// second fetch - get more info on the place found by the first request
router.get('/placeSearch/:placeID', (req, res) => {
  rp(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      req.params.placeID
    }&fields=name,rating,international_phone_number,formatted_address,price_level,website,permanently_closed,place_id,photo,geometry,opening_hours&language=en&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`
  )
    .then(function(placeRes) {
      console.log('one place result:', placeRes);
      res.send(placeRes);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// router.get('/googlePlaces/:type/:lat/:lng', (req, res) => {
//   request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=2000&type=${req.params.type}&language=en&key=AIzaSyAewucBzhp4DIePd6P0JHbpkQ4JtPzCShE`, function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
//   });
// });

// 4) to update notes of user's plan
router.post('/users/:idUser/:idPlan/notes', (req, res) => {
  const idUser = req.params.idUser;
  const idPlan = req.params.idPlan;

  // check mongo id validation
  if (!ObjectID.isValid(idUser) || !ObjectID.isValid(idPlan)) {
    return res.status(400).send('Id not in the correct format');
  }

  const newNotes = req.body.notes;
  console.log('note arrive to server', newNotes);

  // update Plan model on server
  Plan.findByIdAndUpdate(
    idPlan,
    { notes: newNotes },
    { new: true },
    (err, updatePlan) => {
      if (err) throw err;
      console.log('new plan updated', updatePlan);
    }
  );

  // update user plan notes on user model
  User.findOneAndUpdate(
    { _id: idUser, 'plans._id': idPlan },
    { $set: { 'plans.$.notes': newNotes } },
    { new: true },
    (error, data) => {
      // User.findByIdAndUpdate({ '_id': idUser, 'plans._id': idPlan }, { $set: { 'plans.$.notes': newNotes }}, (error, data) => {
      if (error) throw error;
      console.log('data plans on user new server ', data.plans);
      res.status(200).send(data.plans);
    }
  );
});

// 5) to handle delete a trip
router.delete('/users/:userId/myTrips/:tripId', (req, res) => {
  const userId = req.params.userId;
  const tripId = req.params.tripId;
  console.log('userId ', userId, 'tripId ', tripId);
  // delete the trip from the DB collection
  User.findByIdAndUpdate(
    userId,
    { $pull: { plans: { _id: tripId } } },
    { new: true },
    (err, updatedUser) => {
      if (err) throw err;
      res.status(200).send(updatedUser);
    }
  );
});

module.exports = router;
