import * as _ from 'lodash';
export function swap(array: any[], from: number, to: number) {
    const arr = _.cloneDeep(array);
    const temp = arr[to];
    arr[to] = arr[from];
    arr[from] = temp;
    return arr;
}

export function randomSeq(array: any[]) {
    function execute (arr: any[]) {
        const a = _.random(arr.length - 1);
        const b = _.random(arr.length - 1);
        return swap(arr, a, b);
    }
    
    let result = array;
    for (let i = 0; i < 10; i++) {
        result = execute(result);
    }

    return result;
}