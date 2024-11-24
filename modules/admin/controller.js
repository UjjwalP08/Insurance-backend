const Joi = require("joi");
const { Admin } = require("./schema");
const env = require("dotenv").config().parsed
const jwt = require("jsonwebtoken");


// Sign Up
const adminSignUp = async (req, res) => {


    const validationAdmin = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const isValid = validationAdmin.validate(req.body)

    if (isValid.error) {
        return res.json({
            message: "Email is not valid or you haven't entered a password"
        })
    }

    try {
        const isExist = await Admin.findOne({ email: isValid.value.email })

        if (isExist) {
            return res.json({
                message: "This email is already used use different one"
            }).status(404);
        }

        await Admin.create({
            email: isValid.value.email,
            password: isValid.value.password,
        })


        return res.json({
            message: "Admin created successfully"
        }).status(201);
    } catch (error) {
        console.log(error)
    }


}

// Log in
const adminLogin = async (req, res) => {


    const validationAdmin = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const isValid = validationAdmin.validate(req.body)

    if (isValid.error) {
        return res.json({
            message: "Email is not valid or you haven't entered a password"
        })
    }

    try {
        const isExist = await Admin.findOne({ email: isValid.value.email, password: isValid.value.password })

        if (isExist) {

            const token = jwt.sign({
                id: isExist._id,
                email: isExist.email
            }, process.env.JWT_SECRET)

            return res.json({
                message: "Login successfully",
                token: token
            }).status(201);
        }




        return res.json({
            message: "Invalid email or password"
        }).status(201);
    } catch (error) {
        console.log(error)
    }


}

// get me
const getMe = async (req, res) => {
    try {
        const token = jwt.sign({
            id: req._id,
            email: req.email
        }, process.env.JWT_SECRET)


        await Admin.findById({
            _id: req.id
        }).then((response) => {
            return res.status(201).json({
                data: response,
                token
            })
        }).catch(err => (res.json({
            message: err.message
        })))

        return res.json({
            message: "Get me successfully",
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    adminSignUp,
    adminLogin,
    getMe
}