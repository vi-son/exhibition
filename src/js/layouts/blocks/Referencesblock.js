import React from "react";

const Referencesblock = ({ content }) => {
  return (
    <section className="block-references">
      <ul>
        {content.referencesruct.map((ref, i) => {
          return (
            <li key={i}>
              {ref.footnote} {ref.labeltext}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Referencesblock;
