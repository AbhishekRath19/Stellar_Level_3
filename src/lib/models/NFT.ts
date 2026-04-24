import mongoose, { Schema, model, models } from "mongoose";

const NFTSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this NFT."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL."],
  },
  owner: {
    type: String,
    required: [true, "Please provide an owner address."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NFT = models.NFT || model("NFT", NFTSchema);

export default NFT;
