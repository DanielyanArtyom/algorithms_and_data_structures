const test1 = [
  4, 5, 2, 3, 1, 2, 2, 5, 20, 4, 25, 13, -11, -2, 3, -2, 10, 5, 5, 5, -11,
];

const countingSort = (nums, min, max) => {
  let _countELements = {};

  for (let i = 0; i < nums.length; ++i) {
    if (_countELements[nums[i]] !== undefined) {
      _countELements[nums[i]] += 1;
    } else {
      _countELements[nums[i]] = 1;
    }
  }

  const sortedArr = [];
  for (let i = min; i <= max; i++) {
    while (_countELements[i] > 0) {
      sortedArr.push(i);
      --_countELements[i];
    }
  }
  return sortedArr;
};


console.log(countingSort(test1, -11, 25));
