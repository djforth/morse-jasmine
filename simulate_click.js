'use strict';

module.exports = function simulateClick(el, ev) {
  var event = new Event(ev, {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });

  el.dispatchEvent(event);
};