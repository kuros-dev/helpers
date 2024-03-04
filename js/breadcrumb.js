function createBreadcrumb(url, split = "/") {
    const names = [];
    var raw = url.split(split);

    for (var i = 0; i < raw.length; i++) {
        names.push(raw[i]);
    }

    return names
}

function auxiliar(raw, i, delimiter) {
    let cont = 0;
    let res = delimiter
    for (let element of raw) {
        res += element + delimiter;
        cont++;
        if (cont > i) {
            return res;
        }
    }
}

function generateBreadcrumbHTML(names, split = "/", baseURL = "", classname = "breadcrumb", hrefname = "breadlink", separator = "/") {
    var urls = ''
    var res = '<div class=\"'+ classname +'\"> ';
    for (var i = 0; i < names.length; i++) {
        if ( names[i] != '') {
            res += "<div class=\"" + hrefname + "_row\"> ";
            if (i != 0) {
                res += "<label>" + separator + "</label>"
            }

            urls = auxiliar(names, i, split);
            res += " <a class=\""+ hrefname + "\" href=\""+ baseURL + urls +"\">" + names[i] + "</a>";
            res += "</div>";
        }
        console.log(separator)
    }
    res += '</div>';
    return res;

}