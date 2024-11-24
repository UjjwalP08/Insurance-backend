const router = require("express").Router()
const authMiddleware = require("../middleware/auth")

// router.use("/user", require("../modules/user"))
router.use("/", require("../modules/admin"))

router.use(authMiddleware);

router.use("/bills", require("../modules/bills"))

module.exports = router