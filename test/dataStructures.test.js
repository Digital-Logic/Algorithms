import { LinkList, HashMap, createHash } from '../src/dataStructures';

describe("LinkList", () => {
    const randomData = [];
    beforeAll(() => {
        for (let i=0; i<200; ++i )
            randomData.push(Math.round(Math.random() * 1000));
    });
    it('Empty list', () => {
        const list = new LinkList();
        expect(list.pop()).toEqual(undefined);
        expect(list.shift()).toEqual(undefined);
    });

    it('Push and unShift will throw if no data is provided', () => {
        const list = new LinkList();
        expect(() => list.push()).toThrowError(TypeError);
        expect(() => list.unshift()).toThrowError(TypeError);
    });

    it("Initialize provided data in order, and iterate through list", () => {
        const list = new LinkList(...randomData);
        for (const [key, value] of [...list].entries())
            expect(value).toBe(randomData[key]);
    });

    it("Push and pop works",() => {
        const list = new LinkList();
        const data = [1,2,3,4,5,6,7];
        list.push(...data);
        data.reverse().forEach( value => {
            expect(list.pop()).toBe(value);
        });
    });

    it('Shift and unshift work', () => {
        const list = new LinkList();
        const data = [1,2,3,4,5,6,7,8,9];
        list.unshift( ...data);
        data.forEach( value => {
            expect(list.shift()).toBe(value);
        });
    });
    it('works as a queue', () => {
        const list = new LinkList(...randomData);
        for (const value of randomData) {
            expect(list.shift()).toBe(value);
        }
    });
    it('is mappable', () => {
        const list = new LinkList(...randomData);
        const modList = list.map(x => x * 3);
        for( const value of randomData) {
            expect(modList.shift()).toBe(value * 3);
        }
    });
    it('is forEach-able', () => {
        const list = new LinkList(...randomData);
        let index = 0;
        list.forEach( (value) => {
            expect(value).toBe(randomData[index++]);
        });
    });
    it('is filterable', () => {
        const list = new LinkList(...randomData);
        // filter out old numbers
        const filteredList = list.filter( value => value % 2 === 0);
        filteredList.forEach( value => expect(value % 2).toBe(0) );
    });
    it('Reduce works', () => {
        const list = new LinkList(...randomData);
        expect(list.reduce((a,x) => x + a)).toBe(randomData.reduce((a,x) => x + a));
    });

});

describe("HashMap", () => {
    const randomData = [];
    const invalidKeys = [];
    let map;
    beforeAll(() => {
        for(let i=0; i<120; ++i) {
            randomData.push({ key: randomStr(), index: i });
        }

        for (let i=0; i<100; ++i)
            invalidKeys.push({ key: randomStr(7), index: i});
    });
    beforeEach(() => {
        map = new HashMap(100);
        randomData.forEach( ({key, index}) => map.set(key, index) );
    });

    it('Will throw if constructed with none integer value', () => {
        expect( () => new HashMap(1.2)).toThrowError(TypeError);
        expect(() => new HashMap('asdf')).toThrowError(TypeError);
    });

    it('Should return true for key, values pairs it contains.', () => {
        randomData.forEach( ({key, index}) => {
            expect(map.has(key)).toBe(true);
        });
    });
    it('Should return false for key, value pairs it does not have', () => {
        invalidKeys.forEach( ({key, index}) => {
            expect(map.has(key)).toBe(false);
        });
    });
    it('Should get correct data with a key', () => {
        randomData.forEach( ({key, index}) => {
            expect(map.get(key)).toBe(index);
        });
    });
    it('Should return null with an invalid key', () => {
        invalidKeys.forEach( ({key, value}) => {
            expect(map.get(key)).toEqual(null);
        });
    });
});

describe("createHash", () => {
    it("Will always generate a integer between 0 and the defined span", () => {
        const hasher = createHash(150);
        for(let i=0; i<100; i++) {
            const key = hasher(randomStr());
            expect(key).toBeGreaterThanOrEqual(0);
            expect(key).toBeLessThan(150);
        }
        expect(hasher('-1')).toBeGreaterThanOrEqual(0);
        expect(hasher('-asdb')).toBeGreaterThanOrEqual(0);
        expect(hasher(-1)).toBeGreaterThanOrEqual(0);
        expect(hasher(-8947928)).toBeGreaterThanOrEqual(0);
    });
});

function randomStr(length=5) {
    const chars = [];
    for (let i=0; i<length; ++i)
        chars.push(randomChar());
    return chars.join('');
}

it.skip('Should generate random strings', () => {
    const str = randomStr(5);
    expect(str.length).toBe(5);
});

// Returns random character
function randomChar() {
    const char = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    // uppercase it?
    // if (Math.floor(Math.random() * 2))
    //     return char.toUpperCase();
    return char;
}

it.skip('Test random char generator', () => {
    const allowed = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    expect(allowed.length).toBe(26);
    const hitCount = allowed.map( x => 0);
    for (let i=0; i<200; i++)
    {
        const myChar = randomChar();
        const indexOf = allowed.indexOf(myChar.toLocaleLowerCase());
        expect(indexOf).not.toBe(-1);
        hitCount[indexOf] = hitCount[indexOf] + 1;
    }
    hitCount.forEach( count => expect(count).toBeGreaterThan(0));
});