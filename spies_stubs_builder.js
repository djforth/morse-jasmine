(function(global,factory){if('function'==typeof define&&define.amd)define(['module','exports','lodash/isArray','lodash/has'],factory);else if('undefined'!=typeof exports)factory(module,exports,require('lodash/isArray'),require('lodash/has'));else{var mod={exports:{}};factory(mod,mod.exports,global.isArray,global.has),global.spies_stubs_builder=mod.exports}})(this,function(module,exports,_isArray2,_has2){'use strict';function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function CreateSpy(spyManager){return function(spy){if((0,_has3.default)(spy,'callback')){var title=spy.title,returnType=spy.returnType,callback=spy.callback;return spyManager.addReturn(title)(returnType||'returnValue',callback),spyManager.get(title)}return spyManager.add(spy),spyManager.get(spy)}}function CreateStub(stubs,createSpy){return function(stub){if((0,_has3.default)(stub,'callback')||(0,_has3.default)(stub,'spy')){var title=stub.title,returnType=stub.returnType,callback=stub.callback,spy=stub.spy;return title=(0,_isArray3.default)(title)?title:[title],spy?(spy=createSpy(spy),stubs.return.apply(this,title)('returnValue',spy)):stubs.return.apply(this,title)(returnType||'returnValue',callback),stubs.get(title)}return stubs.add(stub),stubs.get(stub)}}Object.defineProperty(exports,'__esModule',{value:!0});var _isArray3=_interopRequireDefault(_isArray2),_has3=_interopRequireDefault(_has2);exports.default=function(stubs,spyManager){var createSpy=CreateSpy(spyManager),createStub=CreateStub(stubs,createSpy);return function(list){list.forEach(function(item){(0,_has3.default)(item,'stub')?createStub(item.stub):(0,_has3.default)(item,'spy')&&createSpy(item.spy)})}},module.exports=exports['default']});