import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { get } from "./api/api.js";

import Foyer from "./Foyer.js";
import ExhibitionLayout from "./layouts/ExhibitionLayout.js";

const App = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    get("site/children").then(pages => {
      console.log(pages);
    });
    get("site/children?select=id,title,content,blueprint").then(pages => {
      const exhibitions = pages
        .filter(p => p.blueprint.title === "Exhibit")
        .sort((a, b) => {
          return a.content.order - b.content.order;
        });
      setContent(exhibitions);
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
