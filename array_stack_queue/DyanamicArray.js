class DynamicArray {
  #_array = null;
  _length = null;
  _capacity = null;
  _lastElement = null;

  constructor() {
    this.#_array = [];
    this._length = 0;
    this._capacity = 0;
  }

  #updateArraySize(count) {
    let tmp = Array(count).fill(undefined);
    let slicedArray = tmp.slice(this.#_array.length, tmp.length);
    this.#_array = [...this.#_array, ...slicedArray];
  }

  #decreaseArraySize() {
    const idx = this.#_array.findIndex((el) => el === undefined);
    let slicedArray = this.#_array.slice(0, idx);
    this.#_array = slicedArray;
  }

  #addElementToArray(element) {
    const idx = this.#_array.findIndex((el) => el === undefined);
    this.#_array[idx] = element;
  }

  #updateLastElement() {
    const lastIdx = this.#_array.findIndex((el) => el === undefined);
    this._lastElement = this.#_array[lastIdx - 1];
  }

  getArray() {
    return this.#_array.filter((el) => el !== undefined);
  }

  push(element) {
    if (this._length === 0 && this._capacity === 0) {
      this._capacity = 1;
      this.#_array.push(element);
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

    this.#_array[this._length - 1] = undefined;

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
        this.#_array[this._length] = val;
        ++this._length;
      }
      return null;
    }

    let tmp = [];
    let iterations = this.#_array.length;
    let i = 0;
    let k = 0;

    while (i < iterations) {
      if (i === position && k === position) {
        for (let j = 0; j < count; ++j) {
          tmp[k] = val;
          ++k;
        }
      } else {
        tmp[k] = this.#_array[i];
        ++i;
        ++k;
      }
    }

    this.#_array = tmp;
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
        this.#_array[this._length] = staticArray[i];
        ++this._length;
      }
      return null;
    }

    let tmp = [];
    let iterations = this.#_array.length;
    let i = 0;
    let k = 0;

    while (i < iterations) {
      if (i === position && k === position) {
        for (let j = 0; j < count; ++j) {
          tmp[k] = staticArray[j];
          ++k;
        }
      } else {
        tmp[k] = this.#_array[i];
        ++i;
        ++k;
      }
    }

    this.#updateLastElement();
  }

  erase(pos, count) {
    let leftSide = this.#_array.slice(0, pos);
    let rightSide = this.#_array.slice(pos + count, this.#_array.length);
    this.#_array = [...leftSide, ...rightSide];
    this._length = this._length - count;

    if (this._capacity / 2 - 5 === this._length) {
      this.#decreaseArraySize();
    }
    this.#updateLastElement();
  }

  size() {
    return this._length;
  }

  isEmpty() {
    return Boolean(!this._length);
  }

  clean() {
    this._capacity = 0;
    this._length = 0;
    this.#_array = [];
    this._lastElement = null;
  }
  resize(count) {
    this._capacity += count;
    this.#updateArraySize(count);
  }
}

const dynamicArray = new DynamicArray();

console.log("here", dynamicArray.getArray());

dynamicArray.push(15);
dynamicArray.push(2);
dynamicArray.push(34);
dynamicArray.push(0);
dynamicArray.push(5);
console.log("push", dynamicArray.getArray());
console.log("length", dynamicArray.size());
dynamicArray.pop();
dynamicArray.pop();

console.log("pop", dynamicArray.getArray());

dynamicArray.insert(2, 11, 3);
console.log("insert", dynamicArray.getArray());
dynamicArray.erase(2, 3);
console.log(
  "erase",
  dynamicArray.getArray(),
  dynamicArray._capacity,
  dynamicArray._length
);
console.log("empty", dynamicArray.isEmpty());
dynamicArray.resize(15);

console.log("resize", dynamicArray._capacity);
dynamicArray.clean();

console.log(
  "clean",
  dynamicArray.getArray(),
  dynamicArray._capacity,
  dynamicArray._length
);
