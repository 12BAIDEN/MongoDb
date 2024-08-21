import {model, Schema } from "mongoose";
const Donations = new Schema({
    goal:  {type:Number, required:true},
    raised: {type:Number, default:0},
    title: {type:String, required:true},
    case : {type:String, required:true},
    type : {type:String, required:true},
    imageUrl : {type:String, required:true}
})

//create a model
let DonationModel = model("Donations", Donations)
export {DonationModel}
