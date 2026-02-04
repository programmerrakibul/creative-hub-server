const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    projectUrl: {
      type: String,
      required: [true, "Project url is required"],
      trim: true,
      lowercase: true,
      match: [/^https?:\/\/.+\..+/, "Please provide a valid URL"],
    },
    clientCountry: {
      type: String,
      required: [true, "Client country is required"],
      trim: true,
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      enum: ["blockchain", "web", "e-commerce", "mobile", "saas"],
      default: "web",
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      lowercase: true,
      match: [/^https?:\/\/.+\..+/, "Please provide a valid URL"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.plugin(mongoosePaginate);

// Update timestamp before saving
projectSchema.pre("save", function () {
  this.updatedAt = new Date().toISOString();
});

module.exports = mongoose.model("Project", projectSchema);
