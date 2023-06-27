import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  selectedSector: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  term: {
    type: Boolean,
   default:false,
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


export default mongoose.model("sectorModel", sectorSchema);
