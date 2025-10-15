import React from "react";
import moment from "moment";
import _ from "lodash";


export default function Widget() {
  console.log("app2 widget sharescope", __webpack_share_scopes__);
  console.log("app2 lodash version:", _.VERSION);


  // Using lodash functions in the widget
  const sampleData = [10, 20, 30, 40, 50];
  const shuffledData = _.shuffle([...sampleData]);
  const maxValue = _.max(sampleData);
  const minValue = _.min(sampleData);
  const average = _.mean(sampleData);



  return (
    <div
      style={{
        borderRadius: "4px",
        padding: "2em",
        backgroundColor: "red",
        color: "white",
      }}
      data-e2e="APP_2__WIDGET"
    >
      <h2>App 2 Widget - MF-Enhanced</h2>
      <p>
        Moment shouldn't download twice, the host has no moment.js <br />{" "}
        {moment().format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <div style={{ marginTop: "1em", fontSize: "0.9em" }}>
        <p>
          <strong>Lodash Demo in Widget:</strong>
        </p>
        <p>Original: [{sampleData.join(", ")}]</p>
        <p>Shuffled: [{shuffledData.join(", ")}]</p>
        <p>
          Max: {maxValue}, Min: {minValue}, Avg: {average}
        </p>


      </div>
    </div>
  );
}
