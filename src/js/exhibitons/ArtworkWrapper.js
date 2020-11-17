// node_modules imports
import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
// Style imports
import "../../sass/exhibitions/ArtworkWrapper.sass";
// SVG imports
import IconForward from "../../../assets/svg/forward.light.svg";
// Artwork imports
import Artwork from "./Artwork.js";
import Logo from "artwork.logo/js/Logo.js";
// import AudiovisIO from "artwork.audiovisio/js/Audiovis.IO.js";

const ArtworkWrapper = ({ children, exhibitionComponent }) => {
  const [meta, setMeta] = useState(true);

  const SelectedArtwork = () => {
    switch (exhibitionComponent) {
      case "Logo":
        return (
          <Logo
            onEnter={() => setMeta(false)}
            entered={!meta}
            onBack={() => setMeta(!meta)}
          />
        );
        break;
      case "AudiovisIO":
        return (
          <Artwork
            onEnter={() => setMeta(false)}
            entered={true}
            onBack={() => setMeta(true)}
          />
        );
        break;
      default:
        return <div>No Content.</div>;
    }
  };

  return (
    <div className="artwork-wrapper">
      <div className="meta">
        <div className={["left", meta ? "" : "out"].join(" ")}>{children}</div>
        <div className={["right", meta ? "" : "out"].join(" ")}></div>
        <div className={["top", meta ? "" : "out"].join(" ")}></div>
        <div className={["bottom", meta ? "" : "out"].join(" ")}></div>
        <button
          className={["btn-to-artwork", meta ? "visible" : "hidden"].join(" ")}
          onClick={() => setMeta(false)}
        >
          Zum Kunstwerk
          <IconForward />
        </button>
      </div>
      <SelectedArtwork />
    </div>
  );
};

export default ArtworkWrapper;