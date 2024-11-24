const Joi = require("joi");

const { Bill } = require("./schema");
const { cloudinary } = require("../../utils/config/cloudinary-config");
require("dotenv").config().parsed




const addBill = async (req, res) => {
    try {
        const body = req.body;

        // console.log(body, req.files)
        const validationSchema = Joi.object({
            billNo: Joi.string().required(),
            billingDate: Joi.date().required(),
            amount: Joi.number().required(),
        })
        const payload = validationSchema.validate(body);

        const billImage = await cloudinary.uploader.upload(req.file.path, {
            folder: process.env.IMAGE_UPLOAD_FOLDER
        });
        await Bill.create({
            ...payload.value,
            billImage: billImage.secure_url
        })
        res.status(201).json({
            message: "Bill Created Successfully!!!"
        })
        return;
    } catch (error) {
        console.log(error)
    }
}

const getBill = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const data = await Bill.find().skip((page - 1) * limit).limit(limit);

        const count = await Bill.countDocuments();
        return res.json({
            data: {
                count,
                rows: data
            }
        })


    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addBill,
    getBill
}