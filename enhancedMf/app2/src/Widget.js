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

  console.log("app2 widget sharescope", __webpack_share_scopes__);
  console.log("app2 lodash version:", _.VERSION);
  console.log("app2 Chart.js version:", Chart.version);
  console.log("app2 Three.js version:", THREE.REVISION);

  // Using lodash functions in the widget
  const sampleData = [10, 20, 30, 40, 50];
  const shuffledData = _.shuffle([...sampleData]);
  const maxValue = _.max(sampleData);
  const minValue = _.min(sampleData);
  const average = _.mean(sampleData);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a line chart showing the sample data
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
          datasets: [{
            label: 'Sample Data',
            data: sampleData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1
          }, {
            label: 'Shuffled Data',
            data: shuffledData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.1
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
  }, [sampleData, shuffledData]);

  // Three.js scene setup
  useEffect(() => {
    if (threeRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 300 / 150, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: threeRef.current });
      renderer.setSize(300, 150);

      // Create a spinning sphere
      const geometry = new THREE.SphereGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      camera.position.z = 3;

      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.02;
        sphere.rotation.y += 0.02;
        renderer.render(scene, camera);
      };
      animate();

      threeScene.current = { scene, camera, renderer, sphere };
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

        <div style={{ marginTop: "1em" }}>
          <p><strong>Chart.js Demo:</strong></p>
          <canvas ref={chartRef} style={{ maxWidth: "300px", maxHeight: "150px" }}></canvas>
        </div>
        <div style={{ marginTop: "1em" }}>
          <p><strong>Three.js Demo:</strong></p>
          <canvas ref={threeRef} style={{ border: "1px solid white" }}></canvas>
        </div>


      </div>
    </div>
  );
}
