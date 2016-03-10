const _ = require("lodash");

const spyManager = require("./spy_manager")()
    , mockClass  = require("./mockClass")
    , chains     = require("./stub_chain_methods")
    , Stubs      = require("./stub_inners");

module.exports = function(Mod){
  let stubs = Stubs(Mod);

  return {
    add:function(type, spies){

    }
    , stubs: function(method, return){

    }
  }
}