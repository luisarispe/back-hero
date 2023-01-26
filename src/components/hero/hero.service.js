"use strict";
const axios = require("axios");
const model = require("./hero.model");
const apiUrl = 'https://gateway.marvel.com:443/v1/public/';
const apiKey='7d5654bf5d0c877974e0289c0500caad';
const hash='e3f183eddb4ae24bb27cb0fe455b4e30';
const ts='1';

const getAll= async (offset=0, nameStartsWith='') =>{

    const filtro=nameStartsWith? `&nameStartsWith=${nameStartsWith}`: '';
    const url = `${apiUrl}characters?apikey=${apiKey}&offset=${offset}${filtro}&hash=${hash}&ts=${ts}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
}

const getOne= async (id) =>{
  const url = `${apiUrl}characters?apikey=${apiKey}&id=${id}&hash=${hash}&ts=${ts}`;
  const response = await axios.get(url);
  return response;
}

const save=async (hero)=>{
    try {
      const datosDB = new model(hero);
      await datosDB.save();
      return datosDB;
    } catch (error) {
        throw error;
    }
}

const getOneGroup= async (id)=>{
  try {
    const hero=await model.findOne({id_hero:id});
    return hero;
  } catch (error) {
    throw error;
  }
}

const update= async (id, data)=>{
  try {
    await model.findByIdAndUpdate(id, data);
    const hero =await model.findById(id);
    return hero;
  } catch (error) {
    throw error;
  }
}


const deleteOne=async (id)=>{
  try {
    await model.deleteOne({ _id: id });
    return 'El grupo fue eliminado';
  } catch (error) {
    throw error;
  }
}

module.exports={save, getAll,getOneGroup, deleteOne, update,getOne};
