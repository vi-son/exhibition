import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { get, BASE_URL } from "../api/api.js";

import "../../sass/_blocks.sass";

const Textblock = ({ content }) => {
  return (
    <section className="block-text">
      <h4>{content.preheadline}</h4>
      <h2>{content.headline}</h2>
      <article>{content.text}</article>
    </section>
  );
};

const Imageblock = ({ content }) => {
  const imageUrl = content.image.length > 0 ? `${content.image[0].url}` : "";
  return (
    <section className="block-image">
      <div className="left-side">
        <img src={imageUrl} />
      </div>
      <div className="right-side">{content.text}</div>
    </section>
  );
};

const Imagegrid = ({ content }) => {
  return (
    <section className="block-imagegrid">
      {content.image.map(img => {
        return <img key={img.id} src={img.url} />;
      })}
    </section>
  );
};

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
    <div>
      <Link className="btn" to="/">
        Zurück
      </Link>
      <h2>{content.title}</h2>
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
          default:
            return <section key={block._uid}>{block._key}</section>;
            break;
        }
      })}
    </div>
  );
};
