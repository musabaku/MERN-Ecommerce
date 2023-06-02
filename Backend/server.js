const app = require("./app")

const dotenv = require("dotenv")
const connectDatabase = require("./database")
dotenv.config({path:"Backend/config/config.env"})

connectDatabase()


app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})