import mongoose from "mongoose";

const sectorDataSchema = new mongoose.Schema({

  nameOfSector: {
    type: String,
    required: true,
    trim: true,

  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});


export default mongoose.model("sectorDataModel", sectorDataSchema);
