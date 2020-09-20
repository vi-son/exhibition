import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ExampleExhibit from "./ExampleExhibit.js";

import "../sass/exhibition.sass";

const StubContent = () => {
  return (
    <>
      <h2>Exhibition Prototype</h2>
      <article>
        Thought experiments (Gedankenexperimenten) are “facts” in the sense that
        they have a “real life” correlate in the form of electrochemical
        activity in the brain. But it is quite obvious that they do not relate
        to facts “out there”. They are not true statements. But do they lack
        truth because they do not relate to facts? How are Truth and Fact
        interrelated?
      </article>
      <h4>Peace On Earth A Wonderful Wish But No Way</h4>
      <small>
        Instinctively, the answer is yes. We cannot conceive of a thought
        divorced from brainwaves. A statement which remains a mere potential
        seems to exist only in the nether land between truth and falsity. It
        becomes true only by materializing, by occurring, by matching up with
        real life. If we could prove that it will never do so, we would have
        felt justified in classifying it as false. This is the outgrowth of
        millennia of concrete, Aristotelian logic. Logical statements talk about
        the world and, therefore, if a statement cannot be shown to relate
        directly to the world, it is not true. This approach, however, is the
        outcome of some underlying assumptions: First, that the world is finite
        and also close to its end. To say that something that did not happen
        cannot be true is to say that it will never happen (i.e., to say that
        time and space – the world – are finite and are about to end
        momentarily).
      </small>
      <img src="https://images.unsplash.com/photo-1555443805-658637491dd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1232&q=80" />
    </>
  );
};

const App = () => {
  const [meta, setMeta] = useState(true);

  return (
    <div className="exhibition">
      <div className="meta">
        <div className={["left", meta ? "" : "out"].join(" ")}>
          <StubContent />
        </div>
        <div className={["right", meta ? "" : "out"].join(" ")}></div>
        <div className={["top", meta ? "" : "out"].join(" ")}></div>
        <div className={["bottom", meta ? "" : "out"].join(" ")}></div>
      </div>
      <ExampleExhibit
        onCanvas={() => setMeta(false)}
        meta={!meta}
        onBack={() => setMeta(!meta)}
      />
    </div>
  );
};

const mount = document.querySelector("#mount");
ReactDOM.render(<App />, mount);
