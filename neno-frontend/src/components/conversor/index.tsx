"use client";

import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Conversor = () => {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState("Nada sendo executado no momento");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress("Fazendo o Download do Arquivo ...");

    try {
      const response = await axios.post(
        "http://localhost:5000/download",
        { url },
        {
          responseType: "json",
          onDownloadProgress: () => {},
        }
      );

      setProgress("Download Concluído");
      toast.success("Download Concluído");
    } catch (error) {
      console.error("Error occurred while downloading:", error.message);
      toast.error("Erro ao fazer o download");
      setProgress("Erro no download");
    } finally {
      setTimeout(() => {
        cleanAll();
      }, 5000);
    }
  };

  const cleanAll = () => {
    setProgress("Nada sendo executado no momento");
    setUrl("");
  };

  return (
    <div>
      <h1>YouTube Audio Downloader</h1>
      <form onSubmit={handleSubmit}>
        <label>
          YouTube URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Download</button>
      </form>

      <h4>Status: {progress}</h4>

      <ToastContainer />
    </div>
  );
};

export default Conversor;
