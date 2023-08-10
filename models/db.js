const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL; // Get the MongoDB URL from environment variable

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
