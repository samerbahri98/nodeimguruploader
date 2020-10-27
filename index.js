const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.get("/", (req, res) => {
  res.json({ message: "sent" });
});

app.post("/upolads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    res.json({ message: url.data.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
  } catch (error) {
    console.log("error", error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
