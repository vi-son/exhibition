import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { get, BASE_URL } from "../api/api.js";

import "../../sass/_blocks.sass";

function bold(text) {
  const findBold = /(\*+\w+ \w+\*+)/;
  return text.split(findBold).map((substr, i) => {
    if (substr.includes("**")) {
      return <b key={i}>{substr.replaceAll("**", "")}</b>;
    } else {
      return substr;
    }
  });
}

function italic(text) {
  const findItalic = /( \*\w+ \w+\* )/;
  return text.split(findItalic).map((substr, i) => {
    if (substr[1] === "*") {
      return <i key={i}>{substr.replaceAll("*", "")}</i>;
    } else {
      return bold(substr);
    }
  });
}

function kt(text) {
  return italic(text);
}

const Textblock = ({ content }) => {
  return (
    <section className="block-text">
      <h4>{content.preheadline}</h4>
      <h2>{content.headline}</h2>
      <article>{kt(content.text)}</article>
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

const Audioblock = ({ content }) => {
  return (
    <section className="block-audio">
      <audio controls>
        <source
          src={content.audiofile[0].url}
          type={`${content.audiofile[0].type}/mp3`}
        />
      </audio>
      <article>{content.text}</article>
    </section>
  );
};

const Referencesblock = ({ content }) => {
  return (
    <section className="block-references">
      <ul>
        {content.referencesruct.map(ref => {
          return (
            <li>
              {ref.footnote} {ref.labeltext}
            </li>
          );
        })}
      </ul>
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
  );
};
