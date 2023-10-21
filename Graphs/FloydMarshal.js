class FloydMarshal {
  adjMatrix = [];
  dp = [];
  nextMatrix = [];

  makeMatrix(graph) {
    for (const neighbor of graph) {
      for ({ vertex, cost } of graph[neighbor.vertex]) {
        this.adjMatrix[neighbor.vertex][vertex] = Infinity;

        if (vertex === neighbor.vertex) {
          this.adjMatrix[neighbor.vertex][vertex] = 0;
        }
      }
      this.dp = this.adjMatrix;
    }
  }

  makeNext(graph) {
    for (const u of graph) {
      for ({ vertex, cost } of graph[u.vertex]) {
        if (this.adjMatrix[u.vertex][vertex] !== Infinity) {
          this.nextMatrix[u.vertex][vertex] = graph;
        }
      }
    }
  }

  fw(graph) {
    this.makeMatrix(graph);

    this.makeNext(this.adjMatrix);

    for (let k = 0; k < graph.length; ++k) {
      for (let i = 0; i < graph.length; ++i) {
        for (let j = 0; j < graph.length; ++j) {
          if (this.dp[i][j] > this.dp[i][k] + this.dp[k][j]) {
            this.dp[i][j] = dp[i][k] + this.dp[k][j];

            this.nextMatrix[i][j] = this.nextMatrix[i][k];
          }
        }
      }
    }

    for (let k = 0; k < graph.length; ++k) {
      for (let i = 0; i < graph.length; ++i) {
        for (let j = 0; j < graph.length; ++j) {
          if (this.dp[i][j] > this.dp[i][k] + this.dp[k][j]) {
            this.dp[i][j] = Number.NEGATIVE_INFINITY;

            this.nextMatrix[i][j] = -1;
          }
        }
      }
    }
  }

  reconstractPath(source, destination) {
    if (this.adjMatrix[source][destination] === Infinity) {
      return "there is no path";
    }

    let i = source;
    let res = [];

    for (; i !== destination; i = this.nextMatrix[i][destination]) {
      if (this.nextMatrix[i][destination] === -1) {
        return "there is no path";
      }
      res.push(i);
    }

    res.push(destination);
    return res;
  }
}
