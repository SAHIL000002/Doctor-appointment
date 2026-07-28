const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "doctor name is required"],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, "qualification is required"],
      trim: true,
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    consultationfee: {
      type: Number,
      required: true,
      min: 0,
    },
    phone : {
        type : String,
        required : true,
        unique : true   
    },
    email : {
        type : String,
        unique : true,
        sparse : true,     // sparse : agr email nhi diya kisi doctor ne to mongodb me email name ki feild nhi banegi us perticular doctor ke liye ,  ager aother doctor email deta hai to uska email show karega
        lowercase : true,
        trim : true
    },
    availableDays : [{
        type : String,
        enum : ["Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" , "Sunday"]
    }],
    startTime:{
        type : String,
        required : true
    },
    endTime : {
        type :String,
        required : true
    },
    slotDuration : {
        type : Number,
        default : 15
    },
    roomNumber  : {
        type : String,
        trim : true
    },
    isActive :{
        type : Boolean,
        default : true
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);
