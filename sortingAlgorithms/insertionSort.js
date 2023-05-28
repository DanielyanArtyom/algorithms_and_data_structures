const _inputArray = [-5,10,2,35,7,-11,58,102,1];

const insertionSort = (array) => {
  for (let i = 0; i < array.length; ++i) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; --j) {
      let temp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = temp;
    }
  }

  return array;
};

console.log(insertionSort(_inputArray));
