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
    // console.log(title, mod)
    let revert = Module.__set__(title, spy);
    return {title:title, spy:spy, revert:revert}
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
    , revertAll:()=>{
      _.forEach(spies, (mod)=>{
        mod.spy.calls.reset();
        mod.revert();
      });
      spies = [];

    }
    , revertSpy:(title)=>{
      let mod = getItem(list, title);
      mod.spy.calls.reset();
      mod.revert()
      spies = _.reject(spies, (s)=>s.title === title);
      return mod;
    }

  }

  return obj;
}