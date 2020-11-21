// node_modules imports
import React from "react";
// Local imports
import Audioplayer from "../components/AudioPlayer.js";
import { kt } from "../../utils/kirbytext.js";

const Audioblock = ({ content }) => {
  return (
    <section className="block-audio">
      <Audioplayer
        audiosrc={
          content.audiofile !== undefined ? content.audiofile[0].url : ""
        }
      />
      <article>{content.text !== undefined ? kt(content.text) : ""}</article>
    </section>
  );
};

export default Audioblock;
