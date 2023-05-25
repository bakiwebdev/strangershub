import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "please provide a date for this comment"],
  },
  time: {
    type: String,
    required: [true, "please provide a time for this comment"],
  },
  body: {
    type: String,
    required: [true, "please provide a body for this comment"],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", commentSchema);
