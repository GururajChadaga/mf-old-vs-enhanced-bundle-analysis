import React, { useState, Suspense, useEffect, useRef } from "react";
import _ from "lodash";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

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
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const setApp2 = () => {
    setActiveComponent("app2");
  };

  const setApp3 = () => {
    setActiveComponent("app3");
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a simple bar chart showing lodash usage
      const data = [1, 2, 3, 4, 5];
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
          datasets: [{
            label: 'Lodash Stats Demo',
            data: [_.min(data), _.nth(data, 1), _.nth(data, 2), _.nth(data, 3), _.max(data)],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  console.log("Chart.js version:", Chart.version);



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

      <div style={{ marginBottom: "2em" }}>
        <h3>Chart.js Demo (Shared Library)</h3>
        <canvas ref={chartRef} style={{ maxWidth: "400px", maxHeight: "200px" }}></canvas>
      </div>

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
