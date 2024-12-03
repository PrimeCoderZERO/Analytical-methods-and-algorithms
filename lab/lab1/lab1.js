function linearSearch(arr, target) {
    let comparisons = 0;
    for (let i = 0; i < arr.length; i++) {
        comparisons++;
        if (arr[i] === target) {
            return { index: i, comparisons };
        }
    }
    return { index: -1, comparisons };
}

function binarySearch(arr, target) {
    let comparisons = 0;
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        comparisons++;
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return { index: mid, comparisons };
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return { index: -1, comparisons };
}

function interpolationSearch(arr, target) {
    let comparisons = 0;
    let left = 0, right = arr.length - 1;

    while (left <= right && target >= arr[left] && target <= arr[right]) {
        comparisons++;
        if (left === right) {
            if (arr[left] === target) {
                return { index: left, comparisons };
            }
            return { index: -1, comparisons };
        }

        let pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));

        if (arr[pos] === target) {
            return { index: pos, comparisons };
        }
        if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    return { index: -1, comparisons };
}

function sortArray(arr) {
    return arr.sort((a, b) => a - b);
}

function testSearchAlgorithms() {
    const results = [];
    for (let size = 100; size <= 1000; size += 100) {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        const sortedArr = sortArray([...arr]);
        const target = arr[Math.floor(Math.random() * arr.length)];

        const linearResult = linearSearch(arr, target);

        const binaryResult = binarySearch(sortedArr, target);

        const interpolationResult = interpolationSearch(sortedArr, target);

        results.push({
            size,
            target,
            linearComparisons: linearResult.comparisons,
            binaryComparisons: binaryResult.comparisons,
            interpolationComparisons: interpolationResult.comparisons,
        });
    }
    console.table(results);
}

testSearchAlgorithms();
