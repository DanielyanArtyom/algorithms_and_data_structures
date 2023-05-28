// const test1 = [5, 2, 3, 7, 1, 3, 2, 6];
const test1 = [4, 5, 2, 3, 1, 6, 7, 11, 20, 14, 25, 13];


const _findElementToSwap = (nums, start, mid, end) => {
  let i = start;
  let j = end;

  while (i <= j) {

    while (nums[i] < nums[mid]) {
      ++i;
    }

    while (nums[j] > nums[mid]) {
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
  let idx = null;

  if (nums.length < 1) {
    return nums;
  }

  const mid = Math.floor(start + (end - start) / 2);
  idx = _findElementToSwap(nums, start, mid, end);

  if (start < idx - 1) {
    quickSort(nums, start, idx - 1);
  }

  if (idx < end) {
    quickSort(nums, idx, end);
  }

  return nums;
};

console.log(quickSort(test1, 0, test1.length - 1));
