const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user")
require("dotenv").config().parsed

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT} PORT`)
})
