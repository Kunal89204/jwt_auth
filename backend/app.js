const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
dotenv.config()
app.use(bodyParser.json())

module.exports = app;