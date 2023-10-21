class TreeNode {
  constructor(id, parent, children) {
    this.id = id;
    this.parent = parent;
    this.children = children;
  }
}

function buildTree(graph, node, parent) {
  for (const neighbor of graph[node.id]) {
    if (parent && neighbor.vertex !== parent.id) {
      const child = new TreeNode(neighbor.vertex, node, []);
      node.children.push(child);
      buildTree(graph, child, node);
    }
  }
}

function rootTree(graph, rootId) {
  root = new TreeNode(rootId, null, []);
  buildTree(graph, root, null);
  return root;
}

function getTreeCenter(graph) {}

function areTreesIsom(graph1, graph2) {
  const treeCenter1 = getTreeCenter(graph1);
  const treeCenter2 = getTreeCenter(graph2);

  const root1 = buildTree(graph1, treeCenter1[0]);

  let str1 = encode(root1);

  for (const id of treeCenter2) {
    const root2 = buildTree(graph2, id);

    let str2 = encode(root2);

    if (str1 === str2) {
      return true;
    }
  }

  return false;
}

function encode(treeNode) {
  if (!treeNode) {
    return "";
  }

  let result = "";
  let labels = [];

  for (const child of node.children) {
    labels.push(encode(child));
  }

  labels.sort();

  result += labels.join("");

  return `(${result})`;
}
