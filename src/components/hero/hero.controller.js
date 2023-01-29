"use strict";
const {getAll, save, getOne, update,deleteOne} = require("./hero.module");

exports.getAll= async (req, res,next)=>{

    try {
    const response = await getAll(req, res);
    return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send('Favor comunicarse con IT');
    }
}

exports.getOne= async(req,res, next)=>{
    try {
        const response = await getOne(req, res);
        return response;
    } catch (error) {
        return res.status(500).send('Favor comunicarse con IT');
    }
}

exports.save= async (req, res, next)=>{
    try {
        const response= await save(req,res);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send('Favor comunicarse con IT');
    }
}

exports.update= async (req, res, next)=>{
    try {
        const response= await update(req,res);
        return response;
    } catch (error) {
        return res.status(500).send('Favor comunicarse con IT');
    }
}

exports.deleteOne= async (req, res, next)=>{
    try {
        const response= await deleteOne(req,res, next);
        return response;
    } catch (error) {
        return res.status(500).send(error);
    }
}