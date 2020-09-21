import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { get } from "./api/api.js";

import Foyer from "./Foyer.js";
import ExhibitionLayout from "./layouts/ExhibitionLayout.js";

const App = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    get("site/sections/exhibitions").then(d => {
      setContent(d);
    });
  }, []);

  return (
    <Router>
      {/* <div className="app">{JSON.stringify(content)}</div> */}

      <Switch>
        {content.map(c => {
          return (
            <Route key={c.id} path={`/${c.id}`}>
              <ExhibitionLayout id={c.id} />
            </Route>
          );
        })}

        <Route path="/">
          <Foyer exhibitions={content} />
        </Route>
      </Switch>
    </Router>
  );
};

const mount = document.querySelector("#mount");
ReactDOM.render(<App />, mount);
