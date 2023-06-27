import express from 'express';
import { createNewUser, getAllSectors, newSectors, updateUser } from "../controller/sector.js"
const router = express.Router();

router.post('/newUser', createNewUser);
router.get('/getAllSectors', getAllSectors);
router.post('/newSector', newSectors);
router.put( "/editUser/:id", updateUser);

export default router;