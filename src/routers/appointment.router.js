const { Router } = require('express');
const router = Router();

const appointmentController = require('../controllers/appointment.controller');
const deserializeUser = require('../middleware/deserializeUser');
const restrictTo = require('../middleware/restrictTo');

router.post("/create", deserializeUser, appointmentController.createAppointmentHandler);
router.put("/update/:id", deserializeUser, appointmentController.updateAppointmentByIdHandler);
router.delete("/delete/:id", deserializeUser, appointmentController.deleteAppointmentByIdHandler);
router.patch("/change-status/:id", [deserializeUser, restrictTo(["ADMIN"])], appointmentController.changeAppointmentStatusHandler);
router.get("/get/:id", deserializeUser, appointmentController.getAppointmentByIdHandler);
router.get("/all", [deserializeUser, restrictTo(["ADMIN"])], appointmentController.getAllAppointmentsHandler);

// Public
router.get("/get-all", deserializeUser, appointmentController.allAppointmentsHandler);

module.exports = router;