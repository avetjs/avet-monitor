const { resolve } = require('path');
const { readFile, existsSync, readFileSync } = require('fs');
const MonitorServer = require('webpack-monitor/utils/server');

function waitOnFileData(file, setup = 15000, interval = 4000, timeout = 60000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (existsSync(file)) {
        const data = readFileSync(file);
        if (data) {
          return resolve(data);
        }
      }
      const now = new Date();
      let timer = setInterval(() => {
        if (existsSync(file)) {
          const data = readFileSync(file);
          if (data) {
            resolve(data);
            clearInterval(timer);
            timer = null;
            return;
          }
        }
        const t = new Date();
        if (t - now > timeout) {
          reject(new Error('avet monitor wait file time out!'));
        }
      }, interval);
    }, setup);
  });
}

module.exports = ({ config }) => {
  const { launch, port, target } = config.monitor;
  if (launch) {
    const filepath = resolve(
      require.resolve('webpack-monitor'),
      '../..',
      target
    );
    waitOnFileData(filepath)
      .then(data => {
        MonitorServer(JSON.parse(data), port);
      })
      .catch(err => {
        throw err;
      });
  }
};
