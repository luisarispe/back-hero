"use strict";
const {getAll, save} = require("./hero.module");

exports.getAll= async (req, res,next)=>{

    try {
    const response = await getAll(req, res);
    return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send('Favor comunicarse con IT');
    }
}

exports.save= async (req, res, next)=>{
    try {
        const response= await save(req,res);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Favor comunicarse con IT');
    }
}