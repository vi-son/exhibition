import React from "react";

import Audioplayer from "../../AudioPlayer.js";

import { kt } from "../../utils/kirbytext.js";

const Audioblock = ({ content }) => {
  return (
    <section className="block-audio">
      {/* <audio controls> */}
      {/*   {content.audiofile.length > 0 ? ( */}
      {/*     <source */}
      {/*       src={content.audiofile[0].url} */}
      {/*       type={`${content.audiofile[0].type}/mp3`} */}
      {/*     /> */}
      {/*   ) : ( */}
      {/*     <source /> */}
      {/*   )} */}
      {/* </audio> */}
      <Audioplayer audiosrc={content.audiofile[0].url} />
      <article>{kt(content.text)}</article>
    </section>
  );
};

export default Audioblock;
