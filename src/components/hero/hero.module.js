"use strict";
const {getAll, save, getOneGroup, update, getOne, deleteOne} = require("./hero.service");

exports.save= async (req,res)=>{

    const {id_hero,color,color_code}= req.body;
    try {

    const existeHero= await getOneGroup(id_hero);
    
    if(existeHero){
      const serviceResponse= await update(existeHero._id, {id_hero, color, color_code});
      return serviceResponse;
    }else{
       const serviceResponse = await save({id_hero, color, color_code});
       return serviceResponse;
    }

    } catch (error) {
        throw error;        
    }
}


exports.update= async (req,res)=>{

  const {id_hero,color,color_code}= req.body;
  const {id}=req.query;
  if(!id) return res.status(400).send('No existe el parametro id');

  try {
    const existe=await getOneGroup(id_hero);
    if(!existe) return res.status(400).send('No existe el heroe');

    const serviceResponse= await update(id, {id_hero, color, color_code});
    return res.status(200).send(serviceResponse);;
  } catch (error) {
      throw error;        
  }
}

exports.getOne= async(req, res)=>{
    try {
      const {id}=req.query;
      if(!id) return res.status(400).send('No existe el parametro id');

      const serviceResponse = await getOne(id);
      const {results}= serviceResponse.data.data;
      const teamColor=await getOneGroup(results[0].id);

      const heroe={
        id: results[0].id,
        name: results[0].name,
        description: results[0].description,
        modified: results[0].modified,
        thumbnail: results[0].thumbnail,
        resourceURI: results[0].resourceURI,
        teamColor
      }
      return res.status(200).send(heroe);;
    } catch (error) {
      
      if(error.response.status) return res.status(400).send('No existe heroe');
      throw error;
    }
}

exports.getAll= async (req, res) =>{
  try {
    const {offset, nameStartsWith}=req.query;
    const serviceResponse = await getAll(offset,nameStartsWith);
    const {results,...res}= serviceResponse.data.data;
    const heroes=[];

    for (const hero of results) {
         
        heroes.push({
          id: hero.id,
          name: hero.name,
          description: hero.description,
          modified: hero.modified,
          thumbnail: hero.thumbnail,
          resourceURI: hero.resourceURI,
          teamColor:await getOneGroup(hero.id)
      });
    }
    return {heroes,...res};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

exports.deleteOne= async (req,res, next)=>{

  const {id}=req.query;
  if(!id) return res.status(400).send('No existe el parametro id');
  
  try {
    const serviceResponse= await deleteOne(id);
    return res.status(200).send(serviceResponse);
  } catch (error) {
      throw error;        
  }
}


