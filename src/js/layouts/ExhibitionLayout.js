// node_modules imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Local imports
import Wrapper from "../exhibitons/Wrapper.js";
import Textblock from "./blocks/Textblock.js";
import Imageblock from "./blocks/Imageblock.js";
import Imagegrid from "./blocks/Imagegrid.js";
import Audioblock 
import Referencesblock from "./blocks/Referencesblock.js";

import { get, BASE_URL } from "../api/api.js";

import "../../sass/ExhibitionLayout.sass";

export default ({ id }) => {
  const [content, setContent] = useState({});
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    get(`/pages/${id}`).then(d => {
      setContent(d);
      setBlocks(d.content.blocks);
    });
  }, []);

  return (
    <Wrapper
      exhibitionComponent={
        content.content ? content.content.exhibitioncomponent : null
      }
    >
      <div className="layout-exhibition">
        <Link className="button-back" to="/">
          Zurück
        </Link>
        <br />
        {blocks.map(block => {
          switch (block._key) {
            case "textblock":
              return <Textblock key={block._uid} content={block} />;
              break;
            case "imageblock":
              return <Imageblock key={block._uid} content={block} />;
              break;
            case "imagegrid":
              return <Imagegrid key={block._uid} content={block} />;
              break;
            case "audioblock":
              return <Audioblock key={block._uid} content={block} />;
              break;
            case "references":
              return <Referencesblock key={block._uid} content={block} />;
              break;
            default:
              return <section key={block._uid}>{block._key}</section>;
              break;
          }
        })}
      </div>
    </Wrapper>
  );
};
