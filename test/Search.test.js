import { binarySearch, binarySearchIterative, arrayToBST, nodeBST, BST } from '../src/Search';
import { validateSort } from './Sort.test';
import { quickSortMidPivot } from '../src/Sort';


describe('Binary Search', () => {
    const searchArray = [];
    const SMALL = 1000;

    beforeAll(() => {
        for(let i=0; i<SMALL; ++i)
        {
            do {
                var newValue = Math.round(Math.random() * SMALL * 10);
            } while (searchArray.indexOf(newValue) !== -1);
            // Add unique values to searchArray
            searchArray.push(newValue);
        }

        // Sort the array
        quickSortMidPivot(searchArray);

        // validate searchArray is sorted
        if (validateSort(searchArray) === false)
            throw new Error('searchArray is not sorted!');
    });

    const bsCollection = {
        binarySearch,
        binarySearchIterative
    };

    // Test each binary search algorithms
    Object.entries(bsCollection).forEach( ([name, fn]) => {
        it(`${name} should find value in array`, () => {
            // Search for value in sorted array, test repeats 30 times
            for (let i=0; i<30; ++i) {
                var randomIndex = Math.round(Math.random() * SMALL);
                var randomValue = searchArray[randomIndex];
                expect(fn(searchArray, randomValue)).toEqual({ value: randomValue, index: randomIndex });
            }
        });

        it(`${name} should not find value in array`, () => {
            for (let i=0; i<10; ++i)
            {
                do {  // find a value that is not in the searchArray.
                    var searchValue = Math.round(Math.random() * SMALL * 100);
                } while( searchArray.indexOf(searchValue) !== -1);

                expect(fn(searchArray, searchValue)).toBe(false);
            }
        });
    });
});