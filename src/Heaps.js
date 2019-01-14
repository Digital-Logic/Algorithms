
class MinHeap {
    constructor(...data) {
        this._heap = MinHeap.normalize(data);
    }

    set(...data) {
        if (data.length === 0)
            return;

        if (data.length > this._heap.length / 2)
        {   // Merge arrays first then normalize
            this._heap = MinHeap.normalize(
                 MinHeap.merge(this._heap, MinHeap.normalize(data))
            );
        } else {
            data.forEach( element => {
                this._heap.push(element);
                this.heapifyUp(this._heap.length - 1);
            });
        }
    }

    get() {
        if (this._heap.length === 0) return undefined;

        if (this._heap.length === 1)
            return this._heap.pop();
        else {
            const temp = this._heap[0];
            this._heap[0] = this._heap.pop();
            this.heapifyDown(0);
            return temp;
        }
    }
    empty() {
        return this._heap.length === 0;
    }
    length() {
        return this._heap.length;
    }
    peek() {
        return this._heap[0];
    }
    heapifyUp(index) {
        minHeapifyUp(this._heap, index);
    }
    heapifyDown(index) {
        minHeapifyDown(this._heap, index);
    }
    static normalize(data) {
        for (let i= Math.floor(data.length / 2); i>=0; --i)
            minHeapifyDown(data, i);
        return data;
    }
    static merge(array1, array2) {
        const temp = [];
        let index1 = 0,
            index2 = 0;

        while(index1 < array1.length && index2 < array2.length)
            temp.push( array1[index1] < array2[index2] ? array1[index1++] : array2[index2++] );

        if(array1.length >= index1)
            temp.push( ...array1.slice(index1));

        if(array2.length >= index2)
            temp.push( ...array2.slice(index2));

        return temp;
    }
}


const minHeapifyDown = heapifyDownBuilder( function _minTest(value1, value2) {
    if (value1 < value2)
        return false;
    return true;
});

const maxHeapifyDown = heapifyDownBuilder( function _maxTest(value1, value2) {
    if (value1 > value2)
        return false;
    return true;
});

const minHeapifyUp = heapifyUpBuilder( function _minTest(child, parent) {
    if (child < parent)
        return true;
    return false;
});

const maxHeapifyUp = heapifyUpBuilder( function _maxTest(child, parent) {
    if (child > parent)
        return true;
    return false;
});

// Heapify up bubbles a value up a heap, used for insertion
function heapifyUpBuilder(testFn) {
    if (typeof testFn !== 'function') throw TypeError('heapifyUpBuilder requires a test function.');

    return _heapifyUp;

    function _heapifyUp(array, index=array.length-1) {
        let parentIndex = getParent(index);
        if (parentIndex >= 0) {
            if (testFn(array[index], array[parentIndex]) )
            {
                swap(array, index, parentIndex);
                _heapifyUp(array, parentIndex);
            }
        }
        return array;
    }
}

function heapifyDownBuilder(testFn) {
    if (typeof testFn !== 'function')
        throw TypeError('heapifyDownBuilder requires a test function.');

    return _heapifyDown;

    function _heapifyDown (array, index=0, heapSize=array.length) {
        let left = getLeft(index),
            right = getRight(index),
            selectedChild;

        if (left < heapSize) {
            selectedChild = left;

            if (right < heapSize && testFn(array[left], array[right]))
                selectedChild = right;

            if (testFn(array[index], array[selectedChild]))
            {
                swap(array, index, selectedChild);
                _heapifyDown(array, selectedChild, heapSize);
            }
        }
        return array;
    }
}

function getLeft(index) { return index * 2 + 1; }
function getRight(index) { return index * 2 + 2; }
function getParent(index) { return Math.floor( (index - 1) / 2 ); }

function swap(array, x, y) {
    let temp = array[x];
    array[x] = array[y];
    array[y] = temp;
    return array;
}



export {
    MinHeap,
    minHeapifyDown,
    maxHeapifyDown,
    minHeapifyUp,
    maxHeapifyUp
};