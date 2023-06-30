import { validateSector } from "../joiValidation/validation.js";
import sectorModel from "../model/sector.js";
import sectorDataModel from "../model/sectorsData.js";
import mongoose from "mongoose";




export const createNewUser = async (req, res) => {
  try {
    const sectorDetails = req.body;

    //validate the information with joi before  registering a user and its sector.
    const { error } = await validateSector(sectorDetails);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message.toString() });
    const newSector = new sectorModel({
      ...sectorDetails,
      createdAt: new Date().toISOString(),
    });

    const savedSector = await newSector.save();
    res.status(200).json({
      data: savedSector,
      success: true,
      message: "Sector created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const getAllSectors = await sectorModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: getAllSectors,
      success: true,
      message: "Sectors fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSectors = async (req, res) => {
  try {
    const getAllSectors = await sectorDataModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: getAllSectors,
      success: true,
      message: "Sectors fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// sector creation
export const newSectors = async (req, res) => {
  try {
    const sectorName = req.body;

    const newSectorName = new sectorDataModel({
      ...sectorName,
      createdAt: new Date().toISOString(),
    });

    const savedSectorName = await newSectorName.save();
    res.status(200).json({
      data: savedSectorName,
      success: true,
      message: "New sector created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getUserDetail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(409).send(`there is no user with the id of ${_id}`);

    const userDetails = await sectorModel.findOne({ _id });
    if (!userDetails)
      return res.status(404).json({ message: "user data not found" });

    res.status(200).json({
      data:  userDetails,
      message: "Successfull",
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(409).send(`there is no user with the id of ${_id}`);
    const post = req.body;
    const userDetails = await sectorModel.findOne({ _id });
    if (!userDetails)
      return res.status(404).json({ message: "user data not found" });

    const updateduserDetails = await sectorModel.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.status(200).json({
      data: updateduserDetails,
      message: "Successfully updated",
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  //validate the id with mongoose
  try {
    const creator = req?.user?.id;
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(409).send(`there is no user with the id of ${_id}`);

    const sectorToDelete = await sectorModel.findOne({
      creator,
      _id: _id,
    });

    if (!sectorToDelete ||  sectorToDelet == null)
      return res.status(404).json({ message: "Sector not found" });

  

    await sectorModel.deleteOne({ _id });

    res
      .status(200)
      .json({ success: true, message: "Sector deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
