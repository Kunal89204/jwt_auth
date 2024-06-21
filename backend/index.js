const app = require("./app")
const connectDB = require("./src/db/connectDB")
const userRoutes = require("./src/routes/user.routes")
const PORT = process.env.PORT

connectDB();

app.use('/api/v1', userRoutes)


app.listen(PORT, () => {
    console.log(`server is runnig on port ${PORT}`)
})