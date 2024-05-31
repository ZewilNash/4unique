const mongoose = require("mongoose");

const connectDB = async (url) => {
    await mongoose.connect(url , {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
}


module.exports = connectDB;