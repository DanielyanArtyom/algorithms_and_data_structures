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
    const element = this._stack.pop();
    this._top = this._stack[this._stack.length - 1];
    return element;
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

class Queue {
  _queue = null;

  constructor() {
    this._queue = [];
  }

  push(element) {
    if (!this._queue.length) {
      this._queue.push(element);
    } else {
      this._queue = [...this._queue, element];
    }
  }

  pop() {
    if (!this._queue.length) {
      return null;
    }
    let tmpArray = new Array(this._queue.length - 1).fill(0);
    for (let i = 1; i < this._queue.length; ++i) {
      tmpArray[i - 1] = this._queue[i];
    }

    let poppedElement = this._queue[0];

    this._queue = tmpArray;
    return poppedElement;
  }

  front() {
    return this._queue[0];
  }
  back() {
    return this._queue[this._queue.length - 1];
  }

  size() {
    return this._queue.length;
  }

  empty() {
    this._queue = [];
  }
}

class TreeNode {
  left = null;
  right = null;
  val = null;
  constructor(val, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.val = val;
  }
}

class BST {
  root = null;

  proOrderTraverseRecursive() {
    if (!this.root) {
      console.log("Tree is Empty");
      return node;
    }
    this.#proOrderTraverseRecursive(this.root);
  }

  inOrderTraverseRecursive() {
    if (!this.root) {
      console.log("Tree is Empty");
      return this.root;
    }
    this.#inOrderTraverseRecursive(this.root);
  }

  postOrderTraverseRecursive() {
    if (!this.root) {
      console.log("Tree is Empty");
      return this.root;
    }
    this.#postOrderTraverseRecursive(this.root);
  }

  #proOrderTraverseRecursive(node) {
    if (!node) {
      return node;
    }
    console.log(node.val);
    this.#proOrderTraverseRecursive(node.left);
    this.#proOrderTraverseRecursive(node.right);
  }

  #inOrderTraverseRecursive(node) {
    if (!node) {
      return node;
    }

    this.#inOrderTraverseRecursive(node.left);
    console.log(node.val);
    this.#inOrderTraverseRecursive(node.right);
  }

  #postOrderTraverseRecursive(node) {
    if (!node) {
      return node;
    }
    this.#postOrderTraverseRecursive(node.left);
    this.#postOrderTraverseRecursive(node.right);
    console.log(node.val);
  }

  inOrderTraverse() {
    if (!this.root) {
      return "Tree is empty";
    }
    let stack = new Stack();

    let current = this.root;
    let isDone = false;
    while (!isDone) {
      if (current) {
        stack.push(current);
        current = current.left;
      } else if (stack.size()) {
        current = stack.pop();
        console.log(current.val);
        current = current.right;
      } else {
        isDone = true;
      }
    }
  }

  preOrderTraverse() {
    if (!this.root) {
      return "Tree is empty";
    }

    let stack = new Stack();
    stack.push(this.root);

    while (stack.size()) {
      let current = stack.pop();
      console.log(current.val);
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }
    }
  }

  postOrderTraverse() {
    if (!this.root) {
      return "Tree is empty";
    }
    let stack1 = new Stack();
    let stack2 = new Stack();

    stack1.push(this.root);

    while (stack1.size()) {
      const current = stack1.pop();
      stack2.push(current);
      if (current.left) {
        stack1.push(current.left);
      }
      if (current.right) {
        stack1.push(current.right);
      }
    }

    while (stack2.size()) {
      const current = stack2.pop();
      console.log(current.val);
    }
  }

  search(target) {
    return this.#search(this.root, target);
  }

  #search(treeNode, target) {
    if (!treeNode) {
      return null;
    }
    if (treeNode.val === target) {
      return treeNode;
    }
    if (treeNode.val > target) {
      return this.#search(treeNode.left, target);
    }
    return this.#search(treeNode.right, target);
  }

  #getMinimum(treeNode) {
    if (!treeNode.left) {
      return treeNode;
    }

    return this.#getMinimum(treeNode.left);
  }

  #getMaximum(treeNode) {
    if (!treeNode.right) {
      return treeNode;
    }

    return this.#getMaximum(treeNode.right);
  }

  getHeight(target) {
    if (!target) {
      return this.#getHeight(this.root);
    }

    const targetNode = this.search(target);

    if (!targetNode) {
      return -1;
    }

    return this.#getHeight(targetNode);
  }

  #getHeight(treeNode) {
    if (!treeNode) {
      return -1;
    }
    return (
      Math.max(
        this.#getHeight(treeNode.left),
        this.#getHeight(treeNode.right)
      ) + 1
    );
  }

  getSuccessor(target) {
    const targetNode = this.#search(this.root, target);

    if (!targetNode) {
      return null;
    }
    return this.#getSuccessor(targetNode);
  }

  #getSuccessor(treeNode) {
    if (treeNode.right) {
      return this.#getMinimum(treeNode.right);
    }
    let successor = null;
    let ancestor = this.root;
    while (ancestor) {
      if (ancestor <= treeNode.val) {
        successor = ancestor;
        ancestor = ancestor.left;
      } else {
        ancestor = ancestor.right;
      }
    }
    if (successor) {
      return successor.val;
    }

    return "There is no successor for current node";
  }

  getPreDecessor(target) {
    const targetNode = this.#search(this.root, target);

    if (!targetNode) {
      return null;
    }

    return this.#getPredecessor(targetNode);
  }

  #getPredecessor(treeNode) {
    if (treeNode.left) {
      return this.#getMaximum(treeNode.left);
    }

    let predecessor = null;
    let ancestor = this.root;

    while (ancestor !== treeNode) {
      if (treeNode.val >= ancestor.val) {
        predecessor = ancestor;
        ancestor = ancestor.right;
      } else {
        ancestor = ancestor.left;
      }
    }

    if (predecessor) {
      return predecessor.val;
    }
    return "There is no predecessor for current node";
  }

  insert(target) {
    if (!this.root) {
      this.root = new TreeNode(target);
      return;
    }

    this.root = this.#insert(this.root, target);
  }

  #insert(treeNode, target) {
    if (!treeNode) {
      return new TreeNode(target);
    }
    if (treeNode.val < target) {
      treeNode.right = this.#insert(treeNode.right, target);
    } else {
      treeNode.left = this.#insert(treeNode.left, target);
    }
    return treeNode;
  }

  delete(target) {
    if (!this.root) {
      return null;
    }

    this.root = this.#delete(this.root, target);
  }

  #delete(treeNode, target) {
    if (!treeNode) {
      return null;
    }

    if (target < treeNode.val) {
      treeNode.left = this.#delete(treeNode.left, target);
    } else if (target > treeNode.val) {
      treeNode.right = this.#delete(treeNode.right, target);
    } else {
      if (!treeNode.left) {
        return treeNode.right;
      }
      if (!treeNode.right) {
        return treeNode.left;
      }

      let tmp = this.#getMinimum(treeNode.right);
      treeNode.val = tmp.val;
      treeNode.right = this.#delete(treeNode.right, tmp.val);
    }
    return treeNode;
  }

  levelTraversePrintList() {
    if (!this.root) {
      console.log("Tree is empty");
    }
    let queue = new Queue();
    queue.push(this.root);
    let strToPrint = "";

    while (queue.size()) {
      const current = queue.pop();
      strToPrint += `${current.val}, `;

      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }

    console.log(strToPrint);
  }

  levelTraversePrint() {
    if (!this.root) {
      console.log("Tree is empty");
    }

    const treeHeight = this.#getHeight(this.root);

    for (let i = 0; i <= treeHeight; ++i) {
      this.#printLevelTraverse(this.root, i);
    }
  }

  #printLevelTraverse(treeNode, height) {
    if (!treeNode) {
      return treeNode;
    }

    if (height === 0) {
      console.log(treeNode.val);
    } else {
      this.#printLevelTraverse(treeNode.left, height - 1);
      this.#printLevelTraverse(treeNode.right, height - 1);
    }
  }
}
