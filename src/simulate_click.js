module.exports = function simulateClick(el, ev) {
  let event = new Event(ev, {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  el.dispatchEvent(event);
};
