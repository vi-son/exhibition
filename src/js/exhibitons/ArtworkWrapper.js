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
import AudiovisIO from "artwork.audiovisio/js/audiovis.io.js";

const ArtworkWrapper = ({ children, exhibitionComponent, content }) => {
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
        return <a to="https://audiovisio.mixing-senses.art" />;
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
        {content.content.type === "art" ? (
          <button
            className={["btn-to-artwork", meta ? "visible" : "hidden"].join(
              " "
            )}
            onClick={() => {
              if (exhibitionComponent === "AudiovisIO") {
                window.location = "https://audiovisio.mixing-senses.art";
              } else {
                setMeta(false);
              }
            }}
          >
            Zum Exponat
            <IconForward />
          </button>
        ) : (
          <></>
        )}
      </div>
      {content.content.type === "art" ? <SelectedArtwork /> : <></>}
    </div>
  );
};

export default ArtworkWrapper;
