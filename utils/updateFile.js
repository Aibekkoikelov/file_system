const  path =  require("path") ;
const fs = require("fs") ;
const {unlink} = require("node:fs") ;
const updateMetadata = require("../metadata/updateMetadata") ;


async function updateFiles(req, res, fileName) {
    try {
        const {newFileName} = req.body
        const newFileNames = `${newFileName}.${req.files.image.name.split(".")[1]}`
        const filePathName = newFileName ? path.join(__dirname, "..", "data", newFileNames) : path.join(__dirname, "..", "data", req.files.image.name)
        const writeFile = await fs.createWriteStream(filePathName);
        writeFile.write(req.files.image.data, (err) => {
            if (err) {
                return res.status(400).json("Произошла ошибка при обновлении файла", err.message)
            } else {
                unlink(path.join(__dirname, "..", "data", fileName), (err) => {
                    if(err){
                        console.log("Не получилось удалить старый файл")
                    }
                    updateMetadata(req, fileName)
                    return res.status(200).json("Файл обновлен");
                })
            }
        })
    } catch (e) {
        return res.join(e.message)
    }

}

module.exports = {updateFiles}