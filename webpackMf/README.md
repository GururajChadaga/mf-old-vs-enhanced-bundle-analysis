# WebpackMF - Original Module Federation Comparison

This directory contains the same application setup as the `enhanced/` directory, but uses the original webpack ModuleFederationPlugin instead of `@module-federation/enhanced`.

## Purpose

This setup allows for direct comparison of bundle sizes and performance between:
- **Original Webpack Module Federation** (this directory)
- **Enhanced Module Federation** (../enhanced directory)

## Key Differences

### Module Federation Plugin Import
```javascript
// webpackmf (this directory) - Original webpack
const { ModuleFederationPlugin } = require("webpack").container;

// enhanced directory - Enhanced version
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
```

### Bundle Analysis Reports
Each app generates bundle analysis reports with `webpackmf-` prefix:
- `webpackmf-app2-bundle-report.html`
- `webpackmf-app3-bundle-report.html`
- `webpackmf-hostbuildtime-bundle-report.html`
- `webpackmf-customdep-bundle-report.html`

## Apps Included

1. **hostbuildtime** - Host application with build-time module federation
2. **app2** - Remote application exposing Widget component
3. **app3** - Remote application exposing Widget component
4. **customdep** - Custom dependency library

## Usage

```bash
# Install dependencies
npm install

# Start all apps in development mode
npm start

# Build all apps and generate bundle analysis reports
npm run build

# Clean dist folders
npm run cleandist

# Clean node_modules
npm run cleanmodules

# Clean everything
npm run cleanall
```

## Comparison Analysis

After building both directories, compare the bundle analysis reports:
- Size differences between original and enhanced module federation
- Bundle composition differences
- Dependency analysis
- Performance implications

The reports will be generated in each app's `dist/` folder and can be opened in a browser for detailed analysis.
