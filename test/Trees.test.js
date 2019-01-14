import { SearchNode, buildSearchTree, TrieNode } from '../src/Trees';
import { validateSort } from './Sort.test';

describe('Binary Search Tree', () => {

    it('Should be able to pass a bunch of simple test', () => {
        const arr = [1,2,3];
        const bst = buildSearchTree(arr);
        expect(bst.value).toBe(2);
        expect(bst.left.value).toBe(1);
        expect(bst.right.value).toBe(3);
        expect(bst.isValid()).toBe(true);
        expect(bst.getHeight()).toBe(2);
        expect(bst.getNodeCount()).toBe(3);
        expect(bst.isBalanced()).toBe(true);
        expect(bst.contains(1)).toBe(true);
        expect(bst.findNode(1)).toBe(bst.left);
        expect(bst.findNode(1).value).toBe(1);
        expect(bst.contains(0)).toBe(false);
        expect(bst.toArray()).toEqual([1,2,3]);
        expect([...bst]).toEqual([1,2,3]);
        expect(bst.toString()).toEqual('[1, 2, 3]');
        expect(bst.parentOf(bst.left).value).toBe(2);
        expect(bst.parentOf(1).value).toBe(2);
        expect(bst.getLargestNode().value).toBe(3);
        expect(bst.getSmallestNode().value).toBe(1);
    });

    it('Should be able to build a simple BST from multiple values', () => {
        const arr = [1,2,3];
        const bst = buildSearchTree(...arr);
        expect(bst.value).toBe(2);
        expect(bst.left.value).toBe(1);
        expect(bst.right.value).toBe(3);
        expect(bst.isValid()).toBe(true);
        expect(bst.getHeight()).toBe(2);
        expect(bst.getNodeCount()).toBe(3);
        expect(bst.isBalanced()).toBe(true);
        expect(bst.findNode(3)).toBe(bst.right);
        expect(bst.contains(3)).toBe(true);
    });

    it('Should be able to build BST from multiply arrays', () => {
        const arr1 = [1,2,3];
        const arr2 = [4,5,6];
        const bst = buildSearchTree(arr1, ...arr2);
        expect(bst.value).toBe(3);
        expect(bst.left.value).toBe(1);
        expect(bst.isValid()).toBe(true);
        expect(bst.getHeight()).toBe(3);
        expect(bst.getNodeCount()).toBe(6);
        expect(bst.isBalanced()).toBe(true);
        expect(bst.findNode(1)).toBe(bst.left);
        expect(bst.findNode(6)).toBe(bst.right.right);
        expect(bst.contains(6)).toBe(true);
        expect(bst.contains(1)).toBe(true);
        expect(bst.toArray()).toEqual([1,2,3,4,5,6]);
        expect([...bst]).toEqual([1,2,3,4,5,6]);
    });

    it('Should not validate if it is invalid', () => {
        const bst = new SearchNode(5);
        bst.left = new SearchNode(3);
        bst.left.left = new SearchNode(4);
        bst.left.right = new SearchNode(4);
        bst.left.right.left = new SearchNode(3);
        bst.right = new SearchNode(7);
        expect(bst.isValid()).toBe(false);
        expect(bst.getHeight()).toBe(4);
    });

    it('Should be able to delete nodes', () => {
        const bst = buildSearchTree([1,2,3,4,5,6]);
        expect(bst.isValid()).toBe(true);
        bst.delete(1);
        expect(bst.isValid()).toBe(true);
        expect(bst.toArray()).toEqual([2,3,4,5,6]);
        bst.delete(2);
        expect(bst.isValid()).toBe(true);
        expect(bst.toArray()).toEqual([3,4,5,6]);
        expect(bst.isValid()).toBe(true);
        expect(bst.isBalanced()).toBe(true);

        let bst2 = buildSearchTree([1,2,3,4,5,6,7,8,9,10]);

        // test deleting root node, and see if all hell breaks loose
        bst2 = bst2.delete(5);
        expect(bst2.toArray()).toEqual([1,2,3,4,6,7,8,9,10]);
        expect(bst2.isValid()).toBe(true);

        bst2 = bst2.delete(4);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([1,2,3,6,7,8,9,10]);

        bst2 = bst2.delete(7);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([1,2,3,6,8,9,10]);

        bst2 = bst2.delete(9);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([1,2,3,6,8,10]);

        bst2 = bst2.delete(2);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([1,3,6,8,10]);

        bst2 = bst2.delete(10);
        expect(bst2.isValid());
        expect(bst2.toArray()).toEqual([1,3,6,8]);

        bst2 = bst2.delete(3);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([1,6,8]);

        bst2 = bst2.delete(8);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([1,6]);

        bst2 = bst2.delete(1);
        expect(bst2.isValid()).toBe(true);
        expect(bst2.toArray()).toEqual([6]);

        // delete the last node, no nodes are left so the tree is now undefined.
        bst2 = bst2.delete(6);
        expect(bst2).toBe(undefined);
    });


    describe('Large dataset', () => {
        const searchArray = [];
        const SIZE = 1000;

        beforeAll(() => {
            for(let i=0; i<SIZE; ++i)
            {
                // Generate unique values
                do {
                    var newValue = Math.round(Math.random() * SIZE * 10);
                } while(searchArray.indexOf(newValue) !== -1);
                searchArray.push(newValue);
            }
            searchArray.sort( (a,b) => a - b);
            if (validateSort(searchArray) === false )
                throw new Error('searchArray was not sorted correctly, fix error in test.');
        });

        it('Should build a valid binary search tree', () => {
            const bst = buildSearchTree(searchArray);
            expect(bst.isValid()).toBe(true);
            expect(bst.getHeight()).toBe(10);
            expect(bst.getNodeCount()).toBe(1000);
            expect(bst.isBalanced()).toBe(true);
        });

        it('Should be able to find values within the bst tree', () => {
            const bst = buildSearchTree(searchArray);
            const COUNT = 100;
            for (let i=0; i< COUNT; ++i) {
                const value = Math.floor(Math.random() * SIZE);
                expect(bst.contains(searchArray[value])).toBe(true);
            }
        });
        it('Should not be able to find those values in the bst tree', () => {
            const bst = buildSearchTree(searchArray);
            const COUNT = 100;
            const notInArr = [];
            for (let i=0; i<COUNT; ++i) {
                do {
                    var newValue = Math.floor(Math.random() * SIZE * 10);
                } while (searchArray.indexOf(newValue) !== -1);
                notInArr.push(newValue);
            }
            notInArr.forEach( v => {
                expect(bst.contains(v)).toBe(false);
            });
        });
        it('Should output an Array, and destructor ', () => {
            const bst = buildSearchTree(searchArray);
            expect(bst.toArray()).toEqual(searchArray);
            expect([...bst]).toEqual(searchArray);
        });

        it('Should get Largest and smallest value stored', () => {
            const bst = buildSearchTree(searchArray);
            expect(bst.getSmallestNode().value).toBe(searchArray[0]);
            expect(bst.getLargestNode().value).toBe(searchArray[searchArray.length - 1]);
        });
    });
});

describe('Tries', () => {
    it('Should construct a node', () => {
        const trie = new TrieNode();
        expect(typeof trie).toBe('object');
        trie.add('Hello');
        // Verify internal structure is correct
        expect(trie.children.get('h').char).toBe('h');
        expect(trie.children.get('h').children.get('e').char).toBe('e');
        expect(trie.children.get('h').children.get('e').children.get('l').char).toBe('l');
        expect(trie.children.get('h').children.get('e').terminus).toBe(false);
        trie.add('Hell');
        expect(trie.children.get('h').children.get('e').children.get('l').children.get('l').terminus).toBe(true);
    });

    it('Should return suggestions - simple', () => {
        const trie = new TrieNode();
        trie.add('Hello');
        trie.add('Hell');
        expect(trie.getSuggestions('he')).toEqual(['hell', 'hello']);
    });

    it('Should return suggestions', () => {
        const words = ['he', 'hell', 'hello', 'height', 'helen', 'help', 'acceptance', 'accent', 'accordantly', 'account', 'accrete', 'accum'];
        const trie = new TrieNode();
        trie.add(words/*  */);
        const sug = trie.getSuggestions('he', 3);
        expect(sug.length).toBe(3);
        sug.forEach( sw => expect(words.filter( w => /he/.test(w) )).toContain(sw));

        const sug2 = trie.getSuggestions('hel');
        sug2.forEach(sw => expect(words.filter( w => /hel/.test(w))).toContain(sw));

        const sug3 = trie.getSuggestions('accep');
        sug3.forEach(sw => expect(words.filter(w => /accep/.test(w))).toContain(sw));

        expect(trie.getSuggestions('dog')).toEqual([]);
    });
});


function randomWordGenerator(min=4, max=8) {
    const letters = ('abcdefghijklmnopqrstuvwxyz').split('');

    const length = Math.floor(Math.random() * (max - min + 1) + min);
    const word = [];

    for (let i=0; i<length; ++i)
        word.push(letters[Math.floor(Math.random() * letters.length)]);
    return word.join('');
}