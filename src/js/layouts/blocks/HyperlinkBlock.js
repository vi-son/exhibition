import React from "react";

import { kt } from "../../utils/kirbytext.js";

const HyperlinkBlock = ({ content }) => {
  return (
    <section className="block-hyperlinks">
      <div className="flex">
        {content.links.map(l => {
          return (
            <a href={l.link} className="link" target="_blank">
              {l.text}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default HyperlinkBlock;
