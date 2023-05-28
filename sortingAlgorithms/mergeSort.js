const test1 = [4, 5, 2, 3, 1, 6, 7, 11, 20, 14, 25, 13];
// const test1 = [5, 2, 4, 7, 1, 3, 2, 6];

const merge = (array, first, mid, last) => {
  let tmp = Array(array.length).fill(0);
  let first1 = first;
  let last1 = mid;
  let first2 = mid + 1;
  let last2 = last;
  let idx = first;
  while (first1 <= last1 && first2 <= last2) {
    if (array[first1] < array[first2]) {
      tmp[idx++] = array[first1++];
    } else {
      tmp[idx++] = array[first2++];
    }
  }

  while (first1 <= last1) {
    tmp[idx++] = array[first1++];
  }
  while (first2 <= last2) {
    tmp[idx++] = array[first2++];
  }
  console.log(tmp);

    for (let i = first; i <= last; ++i) {
      array[i] = tmp[i];
    }
};

const mergeSort = (array, first, last) => {
  if (first < last) {
    let mid = Math.floor(first + (last - first) / 2);

    mergeSort(array, first, mid);
    mergeSort(array, mid + 1, last);

    merge(array, first, mid, last);
  }
  
};
mergeSort(test1, 0, test1.length - 1);
