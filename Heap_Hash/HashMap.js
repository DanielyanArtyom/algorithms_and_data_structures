class DynamicArray {
  _array = null;
  _length = null;
  _capacity = null;
  _lastElement = null;

  constructor() {
    this._array = Array(8);
    this._length = 0;
    this._capacity = 8;
  }

  #updateArraySize(count) {
    let tmp = Array(count).fill(undefined);
    let slicedArray = tmp.slice(this._array.length, tmp.length);
    this._array = [...this._array, ...slicedArray];
  }

  #decreaseArraySize() {
    const idx = this._array.findIndex((el) => el === undefined);
    let slicedArray = this._array.slice(0, idx);
    this._array = slicedArray;
  }

  #addElementToArray(element) {
    const idx = this._array.findIndex((el) => el === undefined);
    this._array[idx] = element;
  }

  #updateLastElement() {
    const lastIdx = this._array.findIndex((el) => el === undefined);
    this._lastElement = this._array[lastIdx - 1];
  }

  getArray() {
    return this._array.filter((el) => el !== undefined);
  }

  push(element) {
    if (this._length === 0 && this._capacity === 0) {
      this._capacity = 1;
      this._array.push(element);
      this._lastElement = element;
      ++this._length;
      return null;
    }

    if (this._capacity === this._length) {
      this._capacity *= 2;
      this.#updateArraySize(this._capacity);
    }

    this.#addElementToArray(element);
    this._lastElement = element;
    ++this._length;
    return null;
  }

  pop() {
    if (!this._length && !this._capacity) {
      return null;
    }

    this._array[this._length - 1] = undefined;

    --this._length;

    if (this._capacity / 2 - 5 === this._length) {
      this._capacity = this._capacity / 2 - 5;
      this.#decreaseArraySize();
    }

    this.#updateLastElement();
  }

  insert(position, val, count) {
    if (count + this._length >= this._capacity) {
      this._capacity *= 2;
      this.#updateArraySize(this._capacity);
    }

    if (position === this._length) {
      for (let i = 0; i < count; ++i) {
        this._array[this._length] = val;
        ++this._length;
      }
      return null;
    }

    let tmp = [];
    let iterations = this._array.length;
    let i = 0;
    let k = 0;

    while (i < iterations) {
      if (i === position && k === position) {
        for (let j = 0; j < count; ++j) {
          tmp[k] = val;
          ++k;
        }
      } else {
        tmp[k] = this._array[i];
        ++i;
        ++k;
      }
    }

    this._array = tmp;
    this._length = this._length + count;

    this.#updateLastElement();
  }

  insertArray(position, staticArray) {
    if (staticArray.length + this._length >= this._capacity) {
      this._capacity *= 2;
      this.#updateArraySize(this._capacity);
    }

    if (position === this._length) {
      for (let i = 0; i < count; ++i) {
        this._array[this._length] = staticArray[i];
        ++this._length;
      }
      return null;
    }

    let tmp = [];
    let iterations = this._array.length;
    let i = 0;
    let k = 0;

    while (i < iterations) {
      if (i === position && k === position) {
        for (let j = 0; j < count; ++j) {
          tmp[k] = staticArray[j];
          ++k;
        }
      } else {
        tmp[k] = this._array[i];
        ++i;
        ++k;
      }
    }

    this.#updateLastElement();
  }

  erase(pos, count) {
    let leftSide = this._array.slice(0, pos);
    let rightSide = this._array.slice(pos + count, this._array.length);
    this._array = [...leftSide, ...rightSide];
    this._length = this._length - count;

    if (this._capacity / 2 - 5 === this._length) {
      this.#decreaseArraySize();
    }
    this.#updateLastElement();
  }

  size() {
    return this._length;
  }

  capacity() {
    return this._capacity;
  }

  isEmpty() {
    return Boolean(!this._length);
  }

  clean() {
    this._capacity = 0;
    this._length = 0;
    this._array = [];
    this._lastElement = null;
  }
  resize(count) {
    this._capacity += count;
    this.#updateArraySize(count);
  }
}

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
      if (this._head.next) {
        this._head = this._head.next;
        --this.#_size;
        return false;
      }
      return true;
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

class HashMap {
  _size = null;
  _storage = null;
  _loadFactor = null;

  constructor() {
    this._size = 0;
    this._storage = new DynamicArray(true);
    this._loadFactor = 0;
  }

  #hash(key) {
    let hash = 0;

    if (typeof key === "number") {
      while (key >= this._storage.capacity()) {
        key %= this._storage.capacity();
      }
      return key;
    }

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % this._storage.capacity();
  }

  set(key) {
    ++this._loadFactor;
    let idx = this.#hash(key);
    let currentEntry = null;
    if (!this._storage._array[idx]) {
      let newList = new SingleLinkList();
      newList.pushBack(key, null);
      this._storage.insert(idx, newList, 1);
    } else {
      currentEntry = this._storage._array[idx];
      currentEntry.pushBack(key);
    }
  }

  delete(key) {
    if (!this._storage.capacity()) {
      return "Storage is Empty";
    }
    let idx = this.#hash(key);

    if (!this._storage._array[idx]) {
      return "There is no such element";
    }
    --this._loadFactor;
    let currentList = this._storage._array[idx];
    const isFullyRemoved = currentList.removeNode(key);

    if (isFullyRemoved) {
      this._storage.erase(idx, 1);
    }
  }

  get(key) {
    let idx = this.#hash(key);

    if (!this._storage._array[idx]) {
      return "There is no such element";
    }

    let currentList = this._storage._array[idx];
    return currentList.searchElement(key);
  }
}

const hashMap = new HashMap();

hashMap.set("mibanEli");
hashMap.set("masdas");
hashMap.set("asdaeasd");

hashMap.delete("mibanEli");
hashMap.delete("masdas");

console.log(hashMap.get("asdaeasd"));
