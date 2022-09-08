import mongoose,{ Schema } from "mongoose";
export const PictureSchema = new Schema({
  Image: String,
  Name: String,
  Description: String,
  Tags: String,
});


export const Picture = mongoose.model('picture',PictureSchema)