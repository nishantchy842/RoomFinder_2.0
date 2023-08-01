const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

const categories = mongoose.model("category", categorySchema);

module.exports = categories;
