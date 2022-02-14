// Login routes

const express = require('express');
const router  = express.Router();

// COOKIE IMPLEMENTATION TO COME

// const app = express();
// const cookieSession = require('cookie-session');

// app.use(cookieSession({
//   name: 'session',
//   keys: ['X0BYyKPSFH', '9Rl8A5NesE'],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }));


// TO TEST FOR NOW MANUALLY ADD USER TO DB AND USE:
// $ curl -X POST -d 'email=test@test.com' http://localhost:8080/login

module.exports = (db) => {
  router.post("/", (req, res) => {
    const email = req.body.email;
    db.query(`SELECT email FROM users;`)
      .then(data => {
        const users = data.rows[0];
        for (let userID of Object.values(users)) {
          if (userID === email) {
            console.log("EMAIL FOUND");
          } else {
          return res.status(403).send("Email not found");
          }
        }
        res.json(console.log('user logged in?', email, data.rows[0].email));
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
 return router;
};

