"use strict";
const axios = require("axios");
const model = require("./hero.model");
const apiUrl = 'https://gateway.marvel.com:443/v1/public/';
const apiKey='7d5654bf5d0c877974e0289c0500caad';
const hash='e3f183eddb4ae24bb27cb0fe455b4e30';
const ts='1';

exports.getAll= async (offset=0, nameStartsWith='') =>{

    const filtro=nameStartsWith? `&nameStartsWith=${nameStartsWith}`: '';
    const url = `${apiUrl}characters?apikey=${apiKey}&offset=${offset}${filtro}&hash=${hash}&ts=${ts}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
}

exports.save=async (hero)=>{
    try {
      console.log(hero)
      const datosDB = new model(hero);
      await datosDB.save();
      return datosDB;
    } catch (error) {
        throw error;
    }
}

exports.getOne=(id)=>{
  try {
    console.log(id);
  } catch (error) {
    throw error;
  }
}

exports.update=(id_hero,color,color_code)=>{
  try {
    console.log(id);
  } catch (error) {
    throw error;
  }
}
