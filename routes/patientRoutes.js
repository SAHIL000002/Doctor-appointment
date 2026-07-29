const express = require('express')
const { getPatient, getSinglePatient, getPatientAppointments } = require('../controllers/patientController')
const router = express.Router()

router.get("/" , getPatient)
router.get("/:id" , getSinglePatient)
router.get("/:id/appontment" , getPatientAppointments)

module.exports = router 