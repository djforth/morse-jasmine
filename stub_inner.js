"use strict";

var _ = require("lodash");

var spyManager = require("./spy_manager")();

function getItem(list, title) {
  var obj = _.find(list, function (spy) {
    return spy.title === title;
  });
  if (_.isEmpty(obj)) return null;
  return obj;
}

function spyCreator(Module, manager) {
  return function (mod) {
    var title = _.isString(mod) ? mod : mod.title;
    var spy = manager.addSpy(mod).getSpy(title);
    // console.log(title, mod)
    var revert = Module.__set__(title, spy);
    return { title: title, spy: spy, revert: revert };
  };
}

function resetSpy(spy) {
  if (_.isPlainObject(spy)) {
    _.forIn(spy, function (v, k) {
      v.calls.reset();
    });
  } else {
    spy.calls.reset();
  }
}

module.exports = function (Module) {
  var spies = [];
  var _addSpy = spyCreator(Module, spyManager);
  var obj = {
    /** Adds multiple modules or single - expects strings */
    addSpy: function addSpy(modules) {

      if (_.isArray(modules)) {
        modules = _.map(modules, function (m) {
          return _addSpy(m);
        });

        spies = spies.concat(modules);
        return obj;
      }

      if (_.isString(modules) || _.isObject(modules)) spies.push(_addSpy(modules));

      return obj;
    },
    getSpy: function getSpy(title) {
      var obj = getItem(spies, title);
      if (_.isNull(obj)) return null;
      return obj.spy;
    },
    return: function _return(title) {
      var mod = getItem(list, title).spy;
      return function (func, value) {
        spy.and[func](value);
      };
    },
    revertAll: function revertAll() {
      _.forEach(spies, function (mod) {
        resetSpy(mod.spy);
        mod.revert();
      });
      spies = [];
    },
    revertSpy: function revertSpy(title) {
      var mod = getItem(list, title);
      resetSpy(mod.spy);
      mod.revert();
      spies = _.reject(spies, function (s) {
        return s.title === title;
      });
      return mod;
    },
    setSpies: function setSpies(spy_list) {
      _.forEach(spy_list, function (sl) {
        var mod = getItem(spies, sl.title);
        mod.spy.and[sl.func](sl.value);
      });
    }

  };

  return obj;
};