'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var createElement = require('../src/utils/create-element');
var data = require('../src/utils/ssr-data.js');
var routes = require('{{ routesPath }}')(data);

module.exports = function ssr(url, callback) {
  // console.log('ssr:');
  // console.log(url);
  ReactRouter.match({ routes: routes, location: url }, function (error, redirectLocation, renderProps) {
    if (error) {
      callback(error, '');
    } else if (redirectLocation) {
      callback(null, ''); // TODO
    } else if (renderProps) {
      try {
        var content = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, _extends({}, renderProps, { createElement: createElement })));
        callback(null, content);
      } catch (e) {
        callback(e, '');
      }
    } else {
      callback(null, ''); // TODO
    }
  });
};