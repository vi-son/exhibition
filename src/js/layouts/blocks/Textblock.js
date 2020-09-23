import React from "react";

import { kt } from "../../utils/kirbytext.js";

const Textblock = ({ content }) => {
  return (
    <section className="block-text">
      <h4 className="preheading">{content.preheadline}</h4>
      <h2 className="heading">{content.headline}</h2>
      <article className="text">{kt(content.text)}</article>
    </section>
  );
};

export default Textblock;
