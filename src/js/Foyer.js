import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { get } from "./api/api.js";

export default ({ exhibitions }) => {
  return (
    <div>
      <h1>Foyer</h1>
      <h2>Exhibition Rooms:</h2>
      {exhibitions.map(entry => {
        return (
          <div key={entry.id}>
            <Link to={`/${entry.id}`}>{entry.text}</Link>
          </div>
        );
      })}
    </div>
  );
};
