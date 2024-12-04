function bubbleSort(arr) {
    let comparisons = 0;
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            comparisons++;
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return comparisons;
}
function selectionSort(arr) {
    let comparisons = 0;
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return comparisons;
}
function insertionSort(arr) {
    let comparisons = 0;
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            comparisons++;
            arr[j + 1] = arr[j];
            j--;
        }
        comparisons++;
        arr[j + 1] = current;
    }
    return comparisons;
}
function quickSort(arr) {
    let comparisons = 0;
    
    function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            comparisons++;
            if (arr[j] < pivot) {
                i++;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    function quickSortRecursive(arr, low, high) {
        if (low < high) {
            let pivotIndex = partition(arr, low, high);
            quickSortRecursive(arr, low, pivotIndex - 1);
            quickSortRecursive(arr, pivotIndex + 1, high);
        }
    }

    quickSortRecursive(arr, 0, arr.length - 1);
    return comparisons;
}
function mergeSort(arr) {
    let comparisons = 0;

    function merge(left, right) {
        let result = [];
        let i = 0;
        let j = 0;
        while (i < left.length && j < right.length) {
            comparisons++;
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        return result.concat(left.slice(i), right.slice(j));
    }

    function mergeSortRecursive(arr) {
        if (arr.length <= 1) return arr;
        let mid = Math.floor(arr.length / 2);
        let left = mergeSortRecursive(arr.slice(0, mid));
        let right = mergeSortRecursive(arr.slice(mid));
        return merge(left, right);
    }

    mergeSortRecursive(arr);
    return comparisons;
}

function generateRandomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000)); 
    }
    return arr;
}

function generateNearlySortedArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(i);
    }
    arr[Math.floor(size / 2)] = Math.floor(Math.random() * 1000); 
    return arr;
}

function generateReverseSortedArray(size) {
    let arr = [];
    for (let i = size; i > 0; i--) {
        arr.push(i);
    }
    return arr;
}


let sizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

for (let size of sizes) {
    // Випадковий набір даних
    let randomArr = generateRandomArray(size);
    console.log(`Size: ${size} (Random)`);
    console.log('Bubble Sort Comparisons:', bubbleSort([...randomArr]));
    console.log('Selection Sort Comparisons:', selectionSort([...randomArr]));
    console.log('Insertion Sort Comparisons:', insertionSort([...randomArr]));
    console.log('Quick Sort Comparisons:', quickSort([...randomArr]));
    console.log('Merge Sort Comparisons:', mergeSort([...randomArr]));

    // Майже відсортований набір
    let nearlySortedArr = generateNearlySortedArray(size);
    console.log(`Size: ${size} (Nearly Sorted)`);
    console.log('Bubble Sort Comparisons:', bubbleSort([...nearlySortedArr]));
    console.log('Selection Sort Comparisons:', selectionSort([...nearlySortedArr]));
    console.log('Insertion Sort Comparisons:', insertionSort([...nearlySortedArr]));
    console.log('Quick Sort Comparisons:', quickSort([...nearlySortedArr]));
    console.log('Merge Sort Comparisons:', mergeSort([...nearlySortedArr]));

    // Відсортований в зворотному порядку
    let reverseSortedArr = generateReverseSortedArray(size);
    console.log(`Size: ${size} (Reverse Sorted)`);
    console.log('Bubble Sort Comparisons:', bubbleSort([...reverseSortedArr]));
    console.log('Selection Sort Comparisons:', selectionSort([...reverseSortedArr]));
    console.log('Insertion Sort Comparisons:', insertionSort([...reverseSortedArr]));
    console.log('Quick Sort Comparisons:', quickSort([...reverseSortedArr]));
    console.log('Merge Sort Comparisons:', mergeSort([...reverseSortedArr]));
}

