const _array = [0,5,2,4,7,55,33,12,-1,-5,4,7,]
const _array1 = [23, 45, 12, 56, 78, 34, 21, 90]

const bubbleSort = (array) => {
    for(let i = 0; i < array.length; ++i) {
        for(let j = 0; j < array.length - i; ++j) {
            if(array[j] > array[j + 1]) {
                const temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
        }
    }
    return array
}


console.log(bubbleSort(_array1))