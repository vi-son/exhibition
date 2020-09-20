import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { get } from "./api/api.js";

const Lobby = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    get("site/sections/exhibitions").then(d => {
      setContent(d);
    });
  }, []);

  return (
    <Router>
      <div>
        <h1>Lobby</h1>
        <h2>Exhibition Rooms:</h2>
        {content.map(e => {
          return <h4 key={e.id}>{e.text}</h4>;
        })}
      </div>
    </Router>
  );
};

const mount = document.querySelector("#mount");
ReactDOM.render(<Lobby />, mount);
