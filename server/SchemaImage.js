const mongoose = require("mongoose");

const SchemaImage = new mongoose.Schema(
  {
   image:String
  },
  {
    collection: "photos",
  }
);

mongoose.model("photos", SchemaImage);
