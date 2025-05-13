const express = require("express")
const cors = require("cors")
const createTables = require('./connect/migration');
const seedDatabase = require('./connect/seed');

const bodyParser = require("body-parser");
const AuthRouter = require("./router/auth/index")
const app = express();
const  normalConstants = require("./constants/normalConstants")
const  errorConstants = require("./constants/errorConstants")
require('dotenv').config()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: "*" }));

// router
app.use("/api/auth", AuthRouter)

app.listen(process.env.DB_PORT_DB, async () => {
  console.log(`🚀 ${normalConstants.SERVER_RUNNING_ON_PORT} http://${process.env.DB_HOST}:${process.env.DB_PORT_DB}`);

  const tablesCreated = await createTables();
  if (tablesCreated) {
    console.log(errorConstants.DATABASE_TABLES_READY);
    const dataSeeded = await seedDatabase();
    if (dataSeeded) {
      console.log(errorConstants.DATABASE_SEEDING_SUCCESS);
    } else {
      console.error(errorConstants.DATABASE_SEEDING_FAILED);
    }
  } else {
    console.error(errorConstants.DATABASE_MIGRATION_FAILED);
  }
})
