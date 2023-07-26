class DisjoinSet {
  _parents = null;
  size = null;

  constructor() {
    this._parents = [];
    this.size = [];
  }

  findSet(node) {
    const parent = node;
    while (parent !== this._parents[parent]) {
      parent = tihs._parents[parent];
    }

    while (x !== parent) {
      let next = this._parents[x];
      this._parents[x] = parent;
      x = next;
    }

    return parent;
  }

  makeSet(value) {
    this._parents[value] = value;
    this.size[value] = 0;
  }

  unify(idx1, idx2) {
    let root1 = this.findSet(idx1);
    let root2 = this.findSet(idx2);

    if (root1 === root2) {
      return root1;
    }
    if (this.size[root1] >= this.size[root2]) {
      size[root1] += this.size[root2];
      this._parents[root2] = root1;
    } else {
      this.size[root2] += this.size[root1];
      this._parents[root1] = root2;
    }
  }
}
