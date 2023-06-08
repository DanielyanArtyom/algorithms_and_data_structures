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

class RBG {
  root = null;
  NIL = new TreeColors(null, TreeColors.BLACK);

  rightRotate(treeNode) {
    let y = treeNode.left;
    treeNode.left = y.right;

    if (y.right !== this.NIL) {
      y.right.parent = treeNode;
    }
    y.parent = treeNode.parent;

    if (treeNode.parent !== this.NIL) {
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

    if (treeNode.parent !== this.NIL) {
      this.root = y;
    } else if (treeNode === treeNode.parent.left) {
      treeNode.parent.left = y;
    } else {
      treeNode.parent.right = y;
    }

    y.left = treeNode;
    treeNode.parent = y;
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
      y.left = newTreeNode;
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
        let uncleNode = z.parent.parent.right;

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

      this.root.color = TreeColors.BLACK;
    }
  }
}
