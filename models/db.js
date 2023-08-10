const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pinterest:pinterest@cluster0.yzkb1jo.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("db connected!!!"))
    .catch((err) => console.log(err));

