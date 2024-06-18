interface Download {
  url: string;
  timestamp: string;
}

interface DownloadListProps {
  downloads: Download[];
}

const DownloadList: React.FC<DownloadListProps> = ({ downloads }) => {
  return (
    <div>
      {downloads.length === 0 ? (
        <h4 className="text-xl my-2">Nenhum download realizado !</h4>
      ) : (
        <h4 className="text-xl my-2">Downloads recentes:</h4>
      )}
      <ul>
        {downloads.map((download, index) => (
          <li key={index} className="my-2">
            <a href={download.url} target="_blank" rel="noopener noreferrer">
              {download.url}
            </a>
            {" - "}
            {new Date(download.timestamp).toLocaleString("pt-BR")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadList;
