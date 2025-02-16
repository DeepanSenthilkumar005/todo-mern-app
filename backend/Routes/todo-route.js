const express = require('express');
const { addmsg, findmsg, delmsg } = require('../Controllers/TodoControl');
const router = express.Router();

router.post('/todo',addmsg);
router.get('/todo',findmsg);
router.delete('/todo/:id',delmsg);

module.exports = router;