import _ from 'lodash';

import SpyManager from './spy_manager';
const spyManager = SpyManager();

function buildConstructor(construct, methods) {
  spyManager.addSpy(construct);
  spyManager.addSpy(methods);
  let obj = {};
  let spies = _.map(methods, m => {
    let spy = spyManager.getSpy(m);

    obj[m] = function() {
      spy.apply(this, arguments);
      return obj;
    };
    return { title: m, spy: spy };
  });

  let con = function() {
    spyManager.getSpy(construct).apply(this, arguments);

    return obj;
  };

  return {
    title: construct,
    fn: con,
    spy: spyManager.getSpy(construct),
    spies: spies,
  };
}

function find(spies, title) {
  return _.find(spies, spy => spy.title === title);
}

const chain = () => {
  let spies = [];

  var obj = {
    addConstructor: (construct, methods) => {
      spies.push(buildConstructor(construct, methods));
      return obj;
    },
    getConstructor: construct => {
      let mock = find(spies, construct);
      if (_.isUndefined(mock)) return;
      return mock.fn;
    },
    getSpy: construct => {
      let spy = find(spies, construct);
      if (_.isUndefined(spy)) return;
      return spy.spy;
    },
    getMethod: (construct, method) => {
      let methods = find(spies, construct);
      if (_.isUndefined(methods)) return;
      methods = methods.spies;
      let spy = find(methods, method);
      if (_.isUndefined(spy)) return;
      return spy.spy;
    },
    removeAll: () => {
      spies = [];
    },
  };

  return obj;
};

export default chain();
