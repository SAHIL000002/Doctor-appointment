const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    appointmentNumber : {
        type : String,
        unique : true,
        required : true
    },
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Doctor",
        required : true
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Patient",
        required : true
    },
    appointmentDate : { 
        type : Date,
        required: true
    },
    appointmentTime : {
        type: String,
        required : true
    },
    reason : {
        type : String,
        required: true,
        trim :true
    },
    symptoms : {
        type : String,
        trim :  true
    },
    status : {
        type : String,
        enum : ["Pending" , "Confirmed" , "Cecked-in" , "Completed" , "Cancelled"]
    },
    bookingType : {
        type : String,
        enum : ["Online" , "Walk-in" , "Phone" ],
        default : "Online"
    },
    paymentStatus :{
        type : String,
        enum : ["Pending" , "Paid" , "Refunded"],
        default : "Pending"
    },
    consultationFee : {
        type : String,
        required : true
    },
    tokenNumber :{
        type : Number
    },
    notes : {
        type : String,
        trim = true
    }

},{
    timestamps : true
});

module.exports = mongoose.model("Appointment" ,appointmentSchema)s