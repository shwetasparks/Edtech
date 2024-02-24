const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },

  subSection: [     //array
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subsection",
    },
  ],
});

module.exports = mongoose.model("User", sectionSchema);
