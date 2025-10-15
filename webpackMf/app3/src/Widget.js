import React from "react";
import moment from "moment";
import _ from "lodash";


export default function Widget() {
  console.log("app3 widget sharescope", __webpack_share_scopes__);
  console.log("app3 lodash version:", _.VERSION);


  React.useEffect(() => {
    console.log("hooks");
  }, []);

  // Using different lodash functions in app3 widget
  const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
  const capitalizedFruits = _.map(fruits, _.capitalize);
  const randomFruit = _.sample(fruits);
  const groupedByLength = _.groupBy(fruits, "length");
  const uniqueLengths = _.uniq(_.map(fruits, "length"));



  return (
    <div
      style={{
        borderRadius: "4px",
        padding: "2em",
        backgroundColor: "purple",
        color: "white",
      }}
      data-e2e="APP_3__WIDGET"
    >
      <h2>App 3 Widget - MF-Webpack</h2>
      <p>
        Using <strong>momentjs</strong> for format the date
      </p>
      <p>{moment().format("MMMM Do YYYY, h:mm:ss a")}</p>

      <div style={{ marginTop: "1em", fontSize: "0.9em" }}>
        <p>
          <strong>Lodash Demo in App3 Widget:</strong>
        </p>
        <p>Fruits: {fruits.join(", ")}</p>
        <p>Capitalized: {capitalizedFruits.join(", ")}</p>
        <p>Random fruit: {randomFruit}</p>
        <p>Unique lengths: {uniqueLengths.sort().join(", ")}</p>
        <p>Grouped by length: {JSON.stringify(groupedByLength)}</p>


      </div>
    </div>
  );
}
