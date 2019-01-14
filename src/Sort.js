import { maxHeapifyDown } from './Heaps';

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


function bubbleSort(arr) {
    for(let i=0; i<arr.length -1; ++i)
    {
        for (let j=i+1; j<arr.length; ++j)
        {
            if (arr[i]>arr[j])
            {
                swap(arr, i, j);
            }
        }
    }
    return arr;
}

function bubbleSortOptimized(arr){

    var sorted=false;
    var i=0;

    while(!sorted) {
        sorted=true;

        for (let j=i+1; j<arr.length; ++j)
        {
            if (arr[i]>arr[j])
            {
                swap(arr, i, j);
                sorted=false;
            }
        }
        ++i;
    }

    return arr;
}

function selectSort(arr) {
    for(let i=0; i < arr.length-1; ++i)
    {
        let min = i;
        for(let j=i+1; j < arr.length; ++j)
        {
            if (arr[j] < arr[min])
            {
                min = j;
            }
        }
        swap(arr, i, min);
    }
    return arr;
}

function insertSort(arr) {
    for(let i=0; i < arr.length; ++i)
    {
        let cur=i;
        while(cur > 0 && arr[cur] < arr[cur-1])
        {
            swap(arr, cur, cur-1);
            --cur;
        }
    }

    return arr;
}

function shellSort(arr) {

    // Define span width, this value will be used in the next for loop
    for(var span=1; span <= arr.length/9; span=3*span+1);
    // On each iteration, decrease the span width by dividing it by 3
    for(; span>0; span = Math.round(span / 3))
    {
        for(let i=span-1; i <= arr.length; ++i)
        {
            let cur=i;
            while(cur > 0 && arr[cur] < arr[cur-span])
            {
                swap(arr, cur, cur-span);
                cur=cur-span;
            }
        }
    }
    return arr;
}

/*
*   Quick Sort
*/
const quickSort = buildQuickSort(
    function partition(arr, left, right) {
        let pivotValue = arr[left];

        while(left < right)
        {
            while( arr[left] < pivotValue)
                ++left;

            while( arr[right] > pivotValue)
                --right;

            swap(arr, left, right);
        }
        return right;
    }
);


const quickSortMidPivot = buildQuickSort(
    function partition(arr, left, right) {

        // pick mid element value
        const mid = Math.floor((right - left) / 2 + left);
        const pivotValue = arr[mid];

        while(left < right)
        {
            while( arr[left] < pivotValue)
                ++left;

            while( arr[right] > pivotValue)
                --right;

            swap(arr, left, right);
        }

        return right;
    }
);


function buildQuickSort(partition)
{
    return function _quickSort(arr, left=0, right=arr.length-1)
    {
        if (left < right)
        {
            const pivot = partition(arr, left, right);
            quickSort(arr, left, pivot-1);
            quickSort(arr, pivot+1, right);
        }

        return arr;
    };
}

/*
*   Merge Sort
*/

function mergeSort(arr) {

    // if the array is an arry of only 1 element, return
    if (arr.length === 1)
        return arr;

    const mid = Math.floor(arr.length / 2);

    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(
        mergeSort(left),
        mergeSort(right)
    );


    function merge(left, right) {
        const result = [];

        let indexLeft = 0, indexRight = 0;

        while( indexLeft < left.length && indexRight < right.length) {
            if (left[indexLeft] < right[indexRight])
                result.push(left[indexLeft++]);
            else result.push(right[indexRight++]);
        }

        // merge any elements left over in left or right array with the result array.
        return [ ...result, ...left.slice(indexLeft), ...right.slice(indexRight) ];
    }
}

function heapSort(array) {

    // Heapify the array
    for (let index = Math.floor(array.length / 2); index >=0; --index)
        maxHeapifyDown(array, index);

    for (let heapSize = array.length; heapSize > 0; --heapSize) {
        maxHeapifyDown(array, 0, heapSize);
        swap(array, 0, heapSize-1);
    }
    return array;
}


export {
    bubbleSort,
  //  bubbleSortOptimized,
    selectSort,
    insertSort,
    shellSort,
    quickSort,
    quickSortMidPivot,
    mergeSort,
    heapSort
};