# morse-jasmine

Utilities for writing jasmine tests:

## Check Calls

Checks arguments called on spy (spy, title, arguments):

```javascript
checkCalls = require("@djforth/morse-jasmine/check_calls")
checkCalls(()=>{
  return mySpy
}, "My Spy", ()=>["arg1", "arg2"]);
```

Spy must be returned in function, arguments can be either array or function returning and array (e.g. arg is spy).

## Check multiple calls

Extension of check calls but passed object like so:

```javascript
var checkMulti = require("@djforth/morse-jasmine/check_multiple_calls")

let calls = {
  "spy1":()=>spy1
 , "spy2":[()=>spy2
  , ()=>["arg1", "arg2"]
  ]
}
checkMulti(calls);

```

## Create/Remove Elements

Allows you to add or remove dom elements for testing

```javascript
const createEl = require("@djforth/morse-jasmine/create_elements").createHolder
  , removeEl = require("@djforth/morse-jasmine/create_elements").removeElement
let el;
beforeEach(()=>{
  el = createEl("my-element");
})

afterEach(function() {
  removeEl(el)
});
```

## Get Module

Utility with rewire to get modules/functions in module

```javascript
 var myModule  = require("path/to/my/module")
 var getMod    = require("@djforth/morse-jasmine/get_module")(myModule)
 let anotherMod;
 beforeEach(()=>{
  anotherMod = getMod("anotherMod");
 })


```

## Mock Class/Constructor

If your using classes or prototypes allows you to mock or stub the class

Mock

```javascript


var mockClass = require("@djforth/morse-jasmine/mock_class")
let myClass, mock;
beforeEach(()=>{
  //Sets up mock
  mock = mockClass("myClass", ["foo", "bar"])
  myClass = mock.getMock();
  // Probably what you'd do:
  // revert = MyMod.__set__("myClass", myClass)
  var class = new myClass()
})

it("should be called", ()=>{
  expect(mock.getConstSpy()).toHaveBeenCalled()
  class.foo("bar")
  expect(mock.getSpy("foo")).toHaveBeenCalledWith("bar")
})

```

## Simulate Click

Simulates a click event

```javascipt
var sim_event = require("@djforth/morse-jasmine/simulate_click");

it("should be called", ()=>{
  sim_event(domElement, "click");
  expect(something).toHaveBeenCalled();
})
```

## Spy Manager

Allows you create, manage and get spies

```javascript
var spyManager = require("@djforth/morse-jasmine/spy_manager")();

beforeEach(()=>{
  spyManager.addSpy(["mySpy", "anotherSpy"]);
  spyManager.addSpy("moreSpy");

  spyManager.addReturn("moreSpy")("returnValue", "some value");
})

afterEach(function () {
  spyManager.removeAll();
});

it("should be called", ()=>{

  expect(spyManager.getSpy("mySpy")).toHaveBeenCalled();
})
```

## Stub chained methods

A utility for stubbing chained methods

```javascript
var stub_chain = require("@djforth/morse-jasmine/stub_chain_methods")

beforeEach(()=>{
  stub_chain.addConstructor("main", ["method1", "method2"])
  stub_chain.getConstructor("main")
    .method1()
    .method2();
})

afterEach(()=>{
  stub_chain.removeAll(); //Clear spies
})

it("should be called", ()=>{
  expect(stub_chain.getSpy("main")).toHaveBeenCalled();
  expect(stub_chain.getMethod("main", "method1")).toHaveBeenCalled
  expect(stub_chain.getMethod("main", "method2")).toHaveBeenCalled();
})
```

##Stub inner modules

Stubs out inner modules with spies

```javascript
 var myModule = require("path/to/my/module")
 var stubs = require("@djforth/morse-jasmine/stub_cinner")(myModule);

 beforeEach(()=>{
  stubs.addSpy(["another_module", "some_module"]);
})

afterEach(()=>{
  stubs.revertAll(); //Reverts All stubs
})

it("should be called", ()=>{
  expect(stubs.getSpy("another_module")).toHaveBeenCalled();

})

```


# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/djforth/morse-jasmine/issues

## Contribute

If you'd like to contribute, morse-jasmine is written using babel in ES6.

Please make sure any additional code should be covered in tests (Jasmine using karma).

If you need to run the test please use:

``` bash

npm test

```

or to rebuild the JS run:

``` bash

npm run build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

morse-jasmine is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the morse-jasmine project are licensed under MIT license.