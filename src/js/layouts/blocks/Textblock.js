import React from "react";

import { kt } from "../../utils/kirbytext.js";

const Textblock = ({ content }) => {
  return (
    <section className="block-text">
      {content.preheadline !== undefined ? (
        <h4 className="preheading">{content.preheadline}</h4>
      ) : (
        <></>
      )}
      {content.headline !== undefined ? (
        <h2 className="heading">{content.headline}</h2>
      ) : (
        <></>
      )}
      {content.text !== undefined ? (
        <article className="text">{kt(content.text)}</article>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Textblock;
