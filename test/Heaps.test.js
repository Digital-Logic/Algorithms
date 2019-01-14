import { MinHeap, minHeapifyDown, maxHeapifyDown, minHeapifyUp, maxHeapifyUp } from '../src/Heaps';

describe('MinHeap', () => {
    it('Should construct', () => {
        const myHeap = new MinHeap();
    });
    it('Should initialize with data', () => {
        const myHeap = new MinHeap(3,2,1);
        expect(myHeap._heap).toEqual([1,2,3]);
        expect(new MinHeap(3,1,2)._heap).toEqual([1,3,2]);
    });
    it('Should add data', () => {
        const myHeap = new MinHeap(5,3,7);
        expect(myHeap._heap).toEqual([3,5,7]);
        myHeap.set(2);
        expect(myHeap._heap).toEqual([2,3,7,5]);
        myHeap.set(4);
        expect(myHeap._heap).toEqual([2,3,7,5,4]);
    });
    it('Should add multiply elements add once', () => {
        const myHeap = new MinHeap(5,3,7);
        expect(myHeap._heap).toEqual([3,5,7]);
        myHeap.set(2,4);
        expect(myHeap._heap.length).toEqual(5);
    });
    it('Should get items', () => {
        const myHeap = new MinHeap(5,3,7,4);
        expect(myHeap.get()).toBe(3);
        expect(myHeap.get()).toBe(4);
        expect(myHeap.peek()).toBe(5);
        expect(myHeap.get()).toBe(5);
        expect(myHeap.get()).toBe(7);
    });
    it('Should merge large sets, and remove in order', () => {
        const set1 = [];
        const set2 = [];
        for(let i=0; i<1000; ++i)
        {
            set1.push(Math.floor(Math.random() * 1000));
            set2.push(Math.floor(Math.random() * 1000));
        }
        const myHeap = new MinHeap(...set1);
        myHeap.set(...set2);
        expect(myHeap.length()).toBe(set1.length + set2.length);
        let lastNum = -Infinity;
        while(!myHeap.empty())
        {
            const temp = myHeap.get();
            expect(temp).toBeGreaterThanOrEqual(lastNum);
            lastNum = temp;
        }
    });
});

describe('Heap functions', () => {
    it('MinHeapifyDown', () => {
        const arr1 = [3,2,1];
        expect(minHeapifyDown(arr1)).toEqual([1,2,3]);
        const arr2 = [3,1,2];
        expect(minHeapifyDown(arr2)).toEqual([1,3,2]);
    });
    it('MaxHeapifyDown', () => {
        expect(maxHeapifyDown([1,2,3])).toEqual([3,2,1]);
        expect(maxHeapifyDown([1,3,2])).toEqual([3,1,2]);
    });
    it('MinHeapifyUp', () => {
        expect(minHeapifyUp([3,2,1])).toEqual([1,2,3]);
        expect(minHeapifyUp([3,1,2])).toEqual([2,1,3]);
        expect(minHeapifyUp([3,1,2],1)).toEqual([1,3,2]);
    });
    it('MaxHeapifyUp', () => {
        expect(maxHeapifyUp([1,2,3])).toEqual([3,2,1]);
        expect(maxHeapifyUp([1,3,2])).toEqual([2,3,1]);
        expect(maxHeapifyUp([1,3,2],1)).toEqual([3,1,2]);
    });
});
