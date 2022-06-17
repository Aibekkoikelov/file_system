const FileModel = require("../db/fileMeradata.schema");

function updateMetadata (req, filename){
    const query = { name: filename };
    const {mimetype, size, name} = req.files.image
    FileModel.findOneAndUpdate(query, { name: name, mimetype: mimetype, size: size}, (err, doc) =>{
    })
}

module.exports = updateMetadata