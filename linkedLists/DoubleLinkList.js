class Node {
  value = null;
  next = null;
  prev = null;

  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLinkList {
  #_head = null;
  #_size = null;
  #_tail = null;

  constructor() {
    this.#_head = null;
    this.#_size = 0;
    this.#_tail = null;
  }

  pushFirst(value) {
    let newNode = null;
    if (!this.#_head) {
      newNode = new Node(value, null, null);
      this.#_tail = newNode;
    } else {
      newNode = new Node(value, this.#_head, null);
    }
    this.#_head = newNode;
    ++this.#_size;
  }

  printFromHead() {
    let current = this.#_head;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.next;
    }
    return str;
  }

  printFromTail() {
    let current = this.#_tail;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.prev;
    }
    return str;
  }

  pushBack(data) {
    let current = null;
    if (!this.#_head) {
      this.#_head = new Node(data, null, null);
    } else {
      current = this.#_head;

      while (current.next) {
        current = current.next;
      }
      let newElement = new Node(data, null, current);
      current.next = newElement;
      this.#_tail = newElement;
    }
    ++this.#_size;
  }

  popBack() {
    if (!this.#_head) {
      return null;
    }

    let current = this.#_head;

    while (current.next.next) {
      current = current.next;
    }
    current.next.prev = null;
    current.next = null;
    this.#_tail = current;
    --this.#_size;
  }

  removeNode(target) {
    if (!this.#_head) {
      return null;
    }

    if (this.#_head.value === target) {
      this.#_head = this.#_head.next;
      this.#_head.prev = null;
      --this.#_size;
      return null;
    }

    if (this.#_tail.value === target) {
      this.#_tail = this.#_tail.prev;
      this.#_tail.next = null;
      --this.#_size;
      return null;
    }

    let current = this.#_head;

    while (current.next && current.next.value !== target) {
      current = current.next;
    }

    if (current.next === null) {
      return current.value !== target ? "There is no target element" : null;
    }

    if (current.next.value === target) {
      current.next = current.next.next;
      if (current.next.next) {
        current.next.next.prev = current;
      }
      --this.#_size;
    }
  }

  searchElement(target) {
    if (!this.#_head) {
      return null;
    }

    if (this.#_head.value === target) {
      return this.#_head;
    }

    if (this.#_tail.value === target) {
      return this._tail;
    }

    let current = this.#_head;

    while (current.value !== target && current.next) {
      current = current.next;
    }

    return current.value === target ? current : "There is no target element";
  }

  pushPosition(position, value) {
    if (position < 0) {
      return null;
    }

    ++this.#_size;
    if (!this.#_head && !this.#_tail) {
      const newNode = new Node(value, null, null);
      this.#_head = newNode;
      this.#_tail = newNode;
      return null;
    }

    if (!position) {
      let newNode = new Node(value, this.#_head, null);
      this.#_head = newNode;
      return null;
    }

    let current = this.#_head;
    let findPosition = 0;

    while (findPosition !== position - 1 && current.next) {
      current = current.next;
      ++findPosition;
    }

    if (!current.next) {
      let newNode = new Node(value, null, current);
      this.#_tail = newNode;
      current.next = newNode;
      return;
    }

    if (findPosition === position - 1) {
      let newNode = new Node(value, current.next, current);
      current.next = newNode;
    }
  }

  reverseList() {
    if (!this.#_head && !this.#_head.next) {
      return null;
    }

    let next = null;
    let prev = null;
    let current = this.#_head;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.#_head = prev;
  }

  isEmpty() {
    return Boolean(!this.#_size);
  }

  listSize() {
    return this.#_size;
  }

  headElement() {
    return this.#_head;
  }
  tailElement() {
    return this.#_tail;
  }
}

const newList = new DoubleLinkList();

console.log("start", newList.listSize());

newList.pushBack(5);
newList.pushBack(6);
newList.pushBack(12);
newList.pushFirst(1);

console.log("after push front and back", newList.printFromHead());

newList.popBack();
newList.popBack();
newList.popBack();

console.log("after pop back", newList.printFromHead());

newList.pushPosition(2, 5);
newList.pushPosition(2, 3);
newList.pushPosition(1, 15);
newList.pushPosition(0, 7);

console.log("after pushPosition", newList.printFromHead());

console.log(newList.searchElement(33));
newList.removeNode(15);
newList.removeNode(7);
newList.removeNode(7);

console.log("after removing", newList.printFromHead());

newList.reverseList();

console.log("after reverse", newList.printFromHead());
