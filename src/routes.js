"use strict";
const heroRoute = require('./components/hero/hero.route')
const { Router } = require('express');

const router = Router();

router.use('/hero', heroRoute);

module.exports = router;