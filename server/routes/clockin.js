const express = require('express');
const { clockIn } = require('../controllers/timesheetControllers.js');
const getDate = require('../middleware/getDate.js');

const router = express.Router();

// when a post request is sent to /clockin,
// router.post('/clockin', );

router.post('/', getDate, clockIn, (req, res) => {
  res.status(200).json(res.locals.entry);
});

module.exports = router;
