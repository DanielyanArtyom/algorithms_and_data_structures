class ElementaryGraph {
  _adjMatrix = null;
  _isDirectedGraph = false;
  _transposedMatrix = null;
  constructor(isDirected = false) {
    this._adjMatrix = [];
    this._isDirectedGraph = isDirected;
    this._transposedMatrix = [];
  }

  bfs(source) {
    if (this._adjMatrix[source] === undefined) {
      return "Vertex is not exist";
    }

    let queue = new Queue();
    const visitedElements = Array(this._adjMatrix.length).fill(false);
    queue.push(source);
    visitedElements[source] = true;

    while (queue.size()) {
      let poppedElement = queue.pop();
      this._adjMatrix[poppedElement].forEach((neighbor) => {
        if (
          !visitedElements[neighbor] &&
          this._adjMatrix[poppedElement][neighbor]
        ) {
          queue.push(neighbor);
          console.log(`current bfs vertex:  ${neighbor}`);
          visitedElements[neighbor] = true;
        }
      });
    }
  }

  dfsIterative(source) {
    if (this._adjMatrix[source] === undefined) {
      return "Vertex is not exist";
    }
    const visitedElements = Array(this._adjMatrix.length).fill(false);
    let stack = new Stack();
    visitedElements[source] = true;
    while (stack.size()) {
      let poppedElement = stack.pop();
      this._adjMatrix[poppedElement].forEach((neighbor) => {
        if (
          !visitedElements[neighbor] &&
          this._adjMatrix[poppedElement][neighbor]
        ) {
          stack.push(neighbor);
          console.log(`current dfs vertex: ${neighbor}`);
          visitedElements[neighbor] = true;
        }
      });
    }
  }

  dfsRecursive(source) {
    if (this._adjMatrix[source] === undefined) {
      return "Vertex is not exist";
    }
    const visitedElements = Array(this._adjMatrix.length).fill(false);
    this.#dfs(source, visitedElements);
  }

  dfsExtraCasesRecursive(source) {
    if (this._adjMatrix[source] === undefined) {
      return "Vertex is not exist";
    }
    const visitedElements = Array(this._adjMatrix.length).fill(false);
    this.#dfs(source, visitedElements);
    let componentsCounter = 0;

    for (let i = 0; i < visitedElements.length; ++i) {
      if (!visitedElements[i]) {
        ++componentsCounter;
        this.#dfs(i, visitedElements);
      }
    }

    return componentsCounter;
  }

  #dfs(source, visitedArray) {
    visitedArray[source] = true;
    this._adjMatrix[source].forEach((neighbor) => {
      if (!visitedArray[neighbor] && this._adjMatrix[source][neighbor]) {
        console.log(`current dfs vertex: ${neighbor}`);
        this.#dfs(neighbor, visitedArray);
      }
    });
  }

  addVertex(vertexCount) {
    //  generating graph without edges
    for (let i = 0; i < vertexCount; ++i) {
      this._adjMatrix[i] = Array(vertexCount).fill(false);
      if (this._isDirectedGraph) {
        this._transposedMatrix[i] = Array(vertexCount).fill(false);
      }
    }
  }

  addEdge(source, destination) {
    if (this._isDirectedGraph) {
      this._transposedMatrix[destination][source] = true;
      this._adjMatrix[source][destination] = true;
    } else {
      this._adjMatrix[source][destination] = true;
      this._adjMatrix[destination][source] = true;
    }
  }

  shortestPath(source, destination) {
    if (
      this._adjMatrix[source] === undefined ||
      this._adjMatrix[destination] === undefined
    ) {
      return "Vertex is not exist";
    }

    let queue = new Queue();
    let visitedVertexes = Array(this._adjMatrix.length).fill(false);
    queue.push(source);
    let parent = Array(this._adjMatrix.length).fill(0);
    parent[source] = -1;
    visitedVertexes[source] = true;

    while (queue.size()) {
      let tmpVertex = queue.pop();

      if (tmpVertex === destination) {
        return this.#shortestPath(tmpVertex, destination);
      }

      this._adjMatrix[tmpVertex].forEach((neighbor) => {
        if (
          !visitedVertexes[neighbor] &&
          this._adjMatrix[tmpVertex][neighbor]
        ) {
          queue.push(tmpVertex);
          visitedVertexes[neighbor] = true;

          if (parent[neighbor] === -1) {
            parent[neighbor] = tmpVertex;
          }
        }
      });
    }
  }

  #shortestPath(source, destination, parent) {
    while (destination !== source) {
      d = parent[d];
    }
    // smth
    return d;
  }

  allPossiblePaths(source, destination) {
    if (
      this._adjMatrix[source] === undefined ||
      this._adjMatrix[destination] === undefined
    ) {
      return "Vertex is not exist";
    }
    let visitedVertexes = Array(this._adjMatrix.length).fill(false);

    this.#allPossiblePaths(source, destination, visitedVertexes);
  }

  #allPossiblePaths(source, destination, visitedVertexes) {
    visitedVertexes[source] = true;
    if (source === destination) {
      console.log("get path");
    }

    this._adjMatrix[source].forEach((neighbor) => {
      if (!visitedVertexes[neighbor] && this._adjMatrix[source][neighbor]) {
        this.#allPossiblePaths(neighbor, destination, visitedVertexes);
      }
    });
    visitedVertexes[source] = false;
  }

  isCycle() {
    let visitedVertexes = Array(this._adjMatrix.length).fill(false);

    for (let i = 0; i < this._adjMatrix.length; ++i) {
      if (!visitedVertexes[i]) {
        if (this.#isCycle(i, visitedVertexes, null)) {
          return true;
        }
      }
    }
    return false;
  }

  #isCycle(source, visitedVertexes, prevVertex) {
    visitedVertexes[source] = true;

    this._adjMatrix[source].forEach((neighbor) => {
      if (!visitedVertexes[neighbor] && this._adjMatrix[source][neighbor]) {
        if (this.#isCycle(neighbor, visitedVertexes, prevVertex)) {
          return true;
        } else if (neighbor !== prevVertex) {
          return true;
        }
      }
    });
    return false;
  }

  isCycleDirectedGraph() {
    let visitedVertexes = Array(this._adjMatrix.length).fill(false);
    let recursiveStack = Array(this._adjMatrix.length).fill(false);

    for (let i = 0; i < this._adjMatrix.length; ++i) {
      if (!visitedVertexes[i]) {
        if (this.#isCycle(i, visitedVertexes, recursiveStack)) {
          return true;
        }
      }
    }

    return false;
  }

  #isCycleDirectedGraph(source, visited, recursiveStack) {
    recursiveStack[source] = true;
    visited[source] = true;

    this._adjMatrix[source].forEach((neighbor) => {
      if (!visited[neighbor] && this._adjMatrix[source][neighbor]) {
        if (this.#isCycleDirectedGraph(neighbor, visited, recursiveStack)) {
          return true;
        } else if (recursiveStack[neighbor]) {
          return true;
        }
      }
    });
    recursiveStack[source] = false;
    return false;
  }

  topSort() {
    let visitedVertexes = Array(this._adjMatrix.length).fill(false);
    let sorted = [];
    for (let i = 0; i < this._adjMatrix.length; ++i) {
      if (!visitedVertexes[i]) {
        this.#topSort(i, visitedVertexes, sorted);
      }
    }
    return sorted;
  }
  #topSort(vertex, visited, sorted) {
    visited[vertex] = true;

    this._adjMatrix.forEach((neighbor) => {
      if (!visited[neighbor] && this._adjMatrix[source][neighbor]) {
        this.#topSort(neighbor, visited, sorted);
      }
    });
    sorted.unshift(vertex);
  }
}

let graph = new ElementaryGraph(true);

graph.addVertex(5);

graph.addEdge(0, 1);
graph.addEdge(2, 1);
graph.addEdge(4, 3);
graph.addEdge(2, 0);

console.log(graph._adjMatrix);
