const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./config/db")

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.send("API running")
});

app.use("/api/mentors", require("./routes/mentorRoutes"))
app.use("/api/santri", require("./routes/santriRoutes"))
app.use("/api/setoran", require("./routes/setoranRoutes"))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
