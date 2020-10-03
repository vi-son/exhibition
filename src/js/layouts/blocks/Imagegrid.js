import React from "react";

const Imagegrid = ({ content }) => {
  return (
    <section className="block-imagegrid">
      {content.image.map(img => {
        return (
          <a href={img.url} target="_blank">
            <img key={img.id} src={img.url} />
          </a>
        );
      })}
    </section>
  );
};

export default Imagegrid;
