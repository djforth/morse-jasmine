import _ from 'lodash';

function createStubsAndSpies(stubs, spyManager) {
  return function(items) {
    stubs.add(items);
    let spyManger = items.map(item => `${item}Something`);
    spyManager.add(spyManger);

    items.forEach(item => {
      stubs.return(item)('returnValue', spyManager.get(`${item}Something`));
    });
  };
}

function CreateSpy(spyManager) {
  return function(spy) {
    if (_.has(spy, 'callback')) {
      let { title, returnType, callback } = spy;
      spyManager.addReturn(title)(returnType || 'returnValue', callback);
      return spyManager.get(title);
    }

    spyManager.add(spy);
    return spyManager.get(spy);
  };
}

function CreateStub(stubs, createSpy) {
  return function(stub) {
    if (_.has(stub, 'callback') || _.has(stub, 'spy')) {
      let { title, returnType, callback, spy } = stub;
      title = _.isArray(title) ? title : [title];
      if (spy) {
        spy = createSpy(spy);
        stubs.return.apply(this, title)('returnValue', spy);
      } else {
        stubs.return.apply(this, title)(returnType || 'returnValue', callback);
      }

      return stubs.get(title);
    }

    stubs.add(stub);
    return stubs.get(stub);
  };
}

export default (stubs, spyManager) => {
  let createSpy = CreateSpy(spyManager);
  let createStub = CreateStub(stubs, createSpy);
  return list => {
    list.forEach(item => {
      if (_.has(item, 'stub')) {
        createStub(item.stub);
      } else if (_.has(item, 'spy')) {
        createSpy(item.spy);
      }
    });
  };
};
