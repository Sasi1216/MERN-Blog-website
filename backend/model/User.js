import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  blog: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      require: true,
    },
  ],
});
export default mongoose.model("User", userSchema);
//653f67322cc423f1fa5b9582