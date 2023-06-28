import express from "express";
import {
  createNewUser,
  getAllSectors,
  newSectors,
  updateUser,
  getUserDetail,
} from "../controller/sector.js";
const router = express.Router();

router.post("/newUser", createNewUser);
router.get("/getAllSectors", getAllSectors);
router.put("/editUser/:id", updateUser);
router.post("/newSector", newSectors);

router.get("/getUserDetail/:id", getUserDetail);

export default router;
