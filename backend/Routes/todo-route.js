const express = require('express');
const { addmsg, findmsg } = require('../Controllers/TodoControl');
const router = express.Router();

router.post('/todo',addmsg);
router.get('/todo',findmsg);

module.exports = router;