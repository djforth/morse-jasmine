import _ from 'lodash';

exports.create = function(el) {
  el = el || 'div';
  let holder = document.createElement(el);

  var obj = {
    addId: id => {
      holder.id = id;
      return obj;
    },
    addAttribute: attrs => {
      _.forEach(attrs, function(v, a) {
        holder[a] = v;
      });

      return obj;
    },
    append: path => {
      path = path || document.body;
      path.appendChild(holder);
      return obj;
    },
    get: () => holder,
    remove: () => {
      holder.parentNode.removeChild(holder);
    },
  };
  return obj;
};

exports.createHolder = function(id, path, el) {
  el = el || 'div';
  path = path || document.body;

  let holder = document.createElement(el);
  holder.id = id;
  path.appendChild(holder);
  return holder;
};

exports.createElement = function(path, attrs, el) {
  el = el || 'div';

  let holder = document.createElement(el);

  if (attrs) {
    _.forEach(attrs, function(v, a) {
      holder[a] = v;
    });
  }

  if (path) {
    path.appendChild(holder);
  }

  return holder;
};

exports.removeElement = function(el) {
  el.parentNode.removeChild(el);
};
