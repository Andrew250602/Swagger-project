const bodyParser = require("body-parser");
const express = require("express")
const bodyParser = require("body-parser")

const AuthRouter = require("./router/auth/index")

const app = express();


require('dotenv').config()




app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({ origin: "*" }));
// router
app.use("/api/auth", AuthRouter)


app.listen(process.env.PORT, ()=>{
      console.log( `🚀 server is running on port http://${process.env.HOST}:${process.env.PORT}`)
})
