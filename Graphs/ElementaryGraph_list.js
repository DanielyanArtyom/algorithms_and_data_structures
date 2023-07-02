class Queue {
  _queue = null;

  constructor() {
    this._queue = [];
  }

  push(element) {
    if (!this._queue.length) {
      this._queue.push(element);
    } else {
      this._queue = [element, ...this._queue];
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

    let poppendElement = this._queue[0];

    this._queue = tmpArray;
    return poppendElement;
  }

  front() {
    return this._queue[0];
  }
  back() {
    return this._queue[this._queue.length - 1];
  }

  size() {
    console.log(this._queue);
    return this._queue.length;
  }

  empty() {
    this._queue = [];
  }
}

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
    const poppedElement = this._stack.pop();
    this._top = this._stack[this._stack.length - 1];
    return poppedElement;
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

class ElementaryGraph {
  _adjacencyList = null;
  _isDirectedGraph = false;

  constructor(isDirected = false) {
    this._adjacencyList = [];
    this._isDirectedGraph = isDirected;
  }

  bfs(source) {
    let queue = new Queue();
    const visitedElements = Array(this._adjacencyList.length).fill(false);
    queue.push(source);
    visitedElements[source] = true;
    while (queue.size()) {
      let poppedElement = queue.pop();
      this._adjacencyList[poppedElement].forEach((neighbor) => {
        if (!visitedElements[neighbor]) {
          queue.push(neighbor);
          console.log(`current bfs vertex:  ${neighbor}`);
          visitedElements[neighbor] = true;
        }
      });
    }
  }

  dfsIterative(source) {
    const visitedElements = Array(this._adjacencyList.length).fill(false);
    let stack = new Stack();
    visitedElements[source] = true;
    while (stack.size()) {
      let poppedElement = stack.pop();
      this._adjacencyList[poppedElement].forEach((neighbor) => {
        if (!visitedElements[neighbor]) {
          stack.push(neighbor);
          console.log(`current dfs vertex: ${neighbor}`);
          visitedElements[neighbor] = true;
        }
      });
    }
  }

  dfsRecursive(source) {
    const visitedElements = Array(this._adjacencyList.length).fill(false);
    this.#dfs(source, visitedElements);
  }

  dfsExtraCasesRecursive(source) {
    const visitedElements = Array(this._adjacencyList.length).fill(false);
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
    this._adjacencyList[source].forEach((neighbor) => {
      if (!visitedArray[neighbor]) {
        console.log(`current dfs vertex: ${neighbor}`);
        this.#dfs(neighbor, visitedArray);
      }
    });
  }

  addVertex(vertexCount) {
    //  generating graph without edges

    for (let i = 0; i <= vertexCount; ++i) {
      this._adjacencyList[i] = [];
    }
  }

  addEdge(source, destination) {
    if (
      this.adjacencyList[source] === undefined ||
      this.adjacencyList[destination] === undefined
    ) {
      return null;
    }

    if (this._isDirectedGraph) {
      // this._adjacencyList[v].push(source)
      this._adjacencyList[source].push(destination);
    } else {
      this._adjacencyList[source].push(destination);
      this._adjacencyList[destination].push(source);
    }
  }

  shortestPath(source, destination) {
    let queue = new Queue();
    let visitedVertexes = Array(this._adjacencyList.length).fill(false);
    queue.push(source);
    let parent = Array(this._adjacencyList.length).fill(0);
    parent[source] = -1;
    visitedVertexes[source] = true;

    while (queue.size()) {
      let tmpVertex = queue.pop();

      this._adjacencyList[tmpVertex].forEach((neighbor) => {
        if (!visitedVertexes[neighbor]) {
          queue.push(tmpVertex);
          visitedVertexes[neighbor] = true;

          if (parent[neighbor] === -1) {
            parent[neighbor] = tmpVertex;
          }

          if (neighbor === destination) {
            return this.#shortestPath(source, destination);
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
  }

  allPossiblePaths(source, destination) {
    let visitedVertexes = Array(this._adjacencyList.length).fill(false);

    this.#allPossiblePaths(source, destination, visitedVertexes);
  }

  #allPossiblePaths(source, destination, visitedVertexes) {
    visitedVertexes[source] = true;
    if (source === destination) {
      console.log("get path");
    }

    this._adjacencyList[source].forEach((neighbor) => {
      if (!visitedVertexes[neighbor]) {
        this.#allPossiblePaths(neighbor, destination, visitedVertexes);
      }
    });
    visitedVertexes[source] = false;
  }

  isCycle() {
    let visitedVertexes = Array(this._adjacencyList.length).fill(false);

    for (let i = 0; i < this._adjacencyList.length; ++i) {
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

    this._adjacencyList[source].forEach((neighbor) => {
      if (!visitedVertexes[neighbor]) {
        if (this.#isCycle(neighbor, visitedVertexes, prevVertex)) {
          return true;
        } else if (neighbor !== prevVertex) {
          return true;
        }
      }
      return false;
    });
  }

  isCycleDirectedGraph() {
    let visitedVertexes = Array(this._adjacencyList.length).fill(false);
    let recursiveStack = Array(this._adjacencyList.length).fill(false);

    for (let i = 0; i < this._adjacencyList.length; ++i) {
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

    this._adjacencyList[source].forEach((neighbor) => {
      if (!visited[neighbor]) {
        if (this.#isCycleDirectedGraph(neighbor, visited, recursiveStack)) {
          return true;
        } else if (recursiveStack[neighbor]) {
          return true;
        }
      }
    });
    recursiveStack[neighbor] = false;
    return false;
  }

  topSort() {
    let visitedVertexes = Array(this._adjacencyList.length).fill(false);
    let sorted = [];
    for (let i = 0; i < this._adjacencyList.length; ++i) {
      if (!visitedVertexes[i]) {
        this.#topSort(i, visitedVertexes, sorted);
      }
    }
    return sorted;
  }
  #topSort(vertex, visited, sorted) {
    visited[vertex] = true;

    this._adjacencyList.forEach((neighbor) => {
      if (!visited[neighbor]) {
        this.#topSort(neighbor, visited, sorted);
      }
    });
    sorted.unshift(vertex);
  }
}
