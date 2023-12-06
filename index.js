const express = require("express")
const data = require("./Store")

const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.get("/", (req, res) => {

    res.send(data)

})
app.listen(5780)