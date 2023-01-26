"use strict";
const { Router } = require('express');
const router = Router();

const heroController = require('./hero.controller');
const validationSchema = require("./hero.validationSchema");
const getValidarSchema = require("../../utils/validateSchema.util");

const validarSchema = getValidarSchema(validationSchema);

router.get('', heroController.getAll);
router.get('/getOne', heroController.getOne);
router.post('',validarSchema, heroController.save);
router.put('',validarSchema, heroController.update);
router.delete('',heroController.deleteOne);



module.exports = router;