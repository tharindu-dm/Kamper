const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
/*app.use(cors({  this is for the frontend to be able to access the backend
    credentials: true,
    origin: "http://localhost:3000",

}))*/

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  const photosMiddleware = multer({ dest: "uploads/" });
  app.post("/upload", photosMiddleware.array("photos", 10), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const { path, orginalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, path + newPath);

      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  });

  res.json(newName);
});
