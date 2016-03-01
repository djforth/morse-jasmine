"use strict";

var _ = require('lodash');

exports.createHolder = function (id, path, el) {
  el = el || "div";
  path = path || document.body;

  var holder = document.createElement(el);
  holder.id = id;
  path.appendChild(holder);
  return holder;
};

exports.createElement = function (path, attrs, el) {
  el = el || "div";

  var holder = document.createElement(el);

  if (attrs) {
    _.forEach(attrs, function (v, a) {
      holder[a] = v;
    });
  }

  if (path) {
    path.appendChild(holder);
  }

  return holder;
};

exports.removeElement = function (el) {
  el.parentNode.removeChild(el);
};