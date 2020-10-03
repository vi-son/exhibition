import React from "react";

import { kt } from "../../utils/kirbytext.js";

const Imageblock = ({ content }) => {
  const imageUrl = content.image.length > 0 ? `${content.image[0].url}` : "";
  return (
    <section className="block-image">
      <div className="left-side">
        <a href={imageUrl} target="_blank">
          <img src={imageUrl} />
        </a>
      </div>
      <small className="right-side">{kt(content.text)}</small>
    </section>
  );
};

export default Imageblock;
