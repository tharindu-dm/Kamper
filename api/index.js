const imageDownloader = require("image-downloader");

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

  res.json(newName);
});
