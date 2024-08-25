const { Mongoose } = require("mongoose");

const db = new Mongoose();

async function run() {
  await db.connect(process.env.MONGO_URL, {
    dbName: "ubc-map",
    w: "majority",
  });
  console.log("Database successfully connected!");

  db.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });
}

run();

process.on("SIGINT", function () {
  db.connection.close().then(() => {
    console.info("Mongoose disconnected on app termination");
    process.exit(0);
  });
});

module.exports = db;
