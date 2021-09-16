import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [urlVideo, setUrlVideo] = useState(null);
  const [nameVideo, setNameVideo] = useState(null);
  const [status, setStatus] = useState(null);

  const getAudio = async () => {
    let idVideo = link.split("v=")[1].split("&")[0];
    var options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: idVideo },
      headers: {
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_TOKEN_API,
      },
    };
    
    let rep = await axios.request(options);
    setStatus(rep.data.status);
    setUrlVideo(rep.data.link);
    setNameVideo(rep.data.title);
    setLink("");
  };

  return (
    <div className="App">
      <div className="pesquisa">
         <h1 className="titulo">
        Baixar Musica do <b>YouTube</b>
      </h1>
      <div className="inputPesquisa">
        <input
        className="inputLink"
        type="text"
        onChange={(t) => setLink(t.target.value)}
        placeholder="Informe o link do video"
        value={link}
      />
      <button className="btnBaixar" onClick={() => getAudio()}>
        Procurar
      </button>
      </div>
      
      </div>
     
      {status === "ok" ? (
        <div className="cardMusic">
          <h1>{nameVideo}</h1>
          <a href={urlVideo} className="btnDownload" download>
            Baixar
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default App;
