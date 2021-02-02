const mongoose = require("mongoose")

const { Schema } = mongoose

const UsersSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    nickname: {
        type: String,
    },
    affiliatedNumber: {
        type: Number,
        unique: true,
        required: true
    },
    affiliatedDate: {
        type: Date,
    },
    occupation: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    deleted: {
        type: Boolean,
    },
    astronomicalPoints: {
        type: Number,
    },
    badges: [
    {
        name: String,
        given: Boolean,
        info: String,
        points: Number
    }
  
    ],
    neasDiscovered: [{
        type: String,
    }],
    necsDiscovered: [{
        type: String,
    }],

})
const model = mongoose.model('Users', UsersSchema)

module.exports = model