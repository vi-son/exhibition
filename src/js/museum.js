// node_modules imports
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Local imports
import { get } from "./api/api.js";
import Foyer from "./foyer/Foyer.js";
import LocalRoom from "./foyer/LocalRoom.js";
// Style imports
import "@sass/museum.sass";

const Museum = () => {
  const [content, setContent] = useState([]);

  const initServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Serviceworker registered: ", registration);
          })
          .catch((registrationError) => {
            console.log(
              "Serviceworker registration failed: ",
              registrationError
            );
          });
      });
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      initServiceWorker();
    }
    get("site/children").then((pages) => {});
    get("site/children?select=id,title,content,blueprint").then((pages) => {
      const exhibitions = pages
        .filter((p) => p.blueprint.title === "Exhibit")
        .sort((a, b) => {
          return a.content.order - b.content.order;
        });
      setContent(exhibitions);
    });
  }, []);

  return (
    <Router>
      <Switch>
        {content
          .filter((e) => e.type !== "meta")
          .map((e) => {
            return (
              <Route key={e.id} path={`/${e.id}`}>
                <LocalRoom content={e} />
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

ReactDOM.render(<Museum />, document.querySelector("#mount"));
