const express = require("express")
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const createTables = require('./connect/migration');
const seedDatabase = require('./connect/seed');
const AuthRouter = require("./router/auth")
const normalConstants = require("./constants/normalConstants")
const errorConstants = require("./constants/errorConstants")
const authenticateToken = require("./middleWare/index")
const app = express();
require('dotenv').config()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: "*" }));



app.listen(process.env.DB_PORT_DB, async () => {
  console.log(`🚀 ${normalConstants.SERVER_RUNNING_ON_PORT} http://${process.env.DB_HOST}:${process.env.DB_PORT_DB}`);
  console.log(`🚀🚀 ${normalConstants.SWAGGER_UI} http://${process.env.DB_HOST}:${process.env.DB_PORT_DB}/api-docs`);
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



////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                             DocumentAPI                                    //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Tài liệu API cho ứng dụng của bạn',
    },
    servers: [
      {
        url: `http://${process.env.DB_HOST}:${process.env.DB_PORT_DB}/api-docs`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/router/**/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);


// router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", AuthRouter)
app.use(authenticateToken)

app.get("/some-protected-route", (req, res) => {
    res.send("This is a protected route!");
});