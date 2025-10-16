# Module Federation Bundle Size Comparison

This repository compares bundle sizes and performance between the **original Webpack Module Federation plugin** and the **new Enhanced Module Federation plugin** using identical React applications with heavy shared dependencies.

## 🎯 Purpose

- **Compare bundle sizes** between `webpack.container.ModuleFederationPlugin` (old) vs `@module-federation/enhanced` (new)
- **Analyze shared dependency efficiency** with realistic heavy libraries
- **Benchmark performance** of both implementations with identical functionality
- **Provide reproducible test cases** for Module Federation optimization

## 📁 Repository Structure

```
mf-old-vs-enhanced-bundle-analysis/
├── enhancedMf/                    # Enhanced Module Federation Implementation
│   ├── hostbuildtime/             # Host application (port 3000)
│   ├── app2/                      # Remote application 2 (port 3002)
│   ├── app3/                      # Remote application 3 (port 3003)
│   └── package.json               # Workspace configuration
├── webpackMf/                     # Standard Module Federation implementation
│   ├── hostbuildtime/             # Host application (port 3000)
│   ├── app2/                      # Remote application 2 (port 3002)
│   ├── app3/                      # Remote application 3 (port 3003)
│   └── package.json               # Workspace configuration
└── README.md
```

## 🔧 Shared Dependencies

Both implementations share the same heavy dependencies to create realistic bundle size comparisons:

| Library | Purpose |
|---------|---------|
| **React + React-DOM** | Core framework |
| **Three.js** | 3D graphics library |
| **Chart.js** | Charting library |
| **Lodash** | Utility library |
| **TanStack Query** | Data fetching library |
| **Moment.js** | Date manipulation |

## 🚀 Quick Start

### Running Enhanced Module Federation

```bash
# Navigate to enhanced implementation
cd enhancedMf

# Install dependencies
npm install

# Start all applications (host + remotes)
npm start
```

**Access points:**
- **Host**: http://localhost:3000
- **App2**: http://localhost:3002
- **App3**: http://localhost:3003

### Running Standard Module Federation

```bash
# Navigate to standard implementation
cd webpackMf

# Install dependencies
npm install

# Start all applications (host + remotes)
npm start
```

**Access points:**
- **Host**: http://localhost:3000
- **App2**: http://localhost:3002
- **App3**: http://localhost:3003

## 📊 Bundle Analysis

### Build and Analyze

```bash
# Build enhanced version
cd enhancedMf && npm run build

# Build standard version
cd webpackMf && npm run build
```

### Bundle Reports

After building, webpack-bundle-analyzer generates static HTML reports that are now available for direct comparison between Enhanced MF and Standard MF implementations:

**Enhanced MF:**
- `enhancedMf/hostbuildtime/dist/enhancedmf-hostbuildtime-bundle-report.html`
- `enhancedMf/app2/dist/enhancedmf-app2-bundle-report.html`
- `enhancedMf/app3/dist/enhancedmf-app3-bundle-report.html`

**Standard MF:**
- `webpackMf/hostbuildtime/dist/webpackmf-hostbuildtime-bundle-report.html`
- `webpackMf/app2/dist/webpackmf-app2-bundle-report.html`
- `webpackMf/app3/dist/webpackmf-app3-bundle-report.html`

Open these HTML files in your browser to compare bundle sizes, chunk distribution, and shared dependency efficiency between the two Module Federation implementations.

## 🔍 Technical Implementation

### Module Federation Configuration

**Standard MF (webpackMf):**
```javascript
const { ModuleFederationPlugin } = require("webpack").container;
```

**Enhanced MF (enhancedMf):**
```javascript
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
```

## 🛠 Development Commands

### Clean Commands

Both implementations include clean commands for maintenance:

```bash
# Clean all node_modules and dist directories
npm run cleanall

# Clean all dist directories
npm run cleandist

# Clean dist directories and rebuild
npm run cleanbuild

# Clean dist directories and start fresh
npm run cleanstart
```

### Troubleshooting

**Port conflicts:**
```bash
# Kill processes using MF ports
lsof -ti:3000,3002,3003 | xargs kill -9
```

**Dependency issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```
