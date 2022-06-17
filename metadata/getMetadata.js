const FileModel = require("../db/fileMeradata.schema");


async  function getMetadataByName (filename){
    const query = { name: filename };
    const one = await FileModel.findOne(query)
    return one
}
module.exports = getMetadataByName