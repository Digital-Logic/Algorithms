
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




class BST {
    constructor( values, ...moreValues ) {
        if (Array.isArray(values))
            this.root = arrayToBST([...values, ...moreValues]);
        else this.root = arrayToBST([values, ...moreValues]);
    }

    insert(value) {
        if (this.root == undefined) {
            this.root = new nodeBST(value);
        } else {
            this.root.insert(value);
        }
    }
    delete(node) {
        const parent = this.parentOf(node);
        const branch = getBranch(parent, node);

        if (!node.left && !node.right) {
            parent[branch] = null;
        } else if (node.left && !node.right) {
            parent[branch] = node.left;
        } else if (!node.left && node.right) {
            parent[branch] = node.right;
        } else {
            // Right and left branches of the node that I am about to delete,
            const replacementNode =
                node.left.height() > node.right.height() ?
                    node.left.maxNode() : node.right.minNode();
            // remove replacementNode from the tree.
            this.delete(replacementNode);

            // remap children nodes to replacement node
            replacementNode.left = node.left;
            replacementNode.right = node.right;
            parent[branch] = replacementNode;
        }


        function getBranch(parent, node) {
            if (parent.left === node ){
                return 'left';
            } else if (parent.right === node) {
                return 'right';
            } else {
                return new Error('Node is not a direct /*  */child of parent');
            }
        }
    }
    parentOf(node) {
        return this.root.parentOf(node);
    }
    minNode() {
        return this.root.minNode();
    }
    maxNode() {
        return this.root.maxNode();
    }
}

class nodeBST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    toString() {
        if (this.left != undefined)
            this.left.print();

        console.log(this.value);

        if (this.right != undefined)
            this.right.print();
    }

    find(value) {
        return nodeBST.find(this, value);
    }

    static find(node, value) {
        if (node == undefined)
            return false;

        if (node.value === value)
            return true;

        if (value < node.value)
            return nodeBST.find(node.left, value);

        return nodeBST.find(node.right, value);
    }

    *[Symbol.iterator]() {
        const arr = this.inorder();
        for( const value of arr) {
            yield value;
        }
    }

    inorderMap(fn) {
        return arrayToBST([...this].map(fn));
    }

    levelOrder() {  // aka: Breadth first traversal
        const result = [];
        const children = [this];

        while (children.length > 0) {
            const next = children.shift();
            result.push(next.value);
            if (next.left != undefined)
                children.push(next.left);

            if (next.right != undefined)
                children.push(next.right);
        }
        return result;
    }

    // delete this node
    delete() {
        if (this.left == undefined && this.right == undefined)
            _deleteNode();


        function _deleteNode() {
            // get parent node
            const parent = this.parentOf(this);
            if (parent.left === this)
                parent.left = undefined;
            if (parent.right == this)
                parent.right = undefined;
        }

    }

    maxValue() {
        return this.maxNode().value;
    }
    minValue() {
        return this.minNode().value;
    }
    maxNode() {
        if (this.right == undefined)
            return this;
        else return this.right.maxNode();
    }
    minNode() {
        if (this.left == undefined)
            return this;
        else return this.left.minNode();
    }

    isBalanced() {
        const nodeCount = this.nodeCount();
        const height = this.height();
        const maxHeight = Math.floor(Math.log2( nodeCount )) + 1;
        return height <= maxHeight;
    }

    nodeCount() {
        return nodeBST.nodeCount(this);
    }
    static nodeCount(node) {
        if (node == undefined) {
            return 0;
        }
        const leftBranch = nodeBST.nodeCount(node.left);
        const rightBranch = nodeBST.nodeCount(node.right);
        return leftBranch + rightBranch + 1;
    }

    height() {
        return nodeBST.height(this);
    }

    static height(node) {
        if (node == null)
            return 0;

        var leftHeight = nodeBST.height(node.left);
        var rightHeight = nodeBST.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    inorder(arr = []) {
        if (this.left != undefined)
            this.left.inorder(arr);

        arr.push(this.value);

        if (this.right != undefined)
            this.right.inorder(arr);

        return arr;
    }

    insert(value) {
        if (value < this.value) {
            if (this.left == null) {
                this.left = new nodeBST(value);
            } else {
                this.left.insert(value);
            }
        } else {
            if (this.right == null) {
                this.right = new nodeBST(value);
            } else {
                this.right.insert(value);
            }
        }
    }

    isValid(min = -Infinity, max = Infinity) {

        if (this.value < min || this.value > max)
            return false;

        if (this.left != undefined) {
            if (this.left.isValid(min, this.value) === false)
                return false;
        }

        if (this.right != undefined) {
            if (this.right.isValid(this.value, max) === false)
                return false;
        }

        return true;
    }


    // Get the parentOf `node` node, start search at `root`
    parentOf(root) {
        if (root.left === this || root.right === this)
            return root;
        if (this.value < root.value && root.left)
            return this.parentOf(root.left);
        else if (root.value < this.value && root.right)
            return this.parentOf(root.right);
        else return false;
    }
}

function arrayToBST(arr, root, left=0, right=arr.length-1) {

    const mid = Math.floor((right - left) / 2 + left );

    if (root == undefined) {
        root = new nodeBST(arr[mid]);
    } else {
        root.insert(arr[mid]);
    }

    // Recursively build BST tree structure
    if (left < mid)
    {
        arrayToBST(arr, root, left, mid-1);
    }

    if (right > mid )
    {
        arrayToBST(arr, root, mid+1, right);
    }

    return root;
}


export {
    binarySearch,
    binarySearchIterative,
    arrayToBST,
    nodeBST,
    BST
};