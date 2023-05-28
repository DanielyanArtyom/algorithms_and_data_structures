const _inputArray = [0,5,2,4,7,55,33,12,-1,-5,4,7,];

const selectionSort = (array) => {
  for (let i = 0; i < array.length; ++i) {
    let minElementIdx = i;

    for (let j = i + 1; j < array.length; ++j) {
      if (array[j] < array[minElementIdx]) {
        minElementIdx = j;
      }
    }

    let temp = array[i];
    array[i] = array[minElementIdx];
    array[minElementIdx] = temp;
  }
  return array;
};

console.log(selectionSort(_inputArray));
