import React, { useState, Suspense } from "react";
import _ from "lodash";

console.log(
  "hostbuildtime sharescope",
  __webpack_share_scopes__
);
console.log("hostbuildtime lodash version:", _.VERSION);

// Import remotes using React.lazy for static remotes
const App2Widget = React.lazy(() => import("app2/Widget"));
const App3Widget = React.lazy(() => import("app3/Widget"));

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const setApp2 = () => {
    setActiveComponent("app2");
  };

  const setApp3 = () => {
    setActiveComponent("app3");
  };



  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host - MF-Enhanced</h1>
      <h2>Using build plugin</h2>
      <p>
        The Dynamic System will take advantage of Module Federation{" "}
        <strong>remotes</strong> and <strong>exposes</strong>. It will not load
        components that have already been loaded.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>

      <div style={{ marginTop: "2em" }}>
        <Suspense fallback="Loading System">
          {activeComponent === "app2" && <App2Widget />}
          {activeComponent === "app3" && <App3Widget />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
