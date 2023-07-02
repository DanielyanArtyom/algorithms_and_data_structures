class ElementaryGraph {
  _adjMatrix = null;
  _isDirectedGraph = false;

  constructor(isDirected = false) {
    this._adjMatrix = [];
    this._isDirectedGraph = isDirected;
  }
}
