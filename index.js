const express = require("express")
const data = require("./Store")
const router = require("./router-auth")
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.get("/", (req, res) => {

    res.send(data)

})

app.use("/signup", router)


/*---------searching---------*/
app.get("/search", (req, res) => {
    console.log(data)
    const query = req.query.q;
    const filterData = data.filter(element =>
        element.title.toLowerCase().includes(query.toLowerCase()) ||
        element.description.toLowerCase().includes(query.toLowerCase()))
    res.send(filterData)
    console.log(query);
})
app.listen(5780)