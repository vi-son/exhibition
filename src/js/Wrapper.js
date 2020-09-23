import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ExampleExhibit from "./ExampleExhibit.js";

import "../sass/exhibition.sass";

const Wrapper = ({ children }) => {
  const [meta, setMeta] = useState(true);

  return (
    <div className="exhibition">
      <div className="meta">
        <div className={["left", meta ? "" : "out"].join(" ")}>{children}</div>
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

export default Wrapper;
