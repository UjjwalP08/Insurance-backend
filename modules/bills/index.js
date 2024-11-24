const router = require("express").Router();
const upload = require("../../utils/config/multer-config")
const billsController = require("./controller");


// Multer setup for file storage


router.route("/").post(upload.single("billImage"), billsController.addBill).get(billsController.getBill);

router.route("/:id").patch(upload.single("billImage"), billsController.editBill).delete(billsController.deleteBill);

module.exports = router