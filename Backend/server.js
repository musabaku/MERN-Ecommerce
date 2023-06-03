const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./database");
dotenv.config({ path: "Backend/config/config.env" });

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error message : ${err.message}`);
  console.log("Closing Server due to uncaught exception");
  process.exit(1);
});

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error message : ${err.message}`);
  console.log("Closing Server due to Unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
