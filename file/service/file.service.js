

const FileRepository = require("../adapter/file.repository")
class FileService {

    static getAllFiles(req, res){
        return FileRepository.getAllFiles(req,res)
    }
    static upLoadNewFile (req, res){
        return FileRepository.createFile(req, res)
    }
    static upDateFile (req, res){
        return FileRepository.updateFile(req,res)
    }
    static getOneByFileName(req, res) {
        return FileRepository.getOneByFileName(req,res)
    }

}


module.exports = FileService