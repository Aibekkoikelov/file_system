const FileModel = require("../db/fileMeradata.schema");
const getMetadataByName = require("./getMetadata");


async function writeMetadata (req){
    const {mimetype, size, name} = req.files.image
   const response = await  getMetadataByName(name)
    if(response){
        await FileModel.findOneAndDelete({name: name}, async (err, docs)=>{
            if(docs){
                const newFileMetadata = await  new FileModel({name,mimetype,size})
                await newFileMetadata.save()
            }
        })
    }else{
        const newFileMetadata =await new FileModel({name,mimetype,size})
       await newFileMetadata.save()
    }
}



module.exports = writeMetadata