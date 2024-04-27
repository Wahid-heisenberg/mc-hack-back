const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect_db = require("./config/db.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const AuthRoutes = require("./routes/user.js");
const GroupRoutes = require("./routes/group.js");
const projectRoutes = require("./routes/Project.js")
const companyRoutes = require("./routes/company.js");
const commitRoutes = require("./routes/commit.js");
const fileRoutes = require("./routes/file.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "mc-backend API",
//         version: "1.0.0",
//         description: "Best api ever",
//       },
//       servers: [
//         {
//           url: "http://localhost:5000", // URL of your API server
//         },
//       ],
//     },
//     apis: ["./routes/user.js"], // Path to your route files
// };

// const specs = swaggerJsdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  
  app.set("view engine", "hbs");
  
  app.use("/api/v1/users", AuthRoutes);
  app.use("/api/v1/groups", GroupRoutes);
  app.use("/api/v1/companies", companyRoutes);
  app.use("/api/v1/projects", projectRoutes);
  app.use("/api/v1/commits", commitRoutes);
  app.use("/api/v1/files", fileRoutes);

  
app.get("/", (req, res) => {
    res.send("Welcome to the backend server.");
    });

connect_db();

app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}.`);
});
