const express = require('express')
const router = express.Router()

router.route("/").get((req, res) => {
    res.status(200).send("welcm to our website");
})

router.route("/register").get((req, res) => {
    res.status(200).send("hjgjhgj")
})




module.exports = router;