class Node {
  value = null;
  next = null;
  prev = null;
  greater = null;
  smaller = null;

  constructor(value, next = null, prev = null, greater = null, smaller = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
    this.greater = greater;
    this.smaller = smaller;
  }
}

class SelfOrganizingLinkList {
  _size = null;
  _head = null;
  _tail = null;
  _greatestNode = null;
  _smallestNode = null;

  constructor() {
    this._head = null;
    this._size = 0;
    this._tail = null;
    this._greatestNode = null;
    this._smallestNode = null;
  }

  pushFirst(value) {
    let newNode = null;
    if (!this._head) {
      newNode = new Node(value);
      this._head = newNode;
      this._tail = newNode;
      this._greatestNode = newNode;
      this._smallestNode = newNode;
      return null;
    }
    newNode = new Node(value, this._head);
    this._head.prev = newNode;
    this._head = newNode;
    ++this._size;
    this.putInSortedOrder(newNode);
  }

  printFromHead() {
    let current = this._head;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.next;
    }
    return str;
  }

  printFromTail() {
    let current = this._tail;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.prev;
    }
    return str;
  }

  printFromGreates() {
    let current = this._greatestNode;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.smaller;
    }
    return str;
  }

  printFromSmallest() {
    let current = this._smallestNode;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.greater;
    }
    return str;
  }

  pushBack(data) {
    let current = null;
    if (!this._head) {
      this._head = new Node(data);
    } else {
      current = this._head;

      while (current.next) {
        current = current.next;
      }
      let newElement = new Node(data, null, current);
      current.next = newElement;
      this._tail = newElement;
      this.putInSortedOrder(newElement);
    }
    ++this._size;
  }

  popBack() {
    if (!this._head) {
      return null;
    }

    let current = this._head;

    while (current.next.next) {
      current = current.next;
    }
    current.next.prev = null;
    this.removeInSortedOrder(current.next);
    current.next = null;
    this._tail = current;
    --this._size;
  }

  removeNode(target) {
    if (!this._head) {
      return null;
    }

    if (this._head.value === target) {
      this.removeInSortedOrder(this._head);
      this._head = this._head.next;
      this._head.prev = null;
      --this._size;
      return null;
    }

    if (this._tail.value === target) {
      this.removeInSortedOrder(this._tail);
      this._tail = this._tail.prev;
      this._tail.next = null;
      --this._size;
      return null;
    }

    if (this._greatestNode.value === target) {
      this._greatestNode = this._greatestNode.smaller;
      this._greatestNode.greater = null;
      --this._size;
      return null;
    }

    if (this._smallestNode.value === target) {
      this._smallestNode = this._greatestNode.greater;
      this._smallestNode.smaller = null;
      --this._size;
      return null;
    }

    let current = this._head;

    while (current.next && current.next.value !== target) {
      current = current.next;
    }

    if (current.next === null) {
      return current.value !== target ? "There is no target element" : null;
    }

    if (current.next.value === target) {
      this.removeInSortedOrder(current.next);
      current.next = current.next.next;
      if (current.next.next) {
        current.next.next.prev = current;
      }
      --this._size;
    }
  }

  searchElement(target) {
    if (!this._head) {
      return null;
    }

    if (this._head.value === target) {
      return this._head;
    }

    if (this._tail.value === target) {
      return this._tail;
    }

    if (this._greatestNode.value === target) {
      return this._greatestNode;
    }

    if (this._smallestNode.value === target) {
      return this._smallestNode;
    }

    let current = this._head;

    while (current.value !== target && current.next) {
      current = current.next;
    }

    return current.value === target ? current : "There is no target element";
  }

  pushPosition(position, value) {
    if (position < 0) {
      return null;
    }

    let newNode = null;
    ++this._size;
    if (!this._head && !this._tail) {
      let newNode = new Node(value);
      this._head = newNode;
      this._tail = newNode;
      return null;
    }

    if (!position) {
      newNode = new Node(value, this._head, null);
      this._head = newNode;
      this.putInSortedOrder(newNode);
      return null;
    }

    let current = this._head;
    let findPosition = 0;

    while (findPosition !== position - 1 && current.next) {
      current = current.next;
      ++findPosition;
    }

    if (!current.next) {
      newNode = new Node(value, null, current);
      this._tail = newNode;
      current.next = newNode;
      this.putInSortedOrder(newNode);
      return;
    }

    if (findPosition === position - 1) {
      newNode = new Node(value, current.next, current);
      current.next = newNode;
      this.putInSortedOrder(newNode);
    }
  }

  putInSortedOrder(newNodeElement) {
    if (!this._greatestNode) {
      this._greatestNode = newNodeElement;
      this._smallestNode = newNodeElement;
      return null;
    }

    if (newNodeElement.value > this._greatestNode.value) {
      newNodeElement.greater = null;
      newNodeElement.smaller = this._greatestNode;
      this._greatestNode.greater = newNodeElement;
      this._greatestNode = newNodeElement;
      return null;
    }

    if (newNodeElement.value < this._smallestNode.value) {
      newNodeElement.smaller = null;
      newNodeElement.greater = this._smallestNode;
      this._smallestNode.smaller = newNodeElement;
      this._smallestNode = newNodeElement;
      return null;
    }

    let current = this._smallestNode;

    while (current.value < newNodeElement.value) {
      current = current.greater;
    }

    newNodeElement.greater = current;
    newNodeElement.smaller = current.smaller;
    current.smaller.greater = newNodeElement;
    current.smaller = newNodeElement;
    return null;
  }

  removeInSortedOrder(nodeForRemove) {
    if (!nodeForRemove.greater) {
      nodeForRemove.smaller.greater = null;
      this._greatestNode = nodeForRemove.smaller;
      nodeForRemove.smaller = null;

      return null;
    }

    if (!nodeForRemove.smaller) {
      nodeForRemove.greater.smaller = null;
      this._smallestNode = nodeForRemove.greater;
      nodeForRemove.greater = null;
      return;
    }

    nodeForRemove.greater.smaller = nodeForRemove.smaller;
    nodeForRemove.smaller.greater = nodeForRemove.greater;
    nodeForRemove.smaller = null;
    nodeForRemove.greater = null;
    return null;
  }

  isEmpty() {
    return !!this._size;
  }

  reverseNodes = (start, end) => {
    let previous = start.prev;
    let next = end.next;
    start.prev = end;
    end.prev = previous;
    start.next = next;
    end.next = start;
    if (end.prev) {
      end.prev.next = end;
    }
    return end;
  };

  getNode(value) {
    if (this._head.value === value) {
      return this._head;
    }

    if (this._tail.value === value) {
      let tmpTail = this._tail;
      let newTail = this.reverseNodes(this._tail.prev, tmpTail);
      this._tail = newTail;
      return tmpTail;
    }

    let current = this._head;

    while (current.next) {
      if (current.next.value === value) {
        let tmpNext = current.next;
        let node = this.reverseNodes(current, current.next);

        if (!node.prev) {
          this._head = node;
        }

        return tmpNext;
      }
      current = current.next;
    }

    return "there is no such element";
  }
}

const newList = new SelfOrganizingLinkList();

newList.pushFirst(1);
newList.pushFirst(5);
newList.pushFirst(4);
newList.pushFirst(10);
newList.pushFirst(2);
newList.pushFirst(7);

// console.log("Head pushFirst : ", newList.printFromHead());
// console.log("Greatest pushFirst : ", newList.printFromGreates());
// console.log("Smallest pushFirst: ", newList.printFromSmallest());
// console.log("Tail pushFirst: ", newList.printFromTail());

newList.pushBack(12);
newList.pushBack(3);
newList.pushBack(2);
newList.pushBack(9);

// console.log("Head pushBack : ", newList.printFromHead());
// console.log("Greatest pushBack : ", newList.printFromGreates());
// console.log("Smallest pushBack: ", newList.printFromSmallest());
// console.log("Tail pushBack: ", newList.printFromTail());

// newList.popBack();
// newList.popBack();
// newList.popBack();

// newList.removeNode(2);

console.log("Head before : ", newList.printFromHead());

newList.getNode(5);
newList.getNode(5);
newList.getNode(5);
newList.getNode(5);
newList.getNode(5);

newList.getNode(9);
newList.getNode(9);

newList.getNode(2);
// newList.getNode(9);

console.log("Head getElement : ", newList.printFromHead());
