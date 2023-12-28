// import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "please provide a date for this post"],
  },
  time: {
    type: String,
    required: [true, "please provide a time for this post"],
  },
  title: {
    type: String,
    required: [true, "please provide a title for this post"],
  },
  body: {
    type: String,
    required: [true, "please provide a body for this post"],
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  hashtags: [{ type: String }],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  color: { type: String, default: "ffffff" },
});

postSchema.index({ title: "text", body: "text", hashtags: "text" });
export default mongoose.model("Post", postSchema);
