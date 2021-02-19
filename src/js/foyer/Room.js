import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ id, children, url, active, type }) => {
  if (type === "art") {
    return active ? <a href={url}>{children}</a> : <div>{children}</div>;
  }
  if (type === "meta") {
    return <Link to={id}>{children}</Link>;
  } else {
    return <div>{children}</div>;
  }
};

const Room = ({ exhibit }) => {
  const externalUrl = exhibit.content.subdomain;
  const pictureUrl =
    exhibit.content.titleimage.length > 0
      ? exhibit.content.titleimage[0].url
      : "";

  return (
    <Wrapper
      id={exhibit.id}
      url={externalUrl}
      active={exhibit.content.active}
      type={exhibit.content.type}
    >
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
          <h6 className="type">
            {exhibit.content.type === "art" ? "Exponat" : "Begleitprogramm"}
          </h6>
          <h3 className="title">{exhibit.content.title}</h3>
          <article className="shortdescription">
            {exhibit.content.shortdescription}
          </article>
          {exhibit.content.active ? <></> : <h6>Demnächst verfügbar</h6>}
        </div>
      </div>
    </Wrapper>
  );
};

export default Room;
