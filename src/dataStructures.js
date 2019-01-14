import XXH from 'xxhashjs';

class Node {
    constructor(value) {
        this._value = value;
        this.next = null;
    }
    getValue() {
        return this._value;
    }
}

class LinkList {
    constructor(...data) {
        this._head = new Node(undefined);
        this._end = new Node(undefined);

        this._head.next = this._end;
        this._end.next = this._end;

        // allow initialization of empty list.
        if (data.length > 0)
            this.push(...data);
    }
    // push a single value, or multiply values onto the linkList
    push(...data) {
        if (data.length === 0) throw new TypeError('push requires a value');
        // get the last node in the list
        let last = this._head;
        while(last.next !== this._end) {
            last = last.next;
        }

        data.reduce( (lastNode, curValue) => {
            const node = new Node(curValue);
            node.next = lastNode.next;
            lastNode.next = node;
            // return the new last node
            return node;
        }, last);
    }

    pop() {
        let nextToLast = this._head;
        while(nextToLast.next.next !== this._end) {
            nextToLast = nextToLast.next;
        }

        const node = nextToLast.next;
        nextToLast.next = node.next;
        return node.getValue();
    }

    // remove the first element from the list
    shift() {
        if (this._head.next !== this._end)
        {
            const node = this._head.next;
            this._head.next = node.next;
            return node.getValue();
        }
        return undefined;
    }

    unshift(...data) {
        if (data.length === 0) throw new TypeError('unshift requires a value');

        data.reduce( (lastNode, curValue) => {
            const nextNode = new Node(curValue);
            nextNode.next = lastNode.next;
            lastNode.next = nextNode;
            return nextNode;
        }, this._head);
    }

    forEach(fn) {
        [...this].forEach(fn);
    }

    map(fn) {
        return new LinkList( ...[...this].map(fn) );
    }

    filter(fn) {
        return new LinkList( ...[...this].filter(fn));
    }

    reduce(fn, initialValue) {
        return initialValue === undefined ?
            [...this].reduce(fn) :
            [...this].reduce(fn, initialValue);
    }

    *[Symbol.iterator]() {
        let cur = this._head.next;
        while(cur != this._end) {
            yield cur.getValue();
            cur = cur.next;
        }
    }
}

class HashMap {
    constructor(size=100) {
        if (Number.isNaN(Number(size)) || !Number.isInteger(size))
            throw new TypeError(`HashMap: size: ${size} is an invalid integer.`);

        this._hashMap = [];
        for(let i=0; i<size; ++i)
            this._hashMap.push(new LinkList());

        this._hasher = createHash(size);
    }
    has(key) {
        return this._getList(key).reduce( (acc, data) => {
            if (data.key === key)
                return true;
            return acc;
        }, false);
    }
    set(key, value) {
        this._getList(key).push({ key, value });
    }
    _getList(key) {
        return this._hashMap[this._hasher(key)];
    }
    get(key) {
        return this._getList(key).reduce( (acc, data) => {
            if (data.key === key)
                return data.value;
            return acc;
        }, null); // should get return null or undefined when a value is not found?
    }
}

class BloomFilter {
    constructor(size=100) {
        this._filter = [];
        for (let i=0; i<size; ++i)
            this._filter.push(false);

        this._h1 = createHash(size);
        this._h2 = createHash(size);
        this._h3 = createHash(size);
    }
    has(key) {
        return this._filter[this._h1(key)] && this._filter[this._h2(key)] && this._filter[this._h3(key)];
    }
    set(key) {
        this._filter[this._h1(key)] = true;
        this._filter[this._h2(key)] = true;
        this._filter[this._h3(key)] = true;
    }
}

function createHash(span) {
    // generate random seed.
    const seed = Math.floor(Math.random() * 100000);

    return function hash(string) {
        return XXH.h32(seed).update(string).digest().toNumber() % span;
    }
}

export {
    LinkList,
    HashMap,
    BloomFilter,
    createHash
};