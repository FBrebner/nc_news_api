exports.timestampToDate = (arr) => {
    for (let i=0; i<arr.length; i++) {
    arr[i].created_at = new Date(arr[i].created_at);
    arr[i].created_at = arr[i].created_at.toISOString().slice(0, 10)
}
    return arr
}

exports.nameAndIDs = (arr, category, idCategory) => {
    return arr.reduce((acc, element) => {
        acc[element[category]] = element[idCategory];
        return acc;
    }, {});
};

exports.replaceCategoryWithID = (arr, category, idCategory, nameIdPairs) => {
    arr.forEach((element) => {
        if (element[category]) {
        element[idCategory] = nameIdPairs[element[category]];
        delete element[category]
        }
        if(element['created_by']) {
            element['author']=element['created_by']
            delete element['created_by'];
        }
    });
    return arr;
};