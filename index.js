const express = require("express")
const data = require("./Store")
const router = require("./router-auth")
const cors = require("cors")
const collection = require("./mongo")

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.get("/", (req, res) => {

    res.send(data)

})
/*-----------login-design---------*/

app.get("/login", cors(), (req, res) => {

})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const check = await collection.findOne({ email: email })
        if (check) {
            res.json("already exist")
        }
        else {
            res.json("notexist")
        }
    }
    catch (e) {
        res.json("notexist")
    }
})
/*---------signup-------------------*/
app.post("/signup", async (req, res) => {
    const { email, Password } = req.body
    const detail = {
        email: email,
        password: Password
    }
    const check = await collection.find({ email: email })
    console.log(check);
    if (check.length != 0) {
        return res.send("already exist")
    }
    const mongores = await collection.create(detail)
    if (mongores) {
        return res.send("user registerd")
    }
    else {
        return res.send("error")
    }
    // try {


    //     else {

    //         const mongores = await collection.create(detail)
    //         res.send(mongores)
    //     }
    // }
    // catch (e) {
    //     res.send("notexist")
    // }
})
//app.use("/signup", router)


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