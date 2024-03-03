function substract(query) {

    if (query == ''){
        console.log("sdfgg")
        query = window.location;
    }
    var url = new URL(query)
    const queryString = url.searchParams;
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