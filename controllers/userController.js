import { DonationModel } from "../models/donations.js"
import { DonationTypeModel } from "../models/types.js"


/** Handle admin funtions*/
class UserController {
    /**
     * upload Food Category
     * @param {Object} req : http request object
     * @param {Object} res : http response object
     */
    static uploadTypes = async (req, res) => {
        //get categories
        try {
        let type = req.body
        if(!(type.name && type.id))
            return res.status(400).json({"message" : "not all fields given"})
        await new DonationTypeModel({id:type.id, name:type.name}).save()
        return res.status(200).json({"message": "saved"}) 
        }catch(err) {
            console.log(err)
            return res.status(501).json({"message": "error"})
        }
    }

    static uploadDonations = async (req, res) => {
        //get categories
        try {
        let donation = req.body
        if(!(donation.raised && donation.type && donation.case && donation.title && donation.goal && donation.imageUrl))
            return res.status(400).json({"message" : "not all fields given"})
        await new DonationModel({...donation}).save()
        return res.status(200).json({"message": "saved"}) 
        }catch(err) {
            console.log(err)
            return res.status(501).json({"message": "error"})
        }
    }

    static getDonationType = async (req, res) => {
        try {
        let typeId = req.params.id
        let type = await DonationTypeModel.findOne({id:typeId}).lean()
        if(!type)
            return res.status(400).json({"message": "wrong type id"})
        let response = await DonationModel.find({type:typeId}).lean()
        let output = []
        for(const donation of response) {
            donation.typeName = type.name
            output.push(donation)
        }
        return res.status(200).json(output)
    }catch(err) {
        console.log(err)
        return res.status(501).json({"message": "error"})
    }
}

   

 }


export { UserController }
