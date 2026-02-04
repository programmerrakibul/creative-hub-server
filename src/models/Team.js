const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      required: [true, "Bio is required"],
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      lowercase: true,
      match: [/^https?:\/\/.+\..+/, "Please provide a valid URL"],
    },
  },
  {
    timestamps: true,
  },
);

memberSchema.plugin(mongoosePaginate);

memberSchema.pre("save", function () {
  this.updatedAt = new Date().toISOString();
});

module.exports = mongoose.model("Team-Member", memberSchema);
