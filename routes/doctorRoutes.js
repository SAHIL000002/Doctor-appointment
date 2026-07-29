const express = require('express')
const { createDoctor, getDoctors, getSingleDoctor, updateDoctor, statusDoctor, getAllAppointments } = require('../controllers/doctorController')
const router = express.Router()

router.post("/" , createDoctor)
router.get("/" , getDoctors)
router.get("/:id" , getSingleDoctor)
router.put("/:id" , updateDoctor)
router.patch("/:id" , statusDoctor)
router.get("/:id/:appointment" , getAllAppointments)

module.exports = router