class Node {
  value = null;
  next = null;

  constructor(data, next) {
    this.value = data;
    this.next = next;
  }
}

class SingleLinkList {
  _head = null;
  #_size = null;

  constructor() {
    this._head = null;
    this.#_size = 0;
  }

  pushFirst(value) {
    let newNode = null;
    if (!this._head) {
      newNode = new Node(value, null);
    } else {
      newNode = new Node(value, this._head);
    }
    this._head = newNode;
  }

  pushBack(data) {
    let current = null;
    if (!this._head) {
      this._head = new Node(data, null);
    } else {
      current = this._head;

      while (current.next) {
        current = current.next;
      }
      let newElement = new Node(data, null);
      current.next = newElement;
    }
    ++this.#_size;
  }

  printList() {
    let current = this._head;
    let str = "";
    while (current) {
      str += `${current.value}, `;
      current = current.next;
    }
    return str;
  }

  pushBack(data) {
    let newElement = new Node(data, null);
    let current = null;
    if (!this._head) {
      this._head = newElement;
    } else {
      current = this._head;
      while (current.next) {
        current = current.next;
      }
      current.next = newElement;
    }

    ++this.#_size;
  }

  popBack() {
    if (!this._head) {
      return null;
    }

    let current = this._head;

    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
    --this.#_size;
  }

  removeNode(target) {
    if (!this._head) {
      return null;
    }

    if (this._head.value === target) {
      this._head = this._head.next;
      --this.#_size;
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
      current.next = current.next.next;
      --this.#_size;
    }
  }

  searchElement(target) {
    if (!this._head) {
      return null;
    }

    if (this._head.value === target) {
      return this._head;
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

    ++this.#_size;
    if (!this._head) {
      this._head = new Node(value, null);
      return null;
    }

    if (!position) {
      let newNode = new Node(value, this._head);
      this._head = newNode;
      return null;
    }

    let current = this._head;
    let findPosition = 0;

    while (findPosition !== position - 1 && current.next) {
      current = current.next;
      ++findPosition;
    }

    if (!current.next) {
      let newNode = new Node(value, null);
      current.next = newNode;
      return;
    }

    if (findPosition === position - 1) {
      let newNode = new Node(value, current.next);
      current.next = newNode;
    }
  }

  isEmpty() {
    return Boolean(!this.#_size);
  }

  listSize() {
    return this.#_size;
  }

  reverseList() {
    if (!this._head && !this._head.next) {
      return null;
    }

    let current = this._head;

    let prev = null;
    let next = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this._head = prev;
  }

  insertionSort() {
    if (!this._head && !this._head.next) {
      return null;
    }
    let current = this._head;
    let sortedList = null;

    while (current) {
      if (!sortedList) {
        sortedList = new Node(current.value, null);
      } else {
        if (current.value < sortedList.value) {
          let newNode = new Node(current.value, sortedList);
          sortedList = newNode;
        } else {
          let sortedCurrent = sortedList;

          while (
            sortedCurrent.next &&
            current.value < sortedCurrent.next.value
          ) {
            sortedCurrent = sortedCurrent.next;
          }

          if (!sortedCurrent.next) {
            sortedCurrent.next = new Node(current.value, null);
          } else if (current.value < sortedCurrent.next.value) {
            sortedCurrent = new Node(current.value, sortedCurrent.next);
          }
        }
      }
      current = current.next;
    }

    this._head = sortedList;
  }

  getMiddle(head) {
    if (!head) {
      return head;
    }
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  sortList(head) {
    if (!head || !head.next) {
      return head;
    }

    let middle = this.getMiddle(head);

    let nextOfMiddle = middle.next;
    middle.next = null;

    let left = this.sortList(head);
    let right = this.sortList(nextOfMiddle);
    let sortedList = this.#mergeTwoLists(left, right);

    return sortedList;
  }

  #mergeTwoLists = function (list1, list2) {
    if (!list1) {
      return list2;
    }
    if (!list2) {
      return list1;
    }
    if (list1.value < list2.value) {
      list1.next = mergeTwoLists(list1.next, list2);
      return list1;
    } else {
      list2.next = mergeTwoLists(list1, list2.next);
      return list2;
    }
  };
}

const newList = new SingleLinkList();

console.log("start", newList.listSize());

newList.pushBack(5);
newList.pushBack(6);
newList.pushBack(12);
newList.pushFirst(1);

console.log("after push front and back", newList.printList());

newList.popBack();
newList.popBack();
newList.popBack();

console.log("after pop back", newList.printList());

newList.pushPosition(2, 5);
newList.pushPosition(2, 3);
newList.pushPosition(1, 15);
newList.pushPosition(0, 7);

console.log("after pushPosition", newList.printList());

console.log(newList.searchElement(33));
newList.removeNode(15);
newList.removeNode(7);
newList.removeNode(7);

console.log("after removing", newList.printList());

newList.reverseList();
console.log("reverse", newList.printList());

// newList.insertionSort();
// console.log("insertionSort", newList.printList());

newList.sortList(newList._head);

console.log("sortList", newList.printList());
