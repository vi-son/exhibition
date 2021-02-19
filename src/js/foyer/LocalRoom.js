import React from "react";
import { useHistory } from "react-router-dom";
import {
  CiteBlock,
  HyperlinkBlock,
  VideoEmedBlock,
  ReferencesBlock,
  AudioBlock,
  ImageGridBlock,
  ImageBlock,
  TextBlock,
  PodcastBlock,
  ButtonToExhibition,
} from "@vi.son/components";
// Style imports
import "@sass/6-components/LocalRoom.sass";

const LocalRoom = ({ content }) => {
  const history = useHistory();

  console.log(content.content);

  return (
    <div className="local-room">
      <div className="header">
        <h1 className="title">{content.title}</h1>
        <h2 className="subtitle">{content.content.shortdescription}</h2>
      </div>
      <div className="blocks">
        {content.content.blocks.map((block) => {
          switch (block._key) {
            case "textblock":
              return <TextBlock key={block._uid} content={block} />;
            case "imageblock":
              return <ImageBlock key={block._uid} content={block} />;
            case "imagegrid":
              return <ImageGridBlock key={block._uid} content={block} />;
            case "audioblock":
              return <AudioBlock key={block._uid} content={block} />;
            case "references":
              return <ReferencesBlock key={block._uid} content={block} />;
            case "videoembed":
              return <VideoEmedBlock key={block._uid} content={block} />;
            case "hyperlinks":
              return <HyperlinkBlock key={block._uid} content={block} />;
            case "citeblock":
              return <CiteBlock key={block._uid} content={block} />;
            case "podcastblock":
              return <PodcastBlock key={block._uid} content={block} />;
            default:
              return <></>;
          }
        })}
      </div>
      <ButtonToExhibition withText light onClick={() => history.push("/")} />
    </div>
  );
};

export default LocalRoom;
