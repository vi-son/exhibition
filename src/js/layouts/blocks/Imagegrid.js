import React from "react";

const Imagegrid = ({ content }) => {
  return (
    <section className="block-imagegrid">
      {content.image.map(img => {
        return <img key={img.id} src={img.url} />;
      })}
    </section>
  );
};

export default Imagegrid;
