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



// app.post("/login", async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const check = await collection.findOne({ email: email })
//         if (check) {
//             res.json("already exist")
//         }
//         else {
//             res.json("user login")
//         }
//     }
//     catch (e) {
//         res.json("notexist")
//     }
// })

app.post("/login", (req, res) => {
    const loginData = req.body
    let findAcc = arr.find(item => item.email == loginData.email)
    if (!findAcc)
        return res.send({ msg: "User has not registered, please try again" })

    const validate = bcrypt.compareSync(loginData.pass, findAcc.pass)
    if (validate)
        return res.send({ msg: "User successfully logged in" })

    return res.send({ msg: "User details doesn't match" })
})
// /*---------signup-------------------*/
// app.post("/signup", async (req, res) => {
//     const { email, Password } = req.body
//     const detail = {
//         email: email,
//         password: Password
//     }
//     const check = await collection.find({ email: email })
//     console.log(check);
//     if (check.length != 0) {
//         return res.send("already exist")
//     }
//     const mongores = await collection.create(detail)
//     if (mongores) {
//         return res.send("user registerd")
//     }
//     else {
//         return res.send("error")
//     }
//     // try {


//     //     else {

//     //         const mongores = await collection.create(detail)
//     //         res.send(mongores)
//     //     }
//     // }
//     // catch (e) {
//     //     res.send("notexist")
//     // }
// })
app.post("/signup", (req, res) => {
    const regData = req.body
    regData.pass = bcrypt.hashSync(regData.pass, saltRound)
    arr.push(regData)
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
app.listen(5780)