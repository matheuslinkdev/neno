import React from "react";

const DownloadList = ({ downloads }) => {
    
  return (
    <div>
      <h4 className="text-xl my-2">Lista de downloads mais recentes:</h4>
      <ul>
        {downloads.map((download, index) => (
          <li key={index} className="my-2">
            <a href={download.url} target="_blank">
              {download.url}
            </a> {" - "}
            {new Date(download.timestamp).toLocaleString("pt-BR")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadList;
