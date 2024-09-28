const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./config/db");

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/santri", require("./routes/santriRoutes"));
app.use("/api/setoran", require("./routes/setoranRoutes"));

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`.bgBlue.underline.bold);
})