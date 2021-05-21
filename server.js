require("dotenv").config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001;
require("./mongoConn")
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/api", require("./route/route.js"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));