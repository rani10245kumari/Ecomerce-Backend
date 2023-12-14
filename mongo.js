const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ranik10245:ranik10245@cluster0.amponrd.mongodb.net/user-details")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed')
    })
const newSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const collection = mongoose.model("user-detail", newSchema)
module.exports = collection