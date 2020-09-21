import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { get } from "../api/api.js";

export default ({ id }) => {
  const [content, setContent] = useState({});
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    get(`/pages/${id}`).then(d => {
      setContent(d);
      setBlocks(d.content.blocks);
    });
  }, []);

  return (
    <div>
      <Link className="btn" to="/">
        Zurück
      </Link>
      <h2>{content.title}</h2>
      <br />
      {blocks.map(b => {
        return <section key={b._uid}>{b._key}</section>;
      })}
    </div>
  );
};
