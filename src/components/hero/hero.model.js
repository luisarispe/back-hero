// import mongoose, { Schema } from "mongoose";
const mongoose= require("mongoose");
const groupColorSchema= new mongoose.Schema({
    id_hero:{type:String, required:true},
    color:{type:String, required:true},
    color_code:{type:String, required: true}
});

const GroupColor = mongoose.model("group_color", groupColorSchema);
module.exports=GroupColor;
