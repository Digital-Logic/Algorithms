
function binarySearch(array, searchValue, left=0, right=array.length-1) {
    const mid = Math.floor((right - left) / 2 + left);

    if (array[mid] === searchValue) {
        // Value found: return value and index
        return {
            value: searchValue,
            index: mid
        };
    } else if (left >= right) {
        // end traversal, value cannot be found;
        return false;
    } else if (searchValue < array[mid]) {
        // value is in left branch
        return binarySearch(array, searchValue, left, mid-1);
    } else {
        // value must be in right branch
        return binarySearch(array, searchValue, mid+1, right);
    }
}

function binarySearchIterative(arr, searchValue) {
    var left = 0,
        right = arr.length - 1;

    while ( left <= right ) {
        let mid = Math.floor((right - left) / 2 + left );

        if (arr[mid] === searchValue) {
            return {
                value: searchValue,
                index: mid
            };
        } else if (searchValue < arr[mid]) {
            right = mid-1;
        } else {
            left = mid+1;
        }
    }

    return false;
}


export {
    binarySearch,
    binarySearchIterative
};