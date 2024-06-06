"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadList from "../DownloadList";
import LoadingAnimation from "../LoadingAnimation";
import { UseAnimation } from "@/Context/AnimationContext";

const Conversor = () => {
  const { animation, setAnimation } = UseAnimation();

  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState("Nada sendo executado no momento");

  // Verificar se já há uma lista de downloads armazenada, caso não, inicia com uma vazia
  const [downloadList, setDownloadList] = useState(() =>
    JSON.parse(localStorage.getItem("userDownloads") || "[]")
  );

  // Definir a lista sempre que o estado dela for alterado
  useEffect(() => {
    localStorage.setItem("userDownloads", JSON.stringify(downloadList));
  }, [downloadList]);

  const downloadListAdd = (newDownload: {
    url: string;
    status: string;
    timestamp: string;
  }) => {
    setDownloadList((prevList) => {
      let updatedList;

      // Definir o limite de downloads armazenados para 15, caso usuario supere o limite, o primeiro item será substituido pelo mais recente
      if (prevList.length >= 15) {
        updatedList = [...prevList.slice(1), newDownload];
      } else {
        updatedList = [...prevList, newDownload];
      }
      localStorage.setItem("userDownloads", JSON.stringify(updatedList));
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
        "http://localhost:5000/download",
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
        console.error("Error occurred while downloading:", error.message);
        setAnimation(false);
      }
      console.error("Error occurred while downloading:", error.message);
      toast.error("Erro ao fazer o download");
      setProgress("Erro no download");
      setAnimation(false);
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
      <div className=" align-center justify-center m-auto bg-gray-200 rounded-xl p-8 text-center">
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-center m-auto items-center">
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
