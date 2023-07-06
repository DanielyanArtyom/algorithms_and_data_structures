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

class Graph {
  adjList = null;
  isDirected = false;
  transposedList = null;

  constructor(isDirected) {
    this.adjList = [];
    this.transposedList = [];
    this.isDirected = isDirected;
  }

  getRandomInt(max = 100) {
    return Math.floor(Math.random() * max);
  }

  addVertex(vertexCount) {
    //  generating graph without edges
    for (let i = 0; i < vertexCount; ++i) {
      this.adjList[i] = [];
      if (this.isDirected) {
        this.transposedList[i] = [];
      }
    }
  }

  addEdge(source, destination) {
    if (this._isDirectedGraph) {
      this._transposedList[destination].push([source, this.getRandomInt()]);
      this.adjList[source].push([destination, this.getRandomInt()]);
    } else {
      this.adjList[source].push([destination, this.getRandomInt()]);
      this.adjList[destination].push([source, this.getRandomInt()]);
    }
  }

  bfs(source) {
    let queue = new Queue();
    const visitedElements = Array(this.adjList.length).fill(false);
    queue.push(source);
    visitedElements[source] = true;
    while (queue.size()) {
      let poppedElement = queue.pop();
      this.adjList[poppedElement].forEach((neighbor) => {
        if (!visitedElements[neighbor[0]]) {
          queue.push(neighbor[0]);
          console.log(
            `neighbor bfs vertex:  ${neighbor[0]}, neighbor bfs weight: ${neighbor[1]}`
          );
          visitedElements[neighbor[0]] = true;
        }
      });
    }
  }

  dfsIterative(source) {
    const visitedElements = Array(this.adjList.length).fill(false);
    let stack = new Stack();
    visitedElements[source] = true;
    while (stack.size()) {
      let poppedElement = stack.pop();
      this.adjList[poppedElement].forEach((neighbor) => {
        if (!visitedElements[neighbor[0]]) {
          stack.push(neighbor[0]);
          console.log(
            `current dfs vertex: ${neighbor[0]}, neighbor vertex weight is: ${neighbor[1]}`
          );
          visitedElements[neighbor[0]] = true;
        }
      });
    }
  }

  dfsRecursive(source) {
    const visitedElements = Array(this.adjList.length).fill(false);
    this.#dfs(source, visitedElements);
  }

  dfsExtraCasesRecursive(source) {
    const visitedElements = Array(this.adjList.length).fill(false);
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
    this.adjList[source].forEach((neighbor) => {
      if (!visitedArray[neighbor[0]]) {
        console.log(
          `current dfs vertex: ${neighbor[0]}, neighbor vertex weight is: ${neighbor[1]}`
        );
        this.#dfs(neighbor[0], visitedArray);
      }
    });
  }

  allPossiblePaths(source, destination) {
    let visitedVertexes = Array(this.adjList.length).fill(false);

    this.#allPossiblePaths(source, destination, visitedVertexes);
  }

  #allPossiblePaths(source, destination, visitedVertexes) {
    visitedVertexes[source] = true;
    if (source === destination) {
      console.log("get path");
    }

    this.adjList[source].forEach((neighbor) => {
      if (!visitedVertexes[neighbor[0]]) {
        this.#allPossiblePaths(neighbor[0], destination, visitedVertexes);
      }
    });
    visitedVertexes[source] = false;
  }

  isCycle() {
    let visitedVertexes = Array(this.adjList.length).fill(false);

    for (let i = 0; i < this.adjList.length; ++i) {
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

    this.adjList[source].forEach((neighbor) => {
      if (!visitedVertexes[neighbor[0]]) {
        if (this.#isCycle(neighbor[0], visitedVertexes, source[0])) {
          return true;
        } else if (neighbor !== prevVertex) {
          return true;
        }
      }
      return false;
    });
  }

  isCycleDirectedGraph() {
    let visitedVertexes = Array(this.adjList.length).fill(false);
    let recursiveStack = Array(this.adjList.length).fill(false);

    for (let i = 0; i < this.adjList.length; ++i) {
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

    this.adjList[source].forEach((neighbor) => {
      if (!visited[neighbor[0]]) {
        if (this.#isCycleDirectedGraph(neighbor[0], visited, recursiveStack)) {
          return true;
        } else if (recursiveStack[neighbor[0]]) {
          return true;
        }
      }
    });
    recursiveStack[source] = false;
    return false;
  }
}
