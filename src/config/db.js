const mongoose =require("mongoose");
const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB);

    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datoss");
  }
};

module.exports =dbConnection;
