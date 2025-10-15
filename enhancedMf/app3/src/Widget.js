import React, { useEffect, useRef } from "react";
import moment from "moment";
import _ from "lodash";
import { Chart, registerables } from "chart.js";
import * as THREE from "three";

Chart.register(...registerables);


export default function Widget() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const threeRef = useRef(null);
  const threeScene = useRef(null);

  console.log("app3 widget sharescope", __webpack_share_scopes__);
  console.log("app3 lodash version:", _.VERSION);
  console.log("app3 Chart.js version:", Chart.version);
  console.log("app3 Three.js version:", THREE.REVISION);

  // Using different lodash functions in app3 widget
  const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
  const capitalizedFruits = _.map(fruits, _.capitalize);
  const randomFruit = _.sample(fruits);
  const groupedByLength = _.groupBy(fruits, "length");
  const uniqueLengths = _.uniq(_.map(fruits, "length"));

  useEffect(() => {
    console.log("hooks");

    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a doughnut chart showing fruit lengths
      const lengthCounts = _.countBy(fruits, "length");
      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: Object.keys(lengthCounts).map(len => `${len} chars`),
          datasets: [{
            label: 'Fruit Name Lengths',
            data: Object.values(lengthCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
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
  }, [fruits]);

  // Three.js scene setup
  useEffect(() => {
    if (threeRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: threeRef.current });
      renderer.setSize(250, 250);

      // Create a spinning torus
      const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: 0x9932cc, wireframe: true });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      camera.position.z = 4;

      const animate = () => {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();

      threeScene.current = { scene, camera, renderer, torus };
    }

    return () => {
      if (threeScene.current) {
        threeScene.current.renderer.dispose();
      }
    };
  }, []);

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
      <h2>App 3 Widget - MF-Enhanced</h2>
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

        <div style={{ marginTop: "1em" }}>
          <p><strong>Chart.js Demo:</strong></p>
          <canvas ref={chartRef} style={{ maxWidth: "250px", maxHeight: "250px" }}></canvas>
        </div>
        <div style={{ marginTop: "1em" }}>
          <p><strong>Three.js Demo:</strong></p>
          <canvas ref={threeRef} style={{ border: "1px solid white" }}></canvas>
        </div>


      </div>
    </div>
  );
}
