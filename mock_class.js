// See http://stackoverflow.com/questions/25688880/spy-on-a-constructor-using-jasmine
// exports.stub = function (Subject) {
//     var Surrogate = function () {
//         Surrogate.prototype.constructor.apply(this, arguments);
//     };
//     Surrogate.prototype = Object.create(Subject.prototype);
//     Surrogate.prototype.constructor = Subject;
//     return Surrogate;
// };

function addMethods(ClassConst, methods) {
  return _.map(methods, m => {
    let title = _.isString(m) ? m : m.title;
    let spy = jasmine.createSpy(title);
    if (m.value && m.type) withReturn(spy, m.type, m.value);
    ClassConst.prototype[title] = spy;
    return { title: title, spy: spy };
  });
}

module.exports = function (title, methods) {
  var init = jasmine.createSpy("init");
  let spies = [{ title: "init", spy: init }];
  var ConstClass = function () {
    init.apply(this, arguments);
  };

  // let ConstClass = this[title]

  if (_.isArray(methods) && !_.isEmpty(methods)) {
    spies = spies.concat(addMethods(ConstClass, methods));
  }

  return {
    getMock: () => {
      return ConstClass;
    },
    getConstSpy: () => {
      let obj = _.find(spies, spy => spy.title === "init");

      return obj.spy;
    },
    getSpy: spy_name => {
      let obj = _.find(spies, spy => spy.title === spy_name);

      return obj.spy;
    }
  };
};