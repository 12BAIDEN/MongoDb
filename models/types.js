import { model, Schema } from "mongoose";
const DonationType = new Schema({
    name:{type: String, required:true},
    id:{type:String, required:true},
})

//create a model
let DonationTypeModel = model("DonationType", DonationType)
export { DonationTypeModel };

