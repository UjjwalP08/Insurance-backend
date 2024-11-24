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
        const data = await Bill.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });

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

const editBill = async (req, res) => {
    try {
        const _id = req.params.id;

        // console.log(body, req.files)
        const validationSchema = Joi.object({
            billNo: Joi.string().required(),
            billingDate: Joi.date().required(),
            amount: Joi.number().required(),
        })
        const payload = validationSchema.validate(req.body);

        const billImage = await cloudinary.uploader.upload(req.file.path, {
            folder: process.env.IMAGE_UPLOAD_FOLDER
        });
        // await Bill.create({

        // })
        await Bill.findByIdAndUpdate({ _id }, {
            ...payload.value,
            billImage: billImage.secure_url
        })
        return res.status(202).json({
            message: "Bill Update Successfully!!!"
        });

    } catch (error) {
        console.log(error)
    }
}

const deleteBill = async (req, res) => {
    const _id = req.params.id;

    await Bill.findByIdAndDelete({ _id }).then(() => {
        return res.json({
            message: "Bill delete successfully"
        })
    }).catch((err) => {
        return res.status(400).json({
            message: "Invalid record",
            error: err
        }).status(400)
    })
}



module.exports = {
    addBill,
    getBill,
    deleteBill,
    editBill
}