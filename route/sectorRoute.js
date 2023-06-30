import express from "express";
import {
  createNewUser,
  getAllSectors,
  newSectors,
  updateUser,
  getUserDetail,
  getAllUsers,
  deleteUser
} from "../controller/sector.js";
const router = express.Router();

router.post("/newUser", createNewUser);
router.get("/AllUsers", getAllUsers);
router.get("/getAllSectors",   getAllSectors);
router.put("/editUser/:id", updateUser);
router.post("/newSector", newSectors);
router.delete("/deleteUser", deleteUser);

router.get("/getUserDetail/:id", getUserDetail);

export default router;
