import express from "express";
import { getUsers, Register, getTotalUsers,updateUser, updatePassword} from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyUser, authenticateToken } from "../middleware/AuthUser.js";
import { Login, getMe, Logout } from "../controller/Auth.js";
import upload from "../middleware/UploadAvatar.js";

const router = express.Router();

router.get("/users", getUsers); // GET all users
router.post("/login", Login);
router.get("/me", verifyUser, getMe);
router.post("/register", Register);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.get("/totalUsers", getTotalUsers);
router.put("/update", upload.single('avatar'), verifyUser, updateUser); // Route untuk update username dan avatar
router.put("/update-password", verifyUser, updatePassword); // Route untuk update password

// router.post('/login', login);

export default router;
