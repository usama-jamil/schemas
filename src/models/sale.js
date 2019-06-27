const  mongoose = require('mongoose')
const validator = require('validator')


const saleSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
        trim: true
    },
    ContactNumber: {
        type: String,
        required: true,
        trim: true
    },
    Time: { type: Date , default: new Date().toLocaleTimeString()},
    Date:{
        type: Date, default: Date.now
    },
    Status: ["CallBack", "Transfer" , "Pending"],
    KickBack: ""    

})

const Sale = mongoose.model('Sale',saleSchema )

module.exports = Sale