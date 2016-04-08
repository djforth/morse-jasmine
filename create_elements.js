"use strict";

var _ = require('lodash');

exports.create = function (el) {
  el = el || "div";
  var holder = document.createElement(el);

  var obj = {
    addId: function addId(id) {
      holder.id = id;
      return obj;
    },
    addAttribute: function addAttribute(attrs) {
      _.forEach(attrs, function (v, a) {
        holder[a] = v;
      });

      return obj;
    },
    append: function append(path) {
      path = path || document.body;
      path.appendChild(holder);
      return obj;
    },
    get: function get() {
      return holder;
    },
    remove: function remove() {
      holder.parentNode.removeChild(holder);
    }
  };
  return obj;
};

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