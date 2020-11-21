import React from "react";

import { kt } from "../../utils/kirbytext.js";

const Citeblock = ({ content }) => {
  return (
    <section className="block-cite">
      <a className="link" href={content.link} target="_blank">
        <blockquote className="cite" cite={content.link}>
          {content.cite !== undefined ? kt(content.cite) : ""}
        </blockquote>
        <h2 className="author">
          {content.author !== undefined ? content.author : ""}
        </h2>
      </a>
    </section>
  );
};

export default Citeblock;
