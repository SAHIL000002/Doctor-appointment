const Doctor = require("../models/Doctor")
const Appointment = require("../models/Appointment")

const createDoctor = (req ,res , next)=>{
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({
            success : true,
            message : "doctor registered successfully",
            data : doctor
        })
    } catch (error) {
        next(error)
    }
};