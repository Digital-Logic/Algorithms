import * as Sort from '../src/Sort';

describe('Test sorting algorithms', () => {

    const unsortedData = [];
    const unsortedDataLarge = [];

    const SMALL = 100;
    const LARGE = SMALL * 100;

    beforeAll(()=> {
        for(let i=0; i<SMALL; ++i) {
            // Get unique value to push into the unsortedData array.
            do {
                var ranNum = Math.round(Math.random() * SMALL * 100);
            } while(unsortedData.indexOf(ranNum) !== -1 );

            unsortedData.push(ranNum);
        }

        for(let i=0; i<LARGE; ++i)
        {
            do {
                ranNum = Math.round( Math.random() * LARGE * 100 );
            } while(unsortedDataLarge.indexOf(ranNum) !== -1);
            unsortedDataLarge.push(ranNum);
        }
    });

    /*
    *   **************      Run Test    ******************
    */

    // Small dataset
    Object.entries(Sort).forEach( ([algName, fn ]) => {
        it(`Testing ${ algName }`, () => {
            expect(validateSort(fn([...unsortedData]))).toBe(true);
        });
    });

    // large dataset
    Object.entries(Sort).forEach( ([algName, fn]) => {
        it(`Testing ${ algName } with large data set`, () => {
            expect(validateSort(fn([...unsortedDataLarge]))).toBe(true);
        });
    });
});


function validateSort(arr) {

    for(let i=0; i<arr.length-1; ++i)
    {
        if (arr[i] > arr[i+1])
            return false;
    }
    return true;
}

export {
    validateSort
};