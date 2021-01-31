import React from "react";
import { Link } from "react-router-dom";

const Room = ({ exhibit }) => {
  const pictureUrl =
    exhibit.content.titleimage.length > 0
      ? exhibit.content.titleimage[0].url
      : "";
  return (
    <a href={exhibit.content.externalURL}>
      <div
        className={[
          "exhibition-entry",
          !exhibit.content.active ? "draft" : "",
          exhibit.content.type,
        ].join(" ")}
      >
        {exhibit.content.type === "art" ? (
          <div
            className="title-image"
            style={{
              backgroundImage: `url(${pictureUrl})`,
            }}
          />
        ) : (
          <></>
        )}
        <div className="column">
          <h6 className="title">
            {exhibit.content.type === "art" ? "Exponat" : "Begleitprogramm"}
          </h6>
          <h3 className="title">{exhibit.content.title}</h3>
          <article className="shortdescription">
            {exhibit.content.shortdescription}
          </article>
          {exhibit.content.active ? <></> : <h6>Demnächst verfügbar</h6>}
        </div>
      </div>
    </a>
  );
};

export default Room;
