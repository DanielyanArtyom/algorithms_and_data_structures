class Node {
  rank = null;
  data = null;
  parent = null;

  constructor(data, parent = null, rank = 0) {
    this.data = data;
    this.parent = parent;
    this.rank = rank;
  }
}

class DisjoinSet {
  _sets = null;

  constructor() {
    this._sets = new Map();
  }

  findSet(node) {
    const { parent } = node;
    if (parent === node) {
      return node;
    }
    node.parent = this.findSet(parent);
    return node.parent;
  }

  makeSet(value) {
    const newNode = new Node(value);
    newNode.parent = newNode;
    this._sets.set(data, newNode);
  }

  unify(set1, set2) {
    const node1 = this._sets.get(set1.data);
    const node2 = this._sets.get(set2.data);

    if (!node1 || node2) {
      return "Node have not found";
    }

    const root1 = this.findSet(node1);
    const root2 = this.findSet(node2);

    if (root1 === root2) {
      return root1;
    }

    if (root1.rank === root2.rank) {
      ++root1.rank;
      root2.parent = root1;
    } else if (root1.rank > root2.rank) {
      root2.parent = root1;
    } else {
      root1.parent = root2;
    }
  }

  kruskalAlgorithm(graph, source) {
    let edges = [];

    for (let i = 0; i < graph.length; ++i) {
      for (let j = 0; j < graph[i].length; ++j) {
        edges.push({
          source: i,
          dest: graph[i][j].vertex,
          cost: graph[i][j].cost,
        });
      }
    }

    edges.sort((a, b) => a.cost - b.cost);
    let cost = 0;

    for (key of edges) {
      const { source, dest } = key;
      if (this.findSet(source) !== this.findSet(dest)) {
        cost += key.cost;
        this.unify(source, dest);
      }
    }
  }
}
