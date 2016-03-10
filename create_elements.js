"use strict";

var _ = require('lodash');

function createElement(type){
  type = type || "div";

  var elem = document.createElement(type);

  var obj = {
    addAttribute: function(attrs){
       _.forIn(attrs, function (value, attr) {
        holder[attr] = value;
      });

      return obj;
    }
    , addId: function(id){
      elem.id = id;
      return obj;
    }
    , append:function(path){
      path = path || document.body;
      path.appendChild(elem);
      return obj;
    }
    , get:()=>elem
    , remove:function(){
      elem.parentNode.removeChild(elem);
    }
  }

  return obj;
}

exports.createHolder = function (id, path, el) {
  let holder = createElement(el)
                .addId(id)
                .append(path)

  return holder.get();
};

exports.create = createElement;

exports.removeElement = function (el) {
  el.parentNode.removeChild(el);
};