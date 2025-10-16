import React, { useState, Suspense, useEffect, useRef } from "react";
import _ from "lodash";
import { Chart, registerables } from "chart.js";
import * as THREE from "three";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

Chart.register(...registerables);

// Create a client
const queryClient = new QueryClient();

console.log(
  "hostbuildtime sharescope",
  __webpack_share_scopes__
);
console.log("hostbuildtime lodash version:", _.VERSION);

// Import remotes using React.lazy for static remotes
const App2Widget = React.lazy(() => import("app2/Widget"));
const App3Widget = React.lazy(() => import("app3/Widget"));

// Mock API function
const fetchAppStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalUsers: _.random(1000, 5000),
    activeApps: 3,
    lastUpdated: new Date().toISOString(),
  };
};

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const threeRef = useRef(null);
  const threeScene = useRef(null);

  // TanStack Query usage
  const { data: appStats, isLoading, error } = useQuery({
    queryKey: ['appStats'],
    queryFn: fetchAppStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

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

  // Three.js scene setup
  useEffect(() => {
    if (threeRef.current) {
      // Create scene, camera, renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 400 / 200, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: threeRef.current });
      renderer.setSize(400, 200);

      // Create a rotating cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();

      threeScene.current = { scene, camera, renderer, cube };
    }

    return () => {
      if (threeScene.current) {
        threeScene.current.renderer.dispose();
      }
    };
  }, []);

  console.log("Chart.js version:", Chart.version);
  console.log("Three.js version:", THREE.REVISION);
  console.log("TanStack Query data:", appStats);



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

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2em",
        marginBottom: "2em"
      }}>
        <div>
          <h3>Chart.js Demo (Shared Library)</h3>
          <canvas ref={chartRef} style={{ maxWidth: "100%", maxHeight: "200px" }}></canvas>
        </div>

        <div>
          <h3>Three.js Demo (Shared Library)</h3>
          <canvas ref={threeRef} style={{ border: "1px solid #ccc", maxWidth: "100%" }}></canvas>
        </div>

        <div>
          <h3>TanStack Query Demo (Shared Library)</h3>
          {isLoading && <p>Loading app stats...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
          {appStats && (
            <div style={{ padding: "1em", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
              <p><strong>Total Users:</strong> {appStats.totalUsers.toLocaleString()}</p>
              <p><strong>Active Apps:</strong> {appStats.activeApps}</p>
              <p><strong>Last Updated:</strong> {new Date(appStats.lastUpdated).toLocaleTimeString()}</p>
            </div>
          )}
        </div>

        <div>
          {/* Empty cell for 2x2 grid */}
        </div>
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

// Wrap App with QueryClientProvider
function AppWithQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWithQuery;
