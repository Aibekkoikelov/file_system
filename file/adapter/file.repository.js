const fs = require("fs");
const path = require("path")
const {getFileFromDirectory} = require("../../utils/getFileFromDirectory");
const {writeNewFile} = require("../../utils/writeNewFile");
const {updateFiles} = require("../../utils/updateFile");


class FileRepository {
    static async createFile(req, res) {
        try {
            await writeNewFile(req, res)
        } catch (e) {
            return res.status(500)
        }
    }

    static async updateFile(req, res) {
        const {fileName} = req.params
        try {
            const files = fs.readdirSync(path.join(__dirname, "../..", "data"));
            if (files.length > 0) {
                const result = files.filter(item => {
                    return getFileFromDirectory(item) === fileName
                })
                if (result.length > 0) {
                    await updateFiles(req, res, result[0])
                } else {
                    return res.status(400).json("Нет такого файла")
                }
            }
        } catch (e) {
            return res.status(500).json("Не удалось записать файл")
        }
    }
    static getOneByFileName(req, res) {
        const {fileName} = req.params
        const files = fs.readdirSync(path.join(__dirname, "../..", "data"));
        const file = files.filter(item => {
            return getFileFromDirectory(item) === fileName
        })
        if (file.length > 0) {
            return res.sendFile(path.join(__dirname, "../..", "data") + "/" + file[0])
        } else {
            return res.status(404).json("нет такого файла")
        }
    }
    static getAllFiles (req, res){
        try{
            const files = fs.readdirSync(path.join(__dirname, "../..", "data"));
            return res.status(200).send(files)
        }catch (e){
             return res.status(400).json("Не правильный путь к папке")
        }

    }
}
module.exports = FileRepository