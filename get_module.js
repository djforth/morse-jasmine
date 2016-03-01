"use strict";

module.exports = function (Module) {
  return function (mod) {
    return Module.__get__(mod);
  };
};