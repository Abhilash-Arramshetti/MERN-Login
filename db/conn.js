const mongoose = require('mongoose')
const DB = process.env.DATABASE

//while connecting to DB make the Driver version of Node to 2.1 or later
mongoose.connect(DB)
    .then(() => {
        console.log('DB Connected')
    })
    .catch((e) => {
        console.log(e)
    })

