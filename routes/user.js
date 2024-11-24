const router = require("express").Router()

router.use("/bills", require("../modules/bills"))

module.exports = router