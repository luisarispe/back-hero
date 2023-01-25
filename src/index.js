"use strict";
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");


const routes = require('./routes')

const app = express();

app.use(cors());

app.set('port',process.env.PORT ||4000);
app.use(express.urlencoded({ /* limit: "50mb", */ extended: true }));
app.use('/api', routes);
db();
app.listen(app.get('port'), (error) => {
  if (error) throw new Error(err)
  console.log('SV conectado en el puerto ' + app.get('port'))
  });