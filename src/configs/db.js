const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect(
        "mongodb+srv://deepak:deep_123@cluster0.fyotr.mongodb.net/syoft?retryWrites=true&w=majority"
    )
}

module.exports=connect 