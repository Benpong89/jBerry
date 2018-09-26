class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(html) {
    if (typeof html === "string") {
      this.array.forEach(node => {
        node.innerHTML = html;
      });
    } else if (this.array.length > 0) {
      return this.array[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    this.array.forEach(node => {
      node.innerHTML += arg;
    });
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.array.forEach(node => node.setAttribute(key, val));
    } else {
      return this.array[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.array.forEach(node => node.classList.add(className));
  }

  removeClass(className) {
    this.array.forEach(node => node.classList.remove(className));
  }

  remove() {
    this.array.forEach(node => node.parentNode.removeChild(node));
  }

  children() {
    let childNodes = [];
    this.array.forEach(node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DOMNodeCollection(childNodes);
  }

  find(selector) {
    let foundNodes = [];
    this.array.forEach(node => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });
    return new DOMNodeCollection(foundNodes);
  }

  on(eventName, callback) {
    this.array.forEach(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jberryEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.array.forEach(node => {
      const eventKey = `jberryEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }
}

module.exports = DOMNodeCollection;
