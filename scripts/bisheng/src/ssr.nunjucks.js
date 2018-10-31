
require('babel-polyfill');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const createElement = require('../src/utils/create-element');
const data = require('../src/utils/ssr-data.js');
const routes = require('{{ routesPath }}')(data);

module.exports = function ssr(url, callback) {
  // console.log('ssr:');
  // console.log(url);
  ReactRouter.match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback(error, '');
    } else if (redirectLocation) {
      callback(null, ''); // TODO
    } else if (renderProps) {
      try {
        const content = ReactDOMServer.renderToString(
          React.createElement(
            ReactRouter.RouterContext,
            {
              ...renderProps,
              createElement,
            }
          )
        );
        callback(null, content);
      } catch (e) {
        callback(e, '');
      }
    } else {
      callback(null, ''); // TODO
    }
  });
};
