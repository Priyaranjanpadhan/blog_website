import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//making static folder using a middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

//listening constanty
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})