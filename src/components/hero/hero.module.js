"use strict";
const {getAll, save} = require("./hero.service");

exports.save= async (req,res)=>{
    try {
      const {id_hero,color,color_code}= req.body;

        const serviceResponse = await save({id_hero, color, color_code});
        return serviceResponse;
    } catch (error) {
        throw error;        
    }
}
exports.getAll= async (req, res) =>{
  try {
    const {offset, nameStartsWith}=req.query;
    const serviceResponse = await getAll(offset,nameStartsWith);
    const {results,...res}= serviceResponse.data.data;
    const heroes=[];
    results.forEach(hero => {
        heroes.push({
            id: hero.id,
            name: hero.name,
            description: hero.description,
            modified: hero.modified,
            thumbnail: hero.thumbnail,
            resourceURI: hero.resourceURI
        })
    });
    return {heroes,...res};
  } catch (error) {
    throw error;
  }
}


