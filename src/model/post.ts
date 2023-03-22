import { Schema, model } from "mongoose";

const postSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  hashtags: [{ type: String }],
  comments: [
    {
      type: Schema.Types.ObjectId,
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
export default model("Post", postSchema);
