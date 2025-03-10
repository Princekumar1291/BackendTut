const mongoose = require("mongoose")

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error while connecting to the DB:", error);
    exit(1);
  }
};


module.exports=dbConnect;