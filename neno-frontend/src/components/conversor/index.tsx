"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadList from "../DownloadList";
import { UseAnimation } from "@/Context/AnimationContext";

interface Download {
  url: string;
  timestamp: string;
  status: string;
}

const Conversor: React.FC = () => {
  const { animation, setAnimation } = UseAnimation();
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<string>(
    "Nada sendo executado no momento"
  );
  const [downloadList, setDownloadList] = useState<Download[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDownloads = localStorage.getItem("userDownloads");
      if (storedDownloads) {
        setDownloadList(JSON.parse(storedDownloads));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userDownloads", JSON.stringify(downloadList));
    }
  }, [downloadList]);

  const downloadListAdd = (newDownload: Download) => {
    setDownloadList((prevList) => {
      const updatedList =
        prevList.length >= 15
          ? [...prevList.slice(1), newDownload]
          : [...prevList, newDownload];
      if (typeof window !== "undefined") {
        localStorage.setItem("userDownloads", JSON.stringify(updatedList));
      }
      return updatedList;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url !== "") {
      setProgress("Fazendo o Download do Arquivo ...");
      setAnimation(true);
    }

    try {
      const response = await axios.post(
        "https://neno-backend.vercel.app/download",
        { url },
        {
          responseType: "json",
          onDownloadProgress: () => {},
        }
      );

      setAnimation(false);
      setProgress("Download Concluído");
      toast.success("Download Concluído");
      downloadListAdd({
        url,
        status: "Concluído",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      if (!url) {
        toast.error("Insira um url válido");
        setAnimation(false);
      } else {
        if (axios.isAxiosError(error)) {
          console.error("Error occurred while downloading:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
        toast.error("Erro ao fazer o download");
        setProgress("Erro no download");
        setAnimation(false);
      }
    } finally {
      setTimeout(() => {
        cleanAll();
      }, 5000);
    }
  };

  const cleanAll = () => {
    setAnimation(false);
    setProgress("Nada sendo executado no momento");
    setUrl("");
  };

  return (
    <>
      <div className="align-center justify-center m-auto bg-gray-200 rounded-xl p-8 text-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center m-auto items-center"
        >
          <label className="text-gray-900 text-lg">
            URL:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-8 rounded-sm mx-2"
            />
          </label>
          <br />
          <button
            type="submit"
            className="ease duration-500 bg-blue-600 ml-2 my-2 p-2 rounded-md text-white hover:bg-blue-700"
          >
            Baixar Arquivo
          </button>
        </form>
        <h4 className="text-lg">Status: {progress}</h4>
        <ToastContainer autoClose={3000} className="text-lg" />
      </div>
      <DownloadList downloads={downloadList} />
    </>
  );
};

export default Conversor;

