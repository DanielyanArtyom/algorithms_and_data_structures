// const test1 = [5, 2, 3, 7, 1, 3, 2, 6];
const test1 = [4, 5, 2, 3, 1, 6, 7, 11, 20, 14, 25, 13];

const randomPivot = (nums, start, end) => {
  let i = start;
  let j = end;
  const _randomPivot = start + Math.floor(Math.random() * (end - start + 1));
  const _randomPivotNumber = nums[_randomPivot];

  while (i <= j) {
    while (nums[i] < _randomPivotNumber) {
      ++i;
    }

    while (nums[j] > _randomPivotNumber) {
      --j;
    }

    if (i <= j) {
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;

      ++i;
      --j;
    }
  }

  return i;
};

const quickSort = (nums, start, end) => {
  if (nums.length < 2) {
    return nums;
  }
  const idx = randomPivot(nums, start, end);
  if (start < idx - 1) {
    quickSort(nums, start, idx - 1);
  }

  if (idx < end) {
    quickSort(nums, idx, end);
  }

  return nums;
};

console.log(quickSort(test1, 0, test1.length - 1));
