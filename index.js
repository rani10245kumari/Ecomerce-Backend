const express = require("express")
const data = require("./Store")
const cors = require("cors")
const collection = require("./mongo")
const checkout = require("./oderdetail")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = "sm"
const saltRound = 10
let arr = []

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.get("/", (req, res) => {

    res.send(data)

})
/*-----------login-design---------*/





app.post("/login", async (req, res) => {
    const loginData = req.body
    let findAcc = await collection.find({ email: { $eq: loginData.email } })
    console.log(findAcc)
    if (findAcc.length === 0)

        return res.send({ msg: "User has not registered, please try again" })

    const validate = bcrypt.compareSync(loginData.password, findAcc[0].password)
    if (validate)
        return res.send({ msg: "User successfully logged in" })

    return res.send({ msg: "User details doesn't match" })
})

app.post("/signup", async (req, res) => {
    const regData = req.body

    const isregister = await collection.find({ email: { $eq: regData.email } })
    if (isregister.length > 0) {
        return res.send("user already exists")
    }
    regData.password = bcrypt.hashSync(regData.password, saltRound)
    const mongores = await collection.create(regData)
    console.log(mongores)
    const token = jwt.sign({ user: regData.email }, secretKey, { expiresIn: 36000 })
    console.log(regData);
    return res.send({ msg: `user registered successfully`, JWT: `${token}` })
})


/*---------searching---------*/
app.get("/search", (req, res) => {
    console.log(data)
    const query = req.query.q;
    const filterData = data.filter(element =>
        element.title.toLowerCase().includes(query.toLowerCase()) ||
        element.description.toLowerCase().includes(query.toLowerCase()) ||
        element.category.toLowerCase().includes(query.toLowerCase()))
    res.send(filterData)
    console.log(query);
})

app.post("/order", checkout)
PORT = 5780
app.listen(PORT, () => {
    try {
        console.log(`Server is running on ${PORT}`)

    } catch (error) {

    }
})