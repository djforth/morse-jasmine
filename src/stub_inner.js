const _ = require("lodash");

const spyManager = require("./spy_manager")()

function getItem(list, title){
  let obj = _.find(list, (spy)=>spy.title === title )
  if(_.isEmpty(obj)) return null;
  return obj;
}

function spyCreator(Module, manager){
  return function(mod){
    let title = (_.isString(mod)) ? mod : mod.title;
    let spy    = manager.addSpy(mod).getSpy(title);
    Module.__Rewire__(title, spy);
    return {title:title, spy:spy}
  }
}

function resetSpy(spy){
  if(_.isPlainObject(spy)){
    _.forIn(spy, function(v, k){
      v.calls.reset();
    })
  } else {
    spy.calls.reset();
  }
}

module.exports =  function(Module){
  let spies  = []
  let addSpy = spyCreator(Module, spyManager);
  let obj = {
    /** Adds multiple modules or single - expects strings */
    addSpy:(modules)=>{

      if(_.isArray(modules)){
        modules = _.map(modules, (m)=>{
          return addSpy(m)
        });

        spies = spies.concat(modules);
        return obj;
      }

      if(_.isString(modules) || _.isObject(modules)) spies.push(addSpy(modules));

      return obj;
    }
    , getSpy:(title)=>{
      let obj = getItem(spies, title)
      if(_.isNull(obj)) return null;
      return obj.spy;
    }
    , return:(title)=>{
      let mod = getItem(list, title).spy;
      return function(func, value){
        spy.and[func](value);
      }
    }
    , revertAll:()=>{
      _.forEach(spies, (mod)=>{
        resetSpy(mod.spy);
        // mod.revert();
        Module.__ResetDependency__(mod.title);
      });
      spies = [];

    }
    , revertSpy:(title)=>{
      let mod = getItem(list, title);
      resetSpy(mod.spy);
      // mod.revert()
      Module.__ResetDependency__(mod.title)
      spies = _.reject(spies, (s)=>s.title === title);
      return mod;
    }
    , setSpies:(spy_list)=>{
      _.forEach(spy_list, (sl)=>{
        let mod = getItem(spies, sl.title);
        mod.spy.and[sl.func](sl.value);
      })
    }

  }

  return obj;
}