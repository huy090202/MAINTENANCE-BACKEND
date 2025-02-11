const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const deserializeUser = require('../middleware/deserializeUser');
const restrictTo = require('../middleware/restrictTo');
const { upload } = require('../middleware/uploadImages');

router.post("/create", userController.createUserHandler);
router.post("/login", userController.loginUserHandler);

router.put("/update", deserializeUser, upload.single("avatar"), userController.updateUserHandler);
router.patch("/change-password", deserializeUser, userController.changePasswordHandler);
router.get("/profile", deserializeUser, userController.getUserProfileHandler);
router.post("/refresh-token", deserializeUser, userController.refreshTokenHandler);
router.get("/get/:id", deserializeUser, userController.getUserByIdHandler);

router.post("/create-staff", [deserializeUser, restrictTo(["Quản trị viên"])], userController.createStaffHandler);
router.patch("/update-status/:id", [deserializeUser, restrictTo(["Quản trị viên"])], userController.updateUserStatusHandler);

router.get("/all", [deserializeUser, restrictTo(["Nhân viên", "Kỹ thuật viên", "Thu ngân", "Quản trị viên"])], userController.getAllUsersHandler);
router.get("/all-staff", [deserializeUser, restrictTo(["Quản trị viên"])], userController.getAllStaffsHandler);
router.get("/all-tech", [deserializeUser, restrictTo(["Quản trị viên"])], userController.getAllTechsHandler);
router.get("/all-cashier", [deserializeUser, restrictTo(["Quản trị viên"])], userController.getAllCashiersHandler);
router.get("/all-admin", [deserializeUser, restrictTo(["Quản trị viên"])], userController.getAllAdminsHandler);

// Tự động tạo tài khoản khách hàng vãng lai
router.post("/guest", userController.createGuestUserHandler);

// Hiển thị danh sách kỹ thuật viên của hệ thống cho khách hàng xem
router.get("/techs", userController.allTechsHandler);

module.exports = router;