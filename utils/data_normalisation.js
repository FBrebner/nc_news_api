exports.timestampToDate = arr => {
  return arr.map(element => {
    element.created_at = new Date(element.created_at);
    element.created_at = element.created_at.toISOString().slice(0, 10);
    return element
  });
};

exports.nameAndIDs = (arr, category, idCategory) => {
  return arr.reduce((acc, element) => {
    acc[element[category]] = element[idCategory];
    return acc;
  }, {});
};

exports.replaceCategoryWithID = (arr, category, idCategory, nameIdPairs) => {
  return arr.map(element => {
    if (element[category]) {
      element[idCategory] = nameIdPairs[element[category]];
      delete element[category];
    }
    if (element["created_by"]) {
      element["author"] = element["created_by"];
      delete element["created_by"];
    }
    return element;
  });
};
