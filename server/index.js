const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const reportRoutes = require("./routes/reportRoutes");

//TODO POST İLE ALINAN İNPUTLAR İÇİN PARSER GÖREVİ
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVER PORT
const PORT = process.env.PORT;

//Define the Routes
app.use("/", reportRoutes);

// React uygulamasının derlenmiş dosyalarının servis edilmesi
app.use(express.static(path.join(__dirname, "../client/build")));

// Tüm istekleri React uygulamasına yönlendirme
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Sunucuyu dinlemeye başlayın
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numaralı bağlantı noktasında çalışıyor.`);
});
