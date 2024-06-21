function generateTree(data, indexLimit, excludes) {
    var res = "<div id=\"treeView\" class=\"treeView\">";

    res += linkGenerator(data, indexLimit);
    res += "</div>";
    return res
}

function linkGenerator(data, indexLimit, excludes) {
    let html = '';
    let Same;

    for (const attribute in data) {
        Same = false;
        if (excludes){
            if (excludes.find(attribute)){
                Same = true;
            }
        }
        if (!Same){
            if (indexLimit > 0) {
                html += `<div class="attribute">`;
                if (typeof data[attribute] === 'object') {
                    html += `<div class="attribute-name">${attribute}</div>`;
                    html += linkGenerator(data[attribute], indexLimit - 1, excludes);
                } else {
                    html += `<div class="attribute-value">${data[attribute]}</div>`;
                }
    
                html += `</div>`;
            }
        }
    }

    return html;
}