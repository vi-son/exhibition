// node_modules imports
import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
// Style imports
import "../../sass/exhibition.sass";
// Artwork imports
import Artwork from "./Artwork.js";
// import Logo from "artwork.logo/js/index.js";
// import AudiovisIO from "artwork.audiovisio/js/Audiovis.IO.js";

const Wrapper = ({ children, exhibitionComponent }) => {
  const [meta, setMeta] = useState(true);

  const Artwork = () => {
    switch (exhibitionComponent) {
      case "Logo":
        return (
          <Artwork
            onEnter={() => setMeta(false)}
            entered={!meta}
            onBack={() => setMeta(!meta)}
          />
        );
      case "AudiovisIO":
        return (
          <Artwork
            onEnter={() => setMeta(false)}
            entered={true}
            goBack={() => {
              console.log("Back?", meta);
              setMeta(true);
            }}
          />
        );
      default:
        return <div>No Content.</div>;
    }
  };

  useEffect(() => {
    console.log(meta);
  }, [meta]);

  return (
    <div className="exhibition">
      <div className="meta">
        <div className={["left", meta ? "" : "out"].join(" ")}>{children}</div>
        <div className={["right", meta ? "" : "out"].join(" ")}></div>
        <div className={["top", meta ? "" : "out"].join(" ")}></div>
        <div className={["bottom", meta ? "" : "out"].join(" ")}></div>
      </div>
      <Artwork />
    </div>
  );
};

export default Wrapper;
