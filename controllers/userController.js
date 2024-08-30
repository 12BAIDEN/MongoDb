import { DonationModel } from "../models/donations.js";
import { DonationTypeModel } from "../models/types.js";

/** Handle admin functions */
class UserController {
    // Upload donation types
    static uploadTypes = async (req, res) => {
        try {
            let type = req.body;
            if (!(type.name && type.id))
                return res.status(400).json({ "message": "not all fields given" });
            await new DonationTypeModel({ id: type.id, name: type.name }).save();
            return res.status(200).json({ "message": "saved" });
        } catch (err) {
            console.log(err);
            return res.status(501).json({ "message": "error" });
        }
    };

    // Upload donations
    static uploadDonations = async (req, res) => {
        try {
            let donation = req.body;
            if (!(donation.raised && donation.type && donation.case && donation.title && donation.goal && donation.imageUrl))
                return res.status(400).json({ "message": "not all fields given" });
            await new DonationModel({ ...donation }).save();
            return res.status(200).json({ "message": "saved" });
        } catch (err) {
            console.log(err);
            return res.status(501).json({ "message": "error" });
        }
    };

    // Get donation type and related donations
    static getDonationType = async (req, res) => {
        try {
            let typeId = req.params.id;
            let type = await DonationTypeModel.findOne({ id: typeId }).lean();
            if (!type)
                return res.status(400).json({ "message": "wrong type id" });
            let response = await DonationModel.find({ type: typeId }).lean();
            let output = [];
            for (const donation of response) {
                donation.typeName = type.name;
                output.push(donation);
            }
            return res.status(200).json(output);
        } catch (err) {
            console.log(err);
            return res.status(501).json({ "message": "error" });
        }
    };

    // Update a donation by title
    static updateDonationByTitle = async (req, res) => {
        try {
            const { title } = req.params;
            const update = req.body;

            if (!update)
                return res.status(400).json({ "message": "no update data provided" });

            const donation = await DonationModel.findOneAndUpdate({ title: title }, update, { new: true });
            if (!donation)
                return res.status(404).json({ "message": "donation not found" });

            return res.status(200).json({ "message": "donation updated", donation });
        } catch (err) {
            console.log(err);
            return res.status(501).json({ "message": "error" });
        }
    };

    // Delete a donation by title
    static deleteDonationByTitle = async (req, res) => {
        try {
            const { title } = req.params;
            const donation = await DonationModel.findOneAndDelete({ title: title });

            if (!donation)
                return res.status(404).json({ "message": "donation not found" });

            return res.status(200).json({ "message": "donation deleted" });
        } catch (err) {
            console.log(err);
            return res.status(501).json({ "message": "error" });
        }
    };
}

export { UserController };
