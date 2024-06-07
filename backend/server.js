const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const os = require("os");

const app = express();
const port = process.env.PORT || 5000;

// Configura o middleware CORS para permitir todas as origens e métodos
app.use(
  cors({
    origin: "*", // Permite todas as origens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Permite todos os métodos HTTP
  })
);

app.use(express.json());

app.options("*", cors()); // Habilita pre-flight para todas as rotas

// Endpoint de teste para GET
app.get("/download", (req, res) => {
  res.send("<h1>Backend está rodando e pronto para receber requisições!</h1>");
});

// Endpoint principal para download
app.post("/download", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    const outputPath = path.join(os.homedir(), "Downloads", `${title}.mp3`);

    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
    });

    if (!audioFormat) {
      return res.status(400).json({ error: "Audio format not found" });
    }

    const audioStream = ytdl.downloadFromInfo(info, {
      filter: (format) => format.itag === audioFormat.itag,
    });

    audioStream.pipe(fs.createWriteStream(outputPath));

    let downloadedBytes = 0;
    let totalBytes = parseInt(audioFormat.contentLength);
    audioStream.on("progress", (chunkLength, downloaded, total) => {
      downloadedBytes += chunkLength;
      const percent = downloadedBytes / totalBytes;
      res.write(JSON.stringify({ percent }));
    });

    audioStream.on("end", () => {
      res.write(JSON.stringify({ success: true }));
      res.end();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
