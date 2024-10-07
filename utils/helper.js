const getHalaman = (input) => {
    if (input.length === 1) {
        return [1]
    } else {
        let arr = input.split('-');
        let start = arr[0];
        let end = arr[1];
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result
    }
}

module.exports = {
    getHalaman
}