const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})
    .then(() => {
        console.log("DB connected")
    }).catch(err => {
        console.log(err.message)
    })