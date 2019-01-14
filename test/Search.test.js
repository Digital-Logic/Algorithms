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


describe('nodeBST', () => {
    it('Should be able to build a BST from an array', () => {
        const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var bst = arrayToBST(arr);
        expect(bst.inorder()).toEqual(arr);
    });
    it('Should be able to validate a BST', () => {
        const bst = new nodeBST(5);
        bst.left = new nodeBST(3);
        bst.left.left = new nodeBST(2);
        bst.left.right = new nodeBST(4);
        bst.right = new nodeBST(9);
        bst.right.left = new nodeBST(7);
        bst.right.left.left = new nodeBST(6);
        bst.right.left.right = new nodeBST(8);
        bst.right.right = new nodeBST(12);
        bst.right.right.right = new nodeBST(14);
        bst.right.right.left = new nodeBST(11);

        expect(bst.isValid()).toBe(true);
    });

    it('Should validate a simple BST', () => {
        const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var bst = arrayToBST(arr);
        expect(bst.isValid()).toBe(true);
    });
});

describe('nodeBST method validations', () => {
    const arr = [1,2,3,4,5,6,7,8,9];
    const bst = arrayToBST(arr);

    it('Should be able to insert new data', () => {
        const arr = [1,2,3,4,5,6];
        const bst = arrayToBST(arr);
        bst.insert(8);
        bst.insert(7);
        bst.insert(9);
        expect(bst.isValid()).toBe(true);
    });

    it('Validate level order output', () => {
        const lot = bst.levelOrder();
        expect(lot).toEqual([5,2,7,1,3,6,8,4,9]);
    });
    it('Should get tree height', () => {
        expect(bst.height()).toBe(4);
    });
    it('Is the tree balanced', () => {
        expect(bst.isBalanced()).toBe(true);
        const bst2 = new nodeBST(5);
        expect(bst2.isBalanced()).toBe(true);
        bst2.left = new nodeBST(3);
        expect(bst2.isBalanced()).toBe(true);
        bst2.left.left = new nodeBST(1);
        expect(bst2.isBalanced()).toBe(false);
        bst2.right = new nodeBST(8);
        expect(bst.isBalanced()).toBe(true);
        bst2.left.right = new nodeBST(4);
        expect(bst2.isBalanced()).toBe(true);
        bst2.left.left.left = new nodeBST(0);
        expect(bst2.isBalanced()).toBe(false);
    });
    it('Should return correct node count', () => {
        expect(bst.nodeCount()).toBe(9);
    });
    it('Should find values in the BST', () => {
        expect(bst.find(2)).toBe(true);
        expect(bst.find(5)).toBe(true);
    });
    it('Should find max value', () => {
        expect(bst.maxValue()).toBe(9);
    });
    it('Should find min value', () => {
        expect(bst.minValue()).toBe(1);
    });
    it('Find parent node of', () => {
        const myNode = bst.left.right;
        const parent = bst.left;
        expect(myNode.parentOf(bst)).toBe(parent);
        expect(myNode.parentOf(bst).value).toBe(parent.value);
    });
});

describe('nodeBST test with large dataset', () => {
    var bst;
    var arr;

    beforeEach(() => {
        arr = [];
        bst = undefined;
        // Generate 1000 random unique numbers
        for (let i=0; i<1000; ++i)
        {
            do {
                var ranNum = Math.round(Math.random() * 10000);
            } while(arr.indexOf(ranNum) !== -1);
            arr.push(ranNum);
        }
        quickSortMidPivot(arr);
        expect(validateSort(arr)).toBe(true);

        bst = arrayToBST(arr);
        expect(bst.isValid()).toBe(true);
    });

    it('Should be iterable', () => {
        const it = [...bst];
        expect(validateSort(it)).toBe(true);
    });

    it('Should be mappable',()=> {
        const bstMapped = bst.inorderMap(x => x * 2);
        expect(bstMapped.isValid()).toBe(true);
        const bstArr = [...bst];
        const mapArr = [...bstMapped];
    });
});

describe('BST', () => {
    const arrOfNums = [1,2,3,4,5,6,7,8,9];
    let bst;

    beforeEach(() => {
        bst = new BST(arrOfNums);
    });

    it('Delete node without children', () => {
        const minNode = bst.minNode();
        expect(minNode.value).toBe(1);
        // minNode.delete();
    });
});