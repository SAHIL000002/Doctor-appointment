const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const generateAppointmentNumber = async (req, res, next) => {
  const dataPart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `APT-${dataPart}-${randomPart}`;
};

const getDayName = (date) =>{
    return new Intl.DateTimeFormat("en-US" , {
        weekday : "long"
    }).format(date);
}

const normalizeDate = (dateValue) =>{
    const date = new Date(dateValue);
    date.setHours(0,0,0,0);
    return date;
}