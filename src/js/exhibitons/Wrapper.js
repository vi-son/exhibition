// node_modules imports
import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
// Style imports
import "../../sass/exhibition.sass";
// Lazy imports
import ExampleExhibit from "./ExampleExhibit.js";
import Logo from "exhibition.logo/js/index.js";
// const AudiovisIO = lazy(() =>
//   import("exhibition.audiovisio/js/audiovis.io.js")
// );

const Wrapper = ({ children, exhibitionComponent }) => {
  const [meta, setMeta] = useState(true);

  const LazyContent = () => {
    switch (exhibitionComponent) {
      case "Logo":
        return (
          <Logo
            onEnter={() => setMeta(false)}
            entered={!meta}
            onBack={() => setMeta(!meta)}
          />
        );
      case "ExampleExhibit":
        return <ExampleExhibit />;
      case "AudiovisIO":
        return (
          <ExampleExhibit
            onEnter={() => setMeta(false)}
            meta={!meta}
            onBack={() => setMeta(!meta)}
          />
        );
      default:
        return <div>No Content.</div>;
    }
  };

  return (
    <div className="exhibition">
      <div className="meta">
        <div className={["left", meta ? "" : "out"].join(" ")}>{children}</div>
        <div className={["right", meta ? "" : "out"].join(" ")}></div>
        <div className={["top", meta ? "" : "out"].join(" ")}></div>
        <div className={["bottom", meta ? "" : "out"].join(" ")}></div>
      </div>
      <LazyContent />
    </div>
  );
};

export default Wrapper;
