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

const TreeColors = {
  RED: "red",
  BLACK: "black",
};

class TreeNode {
  left = null;
  right = null;
  parent = null;
  color = "";
  val = null;

  constructor(
    val,
    color = TreeColors.RED,
    parent = null,
    left = null,
    right = null
  ) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.color = color;
    this.val = val;
  }
}

class RBT {
  root = null;
  NIL = null;

  constructor() {
    this.NIL = new TreeNode(null, TreeColors.BLACK, null);
    this.root = this.NIL;
  }

  levelOrderTraversal() {
    if (!this.root) {
      return "Tree is empty";
    }
    let queue = new Queue();
    queue.push(this.root);
    while (queue.size()) {
      let size = queue.size();
      let strToPrint = "";
      while (size !== 0) {
        let current = queue.pop();
        strToPrint += `  val: ${current.val}, color: ${current.color}`;
        if (current.left && current.left.val !== null) {
          queue.push(current.left);
        }
        if (current.right && current.right.val !== null) {
          queue.push(current.right);
        }
        --size;
      }
      console.log(strToPrint);
    }
    queue.empty();
  }

  rightRotate(treeNode) {
    let y = treeNode.left;
    treeNode.left = y.right;

    if (y.right !== this.NIL) {
      y.right.parent = treeNode;
    }
    y.parent = treeNode.parent;

    if (treeNode.parent === this.NIL) {
      this.root = y;
    } else if (treeNode === treeNode.parent.left) {
      treeNode.parent.left = y;
    } else {
      treeNode.parent.right = y;
    }

    y.right = treeNode;
    treeNode.parent = y;
  }

  leftRotate(treeNode) {
    let y = treeNode.right;

    treeNode.right = y.left;

    if (y.left !== this.NIL) {
      y.left.parent = treeNode;
    }
    y.parent = treeNode.parent;

    if (treeNode.parent === this.NIL) {
      this.root = y;
    } else if (treeNode === treeNode.parent.left) {
      treeNode.parent.left = y;
    } else {
      treeNode.parent.right = y;
    }
    y.left = treeNode;

    treeNode.parent = y;
    console.log("here after", y.val);
  }

  insert(key) {
    let newTreeNode = new TreeNode(
      key,
      TreeColors.RED,
      this.NIL,
      this.NIL,
      this.NIL
    );

    let y = this.NIL;
    let x = this.root;

    while (x !== this.NIL) {
      y = x;
      if (newTreeNode.val < x.val) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    newTreeNode.parent = y;

    if (y === this.NIL) {
      this.root = newTreeNode;
      if (!this.NIL.left && !this.NIL.right) {
        this.NIL.left = this.root;
        this.NIL.right = this.root;
      }
    } else if (newTreeNode.val < y.val) {
      y.left = newTreeNode;
    } else {
      y.right = newTreeNode;
    }

    if (newTreeNode.parent.parent !== this.NIL) {
      this.#RBInsertionFixup(newTreeNode);
    }
  }

  #RBInsertionFixup(treeNode) {
    while (treeNode.parent.color === TreeColors.RED) {
      if (treeNode.parent === treeNode.parent.parent.left) {
        let uncleNode = treeNode.parent.parent.right;
        if (uncleNode.color === TreeColors.RED) {
          // case 1
          treeNode.parent.color = TreeColors.BLACK;
          uncleNode.color = TreeColors.BLACK;
          treeNode.parent.parent.color = TreeColors.RED;

          treeNode = treeNode.parent.parent;
        } else {
          if (treeNode === treeNode.parent.right) {
            // uncle is black
            treeNode = treeNode.parent;
            this.leftRotate(treeNode);
          }
          treeNode.parent.color = TreeColors.BLACK;
          treeNode.parent.parent.color = TreeColors.RED;
          this.rightRotate(treeNode);
        }
      } else {
        let uncleNode = treeNode.parent.parent.left;

        if (uncleNode.color === TreeColors.RED) {
          treeNode.parent.color = TreeColors.BLACK;
          uncleNode.color = TreeColors.BLACK;
          treeNode.parent.parent.color = TreeColors.RED;
          treeNode = treeNode.parent.parent;
        } else {
          // uncle is black

          if (treeNode === treeNode.parent.left) {
            treeNode = treeNode.parent;

            this.rightRotate(treeNode);
          }

          treeNode.parent.color = TreeColors.BLACK;
          treeNode.parent.parent.color = TreeColors.RED;
          this.leftRotate(treeNode);
        }
      }
    }
    this.root.color = TreeColors.BLACK;
  }

  search(target) {
    return this.#search(this.root, target);
  }

  #search(treeNode, target) {
    if (treeNode === this.NIL) {
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

  #transplant(u, v) {
    if (u.parent === this.NIL) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  delete(target) {
    let nodeToDelete = this.search(target);

    if (!nodeToDelete) {
      return null;
    }

    let y = nodeToDelete;

    let y_original_color = y.color;
    let x = null;
    if (nodeToDelete.left === this.NIL) {
      x = nodeToDelete.right;
      this.#transplant(nodeToDelete, nodeToDelete.right);
    } else if (nodeToDelete.right === this.NIL) {
      x = nodeToDelete.left;
      this.#transplant(nodeToDelete, nodeToDelete.left);
    } else {
      y = this.#getMinimum(nodeToDelete.right);
      y_original_color = y.color;
      x = y.right;

      if (x.parent === nodeToDelete) {
        x.parent = y;
      } else {
        this.#transplant(y, y.right);
        y.right = nodeToDelete.right;
        y.right.parent = y;
      }
      this.#transplant(nodeToDelete, y);

      y.left = nodeToDelete.left;
      y.left.parent = y;
      y.color = nodeToDelete.color;
    }

    if (y_original_color === TreeColors.BLACK) {
      this.#deleteFixup(y.right);
    }
  }

  #deleteFixup(x) {
    while (x !== this.root && x.color === TreeColors.BLACK) {
      if (x === x.parent.left) {
        let brotherNode = x.parent.right;
        if (brotherNode.color === TreeColors.RED) {
          //case 1
          brotherNode.color = TreeColors.BLACK;
          x.parent.color = TreeColors.RED;
          this.leftRotate(x.parent);
          brotherNode = x.parent.right;
        }
        if (
          // case 2
          brotherNode.left.color === TreeColors.BLACK &&
          brotherNode.right.color === TreeColors.BLACK
        ) {
          brotherNode.color = TreeColors.RED;
          x = x.parent;
        } else {
          if (brotherNode.right.color === TreeColors.BLACK) {
            //case 3
            brotherNode.left.color = TreeColors.BLACK;
            brotherNode.color = TreeColors.RED;
            this.rightRotate(brotherNode);
            brotherNode = x.parent.right;
          }
          brotherNode.color = x.parent.color; //case 4
          x.parent.color = TreeColors.BLACK;
          brotherNode.right.color = TreeColors.BLACK;
          this.leftRotate(x.parent);
          x = this.root;
        }
      } else {
        let brotherNode = x.parent.left;
        if (brotherNode.color === TreeColors.RED) {
          //case 1
          brotherNode.color = TreeColors.BLACK;
          x.parent.color = TreeColors.RED;
          this.rightRotate(x.parent);
          brotherNode = x.parent.left;
        }
        if (
          brotherNode.left.color === TreeColors.BLACK && //case 2
          brotherNode.right.color === TreeColors.BLACK
        ) {
          brotherNode.color = TreeColors.RED;
          x = x.parent;
        } else {
          if (brotherNode.left.color === TreeColors.BLACK) {
            //case 3
            brotherNode.right.color = TreeColors.BLACK;
            brotherNode.color = TreeColors.RED;
            this.leftRotate(brotherNode);
            brotherNode = x.parent.left;
          }
          brotherNode.color = x.parent.color; //case 4
          x.parent.color = TreeColors.BLACK;
          brotherNode.left.color = TreeColors.BLACK;
          this.leftRotate(x.parent);
          x = this.root;
        }
      }

      x.color = TreeColors.BLACK;
    }
  }

  #getMinimum(treeNode) {
    if (treeNode.left === this.NIL) {
      return treeNode;
    }

    return this.#getMinimum(treeNode.left);
  }
}

let rbt = new RBT();

rbt.insert(7);
rbt.insert(8);
rbt.insert(12);
rbt.insert(45);
rbt.insert(2);
rbt.insert(6);
rbt.insert(13);
rbt.insert(58);
rbt.insert(0);
console.log("insertion traversal");
rbt.levelOrderTraversal();

rbt.delete(45);
rbt.delete(0);
rbt.delete(13);

console.log("deletion traversal");
rbt.levelOrderTraversal();
