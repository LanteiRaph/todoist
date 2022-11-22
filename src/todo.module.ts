import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inprogress: {
    type: Boolean,
  },
  completed: {
    type: Boolean,
  },
});

export default mongoose.model("Todo", TodoSchema);
