/*
*   Binary search tree implementation
*/
class SearchNode {
    constructor( value ) {
        if (value === undefined)
            throw new TypeError('searchTree requires a value on construction')

        this.value = value;

        this.left = undefined;
        this.right = undefined;
    }

    contains(value) {
        const node = this.findNode(value);
        return node === undefined ? false : true;
    }

    findNode(value) {
        if (value === undefined) throw new TypeError('SearchNode.findNode: requires a value to search for.');
        // is value already a SearchNode instance?
        if (value instanceof SearchNode)
            return value;

        if (this.value == value)
            return this;

        const left = this.left ? this.left.findNode(value) : undefined;
        const right = this.right ? this.right.findNode(value) : undefined;

        return left || right;
    }

    parentOf(value) {
        const node = this.findNode(value);
        // Node was not found
        if (node == undefined)
            return undefined;

        const queue = [];
        queue.push(this);

        while(queue.length > 0) {
            const cur = queue.shift();
            if (cur.left) queue.push(cur.left);
            if (cur.right) queue.push(cur.right);

            if (cur.left === node || cur.right === node)
                return cur;
        }
        return undefined;
    }

    insert(value) {
        if (value > this.value) {
            if (this.right == undefined) {
                this.right = new SearchNode(value);
            } else {
                this.right.insert(value);
            }
        } else {
            if (this.left == undefined) {
                this.left = new SearchNode(value);
            } else {
                this.left.insert(value);
            }
        }
    }

    delete(value) {
        const node = this.findNode(value);

        if (node == undefined)
            // Throw an error sense we may be relying on the return value
            // to redefine the root node of our tree.
            throw new Error('Cannot delete an invalid node.');

        const parentOf = this.parentOf(node);

        if (node.left == undefined && node.right == undefined) {
           // delete node
            if (parentOf) {
                parentOf[parentOf.__getBranch(node)] = undefined;
                return this;
            }
            // this is the root node, and it has no children, return undefined.
            return undefined;
        /*
        *   One branch is a valid node while the other branch is undefined
        */
        } else if (node.left == undefined || node.right == undefined) {
            // delete node and replace parent's link with left or right subtree.
            if (parentOf) {
                const branch = parentOf.__getBranch(node);

                if (node.left) {
                    parentOf[branch] = node.left;
                } else {
                    parentOf[branch] = node.right;
                }

                return this;
            } else {
                // node is the tree root, nothing to delete, return a link to child
                // node.
                if (node.left)
                    return node.left;
                else return node.right;
            }
            /*
            *   Both branches are valid nodes, find the longest branch, remove a node from that branch,
            *   and replace the deleted node with it.
            */
        } else {
            // does this node have a parent element
            if (parentOf) {
                const branch = parentOf.__getBranch(node);
                let child;

                if (node.right.getHeight() - node.left.getHeight() > 0)
                    child = node.right.getSmallestNode();
                else
                    child = node.left.getLargestNode();

                // Remove the child node from the tree.
                this.delete(child);

                child.left = node.left;
                child.right = node.right;

                parentOf[branch] = child;

                return this;
            } else {
                // this node is the root, need to return a new root node,
                //  after merging left and right branches
                if (node.right.getHeight() - node.left.getHeight() > 0) {
                    const child = node.right.getSmallestNode();
                    this.delete(child);
                    child.right = node.right;
                    child.left = node.left;
                    return child;
                } else {
                    const child = node.left.getLargestNode();
                    this.delete(child);
                    child.right = node.right;
                    child.left = node.left;
                    return child;
                }
            }
        }
    }

    getSmallestNode() {
        let smallest = this;
        while (smallest.left)
            smallest = smallest.left;
        return smallest;
    }

    getLargestNode() {
        let largest = this;
        while( largest.right)
            largest = largest.right;
        return largest;
    }

    __getBranch(node) {
        if (this.left === node) {
            return 'left';
        } else if (this.right === node) {
            return 'right';
        }
    }

    isValid(min = -Infinity, max = Infinity) {
        if (this.value < min || this.value > max)
            return false;

        const leftIsValid = this.left == undefined ? true :
            this.left.isValid(min, this.value);

        const rightIsValid = this.right == undefined ? true :
            this.right.isValid(this.value, max);

        return leftIsValid && rightIsValid;
    }

    getHeight(curHeight = 1) {

        const leftHeight = this.left == undefined ? curHeight : this.left.getHeight(curHeight + 1);
        const rightHeight = this.right == undefined ? curHeight : this.right.getHeight(curHeight + 1);

        return leftHeight > rightHeight ? leftHeight : rightHeight;
    }

    getNodeCount() {
        const leftCount = this.left == undefined ? 0 : this.left.getNodeCount();
        const rightCount = this.right == undefined ? 0 : this.right.getNodeCount();

        return leftCount + rightCount + 1;
    }

    isBalanced(by = 0) {
        const height = this.getHeight();
        const nodeCount = this.getNodeCount();
        return Math.floor( Math.log2(nodeCount) ) < ( height + by );
    }

    *[Symbol.iterator]() {
        // convert tree into an array to freeze state
        const data = this.toArray();
        for (const v of data)
            yield v;
    }

    toArray(arr = []) {
        if (this.left)
            this.left.toArray(arr);

        arr.push(this.value);

        if (this.right)
            this.right.toArray(arr);

        return arr;
    }

    toString() {
        return `[${this.toArray().join(', ')}]`;
    }
}

function buildSearchTree (value, ...children) {
    // Merge value and children into one array

    if (Array.isArray(value)){
        if (children.length > 0)
            value.push(...children);
    } else {
        children.push(value);
        value = children;
    }
    // Sort the array of values
    value.sort( (a,b) => a - b );

    return _buildTree(value);

    function _buildTree (arr, root, left=0, right=arr.length-1) {
        const mid = Math.floor( (right - left ) / 2  + left );

        if (root === undefined) {
            root = new SearchNode(arr[mid]);
        } else {
            root.insert(arr[mid]);
        }

        if (left < mid)
            _buildTree(arr, root, left, mid - 1);

        if (right > mid)
            _buildTree(arr, root, mid + 1, right);

        return root;
    }
}


/*
*   Trie implementation
*/

class TrieNode {
    constructor(word='') {
        this.char = word.slice(0,1).toLocaleLowerCase();
        this.terminus = word.length === 1;
        this.children = new Map();

        // Add children nodes ???
        if (word.length > 1)
            this.add(word.slice(1));
    }

    add(...words) {
        words.forEach( word => {
            if (Array.isArray(word)) {
                this.add(...word);
            } else {
                if (word.length === 0) {
                    this.terminus = true;
                } else {
                    const char = word.slice(0,1).toLowerCase();
                    if (this.children.has(char)) {
                        this.children.get(char).add(word.slice(1).toLowerCase());
                    } else {
                        this.children.set(char, new TrieNode(word.toLowerCase()));
                    }
                }
            }
        });
    }

    getSuggestions(searchString, numOf = 5, suggestions=[], built='') {
        if (typeof searchString !== 'string') throw new TypeError('Tries.getSuggestions(), requires a string to search');

        if (searchString.length === 0 && suggestions.length < numOf) {
            // get Suggestions
            if (this.terminus)
                suggestions.push(`${built}${this.char}`);

            for(const [key, child] of this.children) {
                child.getSuggestions('', numOf, suggestions, `${built}${this.char}`);
            }
        } else {
            // walk down the trie
            const next = searchString.slice(0,1);

            if (this.children.has(next)) {
                this.children.get(next).getSuggestions(searchString.slice(1), numOf, suggestions, `${built}${this.char}`);
            }
        }

        return suggestions;
    }
}

export {
    SearchNode,
    buildSearchTree,
    TrieNode
};