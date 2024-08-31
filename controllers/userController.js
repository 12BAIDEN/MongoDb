import { DonationModel } from "../models/donations.js"
import { NonMoneyDonationModel } from "../models/notMoneyDonations.js"
import { DonationTypeModel } from "../models/types.js"
import { UserModel } from "../models/users.js"


/** Handle admin funtions*/
class UserController {
    /**
     * upload Food Category
     * @param {Object} req : http request object
     * @param {Object} res : http response object
     */
    static adminRegister = async(req, res) => {
        let details = req.body
        if(!(details.email && details.password && details.name)) 
            return res.status(400).json({"message": "not all fields given"})
        let user = await new UserModel(details).save()
        return res.status(200).json({"message": "admin saved"})
    }

    static adminLogin = async(req, res) => {
        let details = req.body
        if(!(details.email && details.password)) 
            return res.status(400).json({"message": "not all fields given"})
        let user = await  UserModel.findOne({"email": details.email})
        if(!user)
            return res.status(400).json({"message":"user not registered"})
        if(user.password !== details.password)
            return res.status(400).json({"message": "wrong password"})
        return res.status(200).json({"message": "login success", user})
    }

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

    static nonMoney = async(req, res) => {
        let details = req.body
        if(!(details.name && details.location && details.itemType && details.deliveryDate)) 
            return res.status(400).json({"message": "not all fields given"})
        await new NonMoneyDonationModel(details).save()
        return res.status(200).json({"message": "saved"})
    }

    static getAllNonMoney = async(req, res) => {
        let details = req.body
        let response = await NonMoneyDonationModel.find().lean()
        return res.status(200).json(response)
    } 
    
    static deleteDonation = async(req, res) => {
        try {
            const title = req.body.title;
            if (!title) {
                return res.status(400).json({ message: "Title of donation is required" });
            }
    
            const response = await DonationModel.deleteOne({ title });
            if (response.deletedCount === 0) {
                return res.status(404).json({ message: "Donation not found" });
            }
    
            return res.status(200).json({ message: "Donation deleted successfully" });
        } catch (err) {
            console.error('Error deleting donation:', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static updateDonation = async(req, res) => {
        try {
        let title = req.body.title
        if(!title)
            return res.status(400).json({message: "title of donation is required"})
        let response = await DonationModel.findOne({title})
        if(!response) 
            return res.status(400).json({message: "no donation entry found"})
        for (const key of req.body) {
            response[key] = req.body[key]
        }
        await response.save()
    }catch(err) {
        console.log(err)
        return res.status(500).json({"message": "not found"})
    }
    } 

 }


export { UserController }
