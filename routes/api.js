const express = require('express');
const router = express.Router();
const fs = require('fs');
const key = "ramdev is the bomb!";
const jsonPath = __dirname + '/../events.json';

/**
 * POST: /api/events
 *
 * Update the events object to be used on `upcoming-events`
 *
 * EXPECTS: {key, events: [{title, description, imgUrl}]}
 *
 * RESPONDS: Code 200 if all OK,
 *        401 if invalid key
 */
router.post('/events', (req, res) => {
  if (req.body.key !== key) {
    return res.sendStatus(401);
  }
  let newEvents = {events: req.body.events};
  fs.writeFile(jsonPath, JSON.stringify(newEvents), (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


/**
 * GET: /api/events
 *
 * Get the current events
 *
 * EXPECTS: Nothing
 *
 * RESPONDS: {events: [{title, description, imgUrl}]}
 */
router.get('/events', (req, res) => {
  fs.readFile(jsonPath, (err, data) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json(JSON.parse(data));
  })
});

module.exports = router;
