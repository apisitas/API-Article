const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/articles", require("./routes/articleRoute"));
app.get("/", (req, res) => {
    res.json({ success: "Server is live" });
});
app.use((req, res, next) => {
    res.status(404).json({ success: "Not found" });
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
