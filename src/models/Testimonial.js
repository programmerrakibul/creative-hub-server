const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      trim: true,
      maxlength: [200, "Position cannot exceed 200 characters"],
    },
    company: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Testimonial content is required"],
      trim: true,
      maxlength: [1000, "Content cannot exceed 1000 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      match: [/^https?:\/\/.+\..+/, "Please provide a valid URL"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

testimonialSchema.plugin(mongoosePaginate);

testimonialSchema.pre("save", function () {
  this.updatedAt = new Date().toISOString();
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
