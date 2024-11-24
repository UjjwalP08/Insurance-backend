const { mongoose } = require("../../db/db");
const { CONSTANT } = require("../../utils/CONSTANT");

const billSchema = new mongoose.Schema({
    billNo: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    billingDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    amount: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    billImage: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

const Bill = mongoose.model(CONSTANT.MODEL_STRING.BILLS_MODEL, billSchema);


module.exports = {
    Bill
}