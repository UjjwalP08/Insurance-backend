const Joi = require("joi");
const cloudinary = require('cloudinary').v2;
const { Bill } = require("./schema")
require("dotenv").config().parsed


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        console.log(req.file, payload)

        // const billImage = await cloudinary.uploader.upload(req.files['billImage'][0].path, {
        //     folder: 'uploads'
        // });
        // const payload = validationSchema.validate(body);
        // await Bill.create({
        //     ...body,
        //     billImage: billImage.secure_url
        // })
        res.status(201).json({
            message: "Bill Created Successfully!!!"
        })
        return;
    } catch (error) {
        console.log(error)
    }
}

const getBill = async (req, res) => {
    try {
        const data = await Bill.find();
        return res.json({
            data
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addBill,
    getBill
}