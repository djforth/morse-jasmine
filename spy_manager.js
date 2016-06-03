"use strict";

var _ = require("lodash");

function addSpy(title, ret) {
  var spy = jasmine.createSpy(title);
  // addReturn(spy, ret)
  return { title: title, spy: spy };
}

function _addReturn(spy, ret) {
  if (_.isObject(ret) && ret.function && ret.value) {
    spy.and[ret.function](ret.value);
  }
}

function addSpyObj(title, methods) {
  var keys = _.map(methods, function (m) {
    if (_.isString(m)) return m;
    return m.title;
  });
  var spy = jasmine.createSpyObj(title, keys);

  // _.forEach(methods, (m)=>addReturn(spy[m.title], m) );
  return { title: title, spy: spy };
}

function addSpytype(title, opts) {
  if (_.isArray(opts)) return addSpyObj(title, opts);

  return addSpy(title, opts);
}

function getItem(list, title) {
  var obj = _.find(list, function (spy) {
    return spy.title === title;
  });
  if (_.isEmpty(obj)) return null;
  return obj;
}

function getSpy() {
  var obj = getItem(spies, title);
  if (_.isNull(obj)) return null;
  return obj.spy;
}

function addSpyArray(spies) {
  return _.map(spies, function (m) {
    var title = _.isString(m) ? m : m.title;
    var opts = _.isString(m) ? null : m.opts;
    return addSpytype(title, opts);
  });
}

function resetSpyObj(obj) {
  _.forIn(obj, function (v, k) {
    v.calls.reset();
  });
}

module.exports = function () {
  var _this = this;

  var spies = [];

  var obj = {
    add: function add(modules) {
      return _this.addSpy(modules);
    }
    /** Adds multiple modules or single - expects strings */
    , addSpy: function addSpy(modules) {
      if (_.isArray(modules)) {
        spies = spies.concat(addSpyArray(modules));
        return obj;
      }

      if (_.isObject(modules)) {
        var title = modules.title;
        var opts = modules.opts;

        spies.push(addSpytype(title, opts));
      }

      if (_.isString(modules)) {
        spies.push(addSpytype(modules, null));
      }

      return obj;
    },
    addReturn: function addReturn(title, obj) {
      var spy = getItem(spies, title);
      if (_.isNull(obj)) return null;
      spy = spy.spy;
      if (obj) spy = spy[obj];
      return function (type, val) {
        _addReturn(spy, { function: type, value: val });
      };
    },
    returnObj: function returnObj(title) {
      var spy = getItem(spies, title).spy;
      return function (opts) {
        _.forEach(opts, function (opt) {
          spy[opt.title].and[opt.func](opt.value);
        });
      };
    },
    getSpy: function getSpy(title) {
      var obj = getItem(spies, title);
      if (_.isNull(obj)) return null;
      return obj.spy;
    },
    get: function get(title) {
      return _this.getSpy(modules);
    },
    removeAll: function removeAll() {
      _.forEach(spies, function (s) {
        if (_.isPlainObject(s.spy)) {
          resetSpyObj(s.spy);
        } else {
          s.spy.calls.reset();
        }
      });
      spies = [];
      return obj;
    },
    removeSpy: function removeSpy(title) {
      spies = _.reject(spies, function (s) {
        if (s.title !== title) return false;
        if (_.isPlainObject(s.spy)) {
          resetSpyObj(s.spy);
        } else {
          s.spy.calls.reset();
        }

        return true;
      });
      return obj;
    }
  };

  return obj;
};