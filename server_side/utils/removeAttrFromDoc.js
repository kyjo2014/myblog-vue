module.exports =  (schema, attr) => {
    if (!schema.options.toObject) schema.options.toObject = {};
    schema.options.toObject.transform = function (doc, ret, options) {
        // remove the _id of every document before returning the result
        delete ret[attr];
    }
    
}


// specify the transform schema optio