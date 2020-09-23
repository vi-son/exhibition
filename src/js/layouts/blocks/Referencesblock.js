import React from "react";

const Referencesblock = ({ content }) => {
  return (
    <section className="block-references">
      <ul>
        {content.referencesruct.map(ref => {
          return (
            <li>
              {ref.footnote} {ref.labeltext}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Referencesblock;
