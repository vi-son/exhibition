import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ExampleExhibit from "./ExampleExhibit.js";

import "../sass/exhibition.sass";

const App = () => {
  const [meta, setMeta] = useState(true);

  useEffect(() => {
    const URL = "http://127.0.0.1:8888/api";
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic aGFydmVzdGVyQG1peGluZy1zZW5zZXMuYXJ0OiViRnM0TXI1SmNyfW9YcjVScERSQE5EcHNgUHpUYg=="
    );
    fetch(`${URL}/site/sections/exhibitions`, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: headers
    })
      .then(r => r.json())
      .then(json => json.data)
      .then(data => console.log(data))
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <div className="exhibition">
      <div className="meta">
        <div className={["left", meta ? "" : "out"].join(" ")}>
          Content Here.
        </div>
        <div className={["right", meta ? "" : "out"].join(" ")}></div>
        <div className={["top", meta ? "" : "out"].join(" ")}></div>
        <div className={["bottom", meta ? "" : "out"].join(" ")}></div>
      </div>
      <ExampleExhibit
        onCanvas={() => setMeta(false)}
        meta={!meta}
        onBack={() => setMeta(!meta)}
      />
    </div>
  );
};

const mount = document.querySelector("#mount");
ReactDOM.render(<App />, mount);
