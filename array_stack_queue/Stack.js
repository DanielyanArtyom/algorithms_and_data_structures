class Stack {
  _stack = null;
  _top = null;
  constructor() {
    this._stack = [];
  }

  push(element) {
    this._stack.push(element);
    this._top = element;
  }

  pop() {
    if (!this._stack.length) {
      this._top = null;
      return null;
    }
    this._stack.pop();
    this._top = this._stack[this._stack.length - 1];
  }

  top() {
    return this._top;
  }

  size() {
    return this._stack.length;
  }
  empty() {
    this._stack = [];
    this._top = null;
  }
}

const stack = new Stack();
console.log("start", stack._stack);
stack.push(5);
stack.push(15);
stack.push(1);
stack.push(7);

console.log("push", stack._stack);

console.log("top", stack.top());

stack.pop();
stack.pop();

console.log("push", stack._stack);

console.log("top", stack.top());
