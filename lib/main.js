const DOMNodeCollection = require("./dom_node_collection");
window.$b = arg => {
  switch (typeof arg) {
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return getNodesFromDOM(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }
};

getNodesFromDOM = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};

registerDocReadyCallback = func => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

// const nodesArray = Array.from(nodeList);
// return new DOMNodeCollection(nodesArray);

// window.$b = $b;

// window.$b = (arg) => {
//   switch (typeof arg) {
//     case "function":
//       return registerDocReadyCallback(arg);
//     case "string":
//       return getNodesFromDOM(arg);
//     case "object":
//       if (arg instanceof HTMLElement) {
//         return new DomNodeCollection([arg]);
//       }
//   }
//
//
// getNodesFromDom = (selector) => {
//   const nodes = document.querySelectorAll(selector);
//   const nodesArray = Array.from(nodes);
//   return new DomNodeCollection(nodesArray);
// };

// function $b(selector) {
//   let nodeList;
//
//   switch (typeof selector) {
//     case "string":
//       nodeList = Array.from(document.querySelectorAll(selector));
//     case "object":
//       if (selector instanceof HTMLElement)
//         return new DOMNodeCollection([selector]);
//   }
