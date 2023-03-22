import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  body: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Comment", commentSchema);
