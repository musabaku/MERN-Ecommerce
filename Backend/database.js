const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Connected to MongoDB successfully`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDatabase