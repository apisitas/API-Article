const express = require("express");

const Sequelize = require("sequelize");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();

// const sequelize = new Sequelize("api_article", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
// });

// async function connectDB() {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.error("Unable to connect to the database:", error);
//     }
// }
// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/articles", require("./routes/articleRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
