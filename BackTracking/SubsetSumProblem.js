const backtrack = (arr, sum, idx) => {
  if (sum === 0) {
    return true;
  }
  if (idx === 0) {
    return false;
  }

  if (arr[idx] > sum) {
    ssp(arr, sum, idx - 1);
  }

  return ssp(arr, sum, idx - 1) || ssp(arr, sum - arr[idx], idx - 1);
};
