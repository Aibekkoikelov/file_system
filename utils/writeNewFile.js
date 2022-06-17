const fs = require("fs");
const path = require("path")
const writeMetadata = require("../metadata/writeMetadata");
const fileMonitoringInfo = require("../monitoring/fileMonitoringInfo");
const getMetadataByName = require("../metadata/getMetadata");


async function writeNewFile(req, res) {
    try{
        const startTime = new Date()
        const image = req.files.image.data
        const fileName = req.files.image.name;
        const filePath = path.join(__dirname, "..", "data")
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true});
        }
        const filePathName = path.join(filePath, fileName);
        const writeFile = await fs.createWriteStream(filePathName);
        writeFile.write(image, (err) => {
            if (err) {
               throw new Error("Произошла ошибка  во время сохранения файла")
            }else{
                writeMetadata(req)
                fileMonitoringInfo(startTime, new Date())
                return res.status(200).json("Файл записан");
            }
        })
    }catch (e){
        return res.status(400).join(e.message)
    }
}



module.exports = {writeNewFile}