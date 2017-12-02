const WebpackMonitor = require('webpack-monitor');

exports.monitor = {
  capture: true, // will collect stats on the build where meaningful changes have occured
  target: '../.monitor/stats.json', // specify where to save your build data
  launch: true, // will fire up a local server and launch the webpack monitor analysis tool
  port: 8081, // optionally set the port for local server
};

exports.build = {
  webpack: (webpackConfig, webpack, config) => {
    const { capture, target } = config.monitor;
    webpackConfig.plugins.push(
      new WebpackMonitor({
        capture,
        target,
        // don't launch server, because server lanuch in agent process.
        launch: false,
      })
    );
    return webpackConfig;
  },
};
