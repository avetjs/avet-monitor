const { resolve } = require('path');
const { readFile } = require('fs');
const MonitorServer = require('webpack-monitor/utils/server');

module.exports = ({ config }) => {
  const { launch, port, target } = config.monitor;
  if (launch) {
    setTimeout(() => {
      const filepath = resolve(__dirname, 'node_modules', target);
      readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        MonitorServer(JSON.parse(data), port);
      });
    }, 6000);
  }
};
