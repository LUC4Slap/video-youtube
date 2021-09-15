import React, { useState } from "react";
import "./App.css";

import fs from "fs";
import axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [urlVideo, setUrlVideo] = useState(null);
  const [nameVideo, setNameVideo] = useState(null);
  const [status, setStatus] = useState(null);

  const getVideo = async () => {
    let idVideo = link.split('v=')[1].split('&')[0]
    var options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {id: idVideo},
      headers: {
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        'x-rapidapi-key': '7ef0023ea0mshe5462d94f5d7854p188505jsn9267404dc9cd'
      }
    };
    let rep = await axios.request(options)
    setStatus(rep.data.status)
    setUrlVideo(rep.data.link)
    setNameVideo(rep.data.title)
    setLink('')
  };
  return (
    <div className="App">
      <h1>
        Baixar Musica do <b>YouTube</b>
      </h1>
      <input
        className="inputLink"
        type="text"
        onChange={(t) => setLink(t.target.value)}
        placeholder="Informe o link do video"
        value={link}
      />
      <button className="btnBaixar" onClick={() => getVideo()}>
        Procurar
      </button>
      { status === 'ok' ? (
        <div>
          <h1>{nameVideo}</h1>
          <a href={urlVideo} className="btnDownload" download>Baixar</a>
        </div>
      ) : null }
    </div>
  );
}

export default App;
