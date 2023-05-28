const test1 = [4, 5, 2, 3, 1, 2, 2, 5, 20, 4, 25, 13, 3, 10, 5, 5, 5];

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

const radixSort = (nums) => {
  let multiplier = 1;
  let maxDigits = Math.max(...nums);

  while (multiplier < maxDigits) {
    let positions = Array.from({ length: 10 }, () => []);

    nums.forEach((el) => {
      let slicedElement = Math.floor(el / multiplier);

      positions[slicedElement % 10].push(el);
    });
    
    nums = [].concat(...positions);
    ++multiplier;
  }

  return nums;
};

console.log(radixSort(test1));
