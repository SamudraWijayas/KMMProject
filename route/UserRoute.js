import express from "express";
import { getUsers, Register, getTotalUsers,updateUser, updatePassword} from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyUser, authenticateToken } from "../middleware/AuthUser.js";
import { Login, getMe, Logout } from "../controller/Auth.js";
import upload from "../middleware/UploadAvatar.js";

const router = express.Router();

router.get("/api/users", getUsers); // GET all users
router.post("/api/login", Login);
router.get("/api/me", verifyUser, getMe);
router.post("/api/register", Register);
router.get("/api/token", refreshToken);
router.delete("/api/logout", Logout);
router.get("/api/totalUsers", getTotalUsers);
router.put("/api/update", upload.single('avatar'), verifyUser, updateUser); // Route untuk update username dan avatar
router.put("/api/update-password", verifyUser, updatePassword); // Route untuk update password

// router.post('/login', login);

export default router;
