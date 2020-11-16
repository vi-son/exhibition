import React from "react";

import { kt } from "../../utils/kirbytext.js";

const VideoEmedBlock = ({ content }) => {
  return (
    <section className="block-video-embed">
      <div className="grid">
        <div className="iframe-wrapper">
          <iframe
            src={content.video}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            muted
          ></iframe>
        </div>
        <article className="right-side">{kt(content.text)}</article>
      </div>
    </section>
  );
};

export default VideoEmedBlock;
