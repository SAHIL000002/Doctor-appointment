const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const generateAppointmentNumber = async (req, res, next) => {
  const dataPart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `APT-${dataPart}-${randomPart}`;
};

const getDayName = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
};

const normalizeDate = (dateValue) => {
  const date = new Date(dateValue);
  date.setHours(0, 0, 0, 0);
  return date;
};

const bookAppointment = async (req, res, next) => {
  try {
    const {
      doctorId,
      patientName,
      phone,
      email,
      age,
      gender,
      address,
      appointmentDate,
      appointmentTime,
      reason,
      symptoms,
      bookingType,
    } = req.body;
    if (
      !doctorId ||
      !patientName ||
      !phone ||
      age === undefined ||
      !gender ||
      !appointmentDate ||
      !appointmentTime ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "invalid doctor id",
      });
    }
    if (!docotr.isActive) {
      return res.status(400).json({
        success: false,
        message: "doctor is currently unavailable",
      });
    }

    const selectedDate = normalizeDate(appointmentDate);
    const today = normalizeDate(new date());
    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: "past date appointment in not allowed",
      });
    }
    const selectedDay = getDayName(selectedDate);
    if (!doctor.availableDays.includes(selectedDay)) {
      return res.status(400).json({
        success: false,
        message: `doctor in ont available on ${selectedDay}`,
      });
    }
    if (
      appointmentTime < doctor.startTime ||
      appointmentTime >= doctor.endTime
    ) {
      return res.status(400).json({
        success: false,
        message: `appointment time must be between ${doctor.startTime} and ${doctor.endTime}`,
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: selectedDate,
      appointmentTime,
      status: {
        $ne: "Cancelled",
      },
    });
    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "this appointment slot is already booked",
      });
    }

    let patient = Patient.findOne({
      phone,
      name: {
        $regex: `${patientName}`,
        $option: "i",
      },
    });
    if (!patient) {
      patient = await Patient.create({
        name: patientName,
        phone,
        email,
        age,
        gender,
        address,
      });
    } else {
      patient.age = age;
      patient.gender = gender;
      if (email) {
        patient.email = email;
      }
      if (address) {
        patient.address = address;
      }
      await patient.save();
    }
    l;

    const appointmentCount = await Appointment.countDocuments({
      doctor: doctorId,
      appointmentDate: selectedDate,
      status: {
        $ne: "Cancelled",
      },
    });

    const tokenNumber = appointmentCount + 1;

    const appointment = await Appointment.create({
      appointmentNumber: generateAppointmentNumber(),
      doctor: doctorId,
      patient: patient._id,
      appointmentDate: selectedDate,
      appointmentTime,
      reason,
      symptoms: symptoms || [],
      bookingType: bookingType || "Online",
      consultationFee: doctor.consultationfee,
      tokenNumber,
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("doctor", "name specialization consultationFee roomNumber")
      .populate("patient", "name age gender phone");

      res.status(201),json({
        success : true , 
        message : "appointment booked successfully",
        data : populatedAppointment
      });
      
  } catch (error) {
    next(error);
  }
};
