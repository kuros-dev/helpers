function substract() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get all keys (parameter names)
    var k = urlParams.keys();
    const keys = []
    for (const key of k) {
        keys.push(key);
    }
    var v = urlParams.values();
    const values = [];
    
    for (const value of v) {
        values.push(value)
    }

    return [keys, values];
}